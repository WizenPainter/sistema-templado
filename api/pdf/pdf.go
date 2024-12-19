package pdf

import (
    "fmt"
    "github.com/jung-kurt/gofpdf"
    "time"
)

type OrderItem struct {
    ItemID      string
    ComboID     string
    Description string
    Width       float64
    Height      float64
    M2          float64
    Perimeter   float64
    Quantity    int
    Price       float64
    IVA         float64
    Total       float64
}

type Order struct {
    OrderID      string
    Customer     Customer
    Project      string
    Location     string
    OrderDate    time.Time
    DeliveryDate time.Time
    Salesperson  string
    Items        []OrderItem
    Subtotal     float64
    Discount     float64
    IVA          float64
    Total        float64
}

type Customer struct {
    Name    string
    Address string
    City    string
    Phone   string
}

func GenerateOrderPDF(order Order) error {
    pdf := gofpdf.New("P", "mm", "Letter", "")
    pdf.AddPage()
    
    // Header
    pdf.SetFont("Arial", "B", 14)
    pdf.Cell(190, 10, fmt.Sprintf("PEDIDO: %s", order.OrderID))
    
    // Customer info
    pdf.SetFont("Arial", "", 10)
    pdf.Ln(10)
    pdf.Cell(190, 5, order.Customer.Name)
    pdf.Ln(5)
    pdf.Cell(190, 5, order.Customer.Address)
    pdf.Ln(5)
    pdf.Cell(190, 5, order.Customer.City)
    pdf.Ln(5)
    pdf.Cell(190, 5, fmt.Sprintf("Tel. %s", order.Customer.Phone))
    
    // Project info
    pdf.Ln(10)
    pdf.Cell(190, 5, fmt.Sprintf("OBRA: %s", order.Project))
    pdf.Ln(5)
    pdf.Cell(190, 5, order.Location)
    pdf.Ln(5)
    pdf.Cell(95, 5, fmt.Sprintf("FECHA: %s", order.OrderDate.Format("02-January-2006")))
    pdf.Cell(95, 5, fmt.Sprintf("ENTREGA: %s", order.DeliveryDate.Format("02-January-2006")))
    pdf.Ln(5)
    pdf.Cell(190, 5, fmt.Sprintf("VENDEDOR: %s", order.Salesperson))
    
    // Table header
    pdf.Ln(10)
    drawTableHeader(pdf)
    
    // Items
    pdf.SetFont("Arial", "", 9)
    for _, item := range order.Items {
        drawTableRow(pdf, item)
    }
    
    // Totals
    pdf.Ln(10)
    pdf.SetFont("Arial", "B", 10)
    pdf.Cell(150, 5, "Subtotal: 0")
    pdf.Cell(40, 5, fmt.Sprintf("$%.2f", order.Subtotal))
    pdf.Ln(5)
    pdf.Cell(150, 5, "Descuento:")
    pdf.Cell(40, 5, fmt.Sprintf("$%.2f", order.Discount))
    pdf.Ln(5)
    pdf.Cell(150, 5, "I.V.A:")
    pdf.Cell(40, 5, fmt.Sprintf("$%.2f", order.IVA))
    pdf.Ln(5)
    pdf.Cell(150, 5, "Total:")
    pdf.Cell(40, 5, fmt.Sprintf("$%.2f", order.Total))
    
    // Terms and conditions
    drawTermsAndConditions(pdf)
    
    return pdf.OutputFileAndClose("order.pdf")
}

func drawTableHeader(pdf *gofpdf.Fpdf) {
    pdf.SetFont("Arial", "B", 9)
    headers := []string{"Partida", "Item", "Descripción", "Cantidad", "Precio", "IVA", "Total"}
    widths := []float64{20, 20, 90, 15, 20, 20, 20}
    
    for i, header := range headers {
        pdf.Cell(widths[i], 7, header)
    }
    pdf.Ln(-1)
}

func drawTableRow(pdf *gofpdf.Fpdf, item OrderItem) {
    pdf.Cell(20, 10, item.ItemID)
    pdf.Cell(20, 10, item.ComboID)
    
    // Multi-line description
    description := fmt.Sprintf("%s\nLargo: %.0f mm x Ancho: %.0f mm\n• m2: %.2f p: %.3f\n• Forma: Recto",
        item.Description, item.Width, item.Height, item.M2, item.Perimeter)
    pdf.MultiCell(90, 5, description, "", "", false)
    
    y := pdf.GetY()
    pdf.Cell(15, 10, fmt.Sprintf("%d", item.Quantity))
    pdf.Cell(20, 10, fmt.Sprintf("%.2f", item.Price))
    pdf.Cell(20, 10, fmt.Sprintf("%.2f", item.IVA))
    pdf.Cell(20, 10, fmt.Sprintf("%.2f", item.Total))
    pdf.Ln(y - pdf.GetY() + 15)
}

func drawTermsAndConditions(pdf *gofpdf.Fpdf) {
    pdf.Ln(15)
    pdf.SetFont("Arial", "B", 10)
    pdf.Cell(190, 5, "Condiciones de Venta")
    pdf.Ln(5)
    pdf.SetFont("Arial", "", 9)
    terms := []string{
        "Precios sujetos a cambio sin previo aviso",
        "Se requiere 50% de anticipo y 50% contra entrega",
        "El tiempo de entrega estimado es de 3 a 5 días hábiles",
    }
    for _, term := range terms {
        pdf.Cell(190, 5, term)
        pdf.Ln(5)
    }
    
    pdf.Ln(10)
    pdf.Cell(190, 5, "Garantias:")
    pdf.Ln(5)
    pdf.MultiCell(190, 5, "En la venta de vidrios NO HAY GARANTIA una vez firmado de conformidad por parte del cliente en lo que se refiere a roturas, rayas, conchas y manchas.", "", "", false)
    
    // Signature line
    pdf.Ln(15)
    pdf.Cell(90, 5, "Firma del Cliente")
    pdf.Ln(10)
    pdf.Line(20, pdf.GetY(), 90, pdf.GetY())
}
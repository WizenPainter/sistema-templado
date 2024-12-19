// handlers/pdf.go
package handlers

import (
    "fmt"
    "net/http"
    "context"

    "github.com/gin-gonic/gin"    
    
    "api-templado/pdf"
    "api-templado/models"
    "api-templado/db"
)

type PDFHandler struct {
    db *db.Database
}

func NewPDFHandler(db *db.Database) *PDFHandler {
    return &PDFHandler{db: db}
}

func (h *PDFHandler) GenerateOrderPDF(c *gin.Context) {
    orderID := c.Param("id")
    ctx := context.Background()
    
    // Get order from database with relations
    var order models.Order
    err := h.db.DB.NewSelect().
        Model(&order).
        Relation("Customer").
        Relation("Items").
        Relation("Items.Product").
        Where("order.id = ?", orderID).
        Scan(ctx)
    
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
        return
    }
    
    // Convert database model to PDF model
    pdfOrder := pdf.Order{
        OrderID:      order.ID,
        Customer: pdf.Customer{
            Name:    order.Customer.Name,
            Address: order.Customer.Address,
            City:    order.Customer.City,
            Phone:   order.Customer.Phone,
        },
        Project:      order.ProjectName,
        Location:     order.Location,
        OrderDate:    order.CreatedAt,
        DeliveryDate: order.DeliveryDate,
        Salesperson:  order.Vendor,
        Items:        make([]pdf.OrderItem, len(order.Items)),
        Subtotal:     order.Subtotal,
        Discount:     order.Discount,
        IVA:         order.IVA,
        Total:       order.Total,
    }
    
    // Convert order items
    for i, item := range order.Items {
        pdfOrder.Items[i] = pdf.OrderItem{
            ItemID:      item.ID,
            ComboID:     item.ComboID,
            Description: item.Product.Name,
            Width:       item.Width,
            Height:      item.Height,
            M2:         item.Width * item.Height / 1000000, // Convert to m²
            Perimeter:   2 * (item.Width + item.Height) / 1000, // Convert to m
            Quantity:    item.Quantity,
            Price:       item.Price,
            IVA:        item.IVA,
            Total:      item.Total,
        }
    }
    
    // Generate PDF
    filename := fmt.Sprintf("order_%s.pdf", orderID)
    err = pdf.GenerateOrderPDF(pdfOrder)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate PDF"})
        return
    }
    
    // Return PDF file
    c.FileAttachment(filename, filename)
}
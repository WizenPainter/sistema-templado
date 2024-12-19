package handlers

import (
    "fmt"
    "time"
    "net/http"
    "database/sql"
    
    "github.com/gin-gonic/gin"
    "github.com/uptrace/bun"

    "api-templado/pdf"
    "api-templado/db"
)

// Order represents the order structure
type Order struct {
    bun.BaseModel `bun:"table:orders,alias:o"`
    
    ID           string     `bun:"id,pk" json:"id"`
    CustomerName string     `bun:"customer_name" json:"customer_name"`
    ProjectName  string     `bun:"project_name" json:"project_name,omitempty"`
    SubProject   string     `bun:"sub_project" json:"sub_project,omitempty"`
    Status       string     `bun:"status" json:"status"`
    TotalPieces  int       `bun:"total_pieces" json:"total_pieces"`
    CreatedAt    time.Time `bun:"created_at,nullzero" json:"created_at"`
    UpdatedAt    time.Time `bun:"updated_at,nullzero" json:"updated_at"`
}


type Handlers struct {
    db *db.Database
}

func NewHandlers(database *db.Database) *Handlers {
    return &Handlers{
        db: database,
    }
}

func (h *Handlers) GenerateOrderPDF(c *gin.Context) {
    orderID := c.Param("id")
    
    // Query your database using Bun
    var order struct {
        ID           string
        CustomerName string
        ProjectName  string
        Location    string
        // Add other fields you need
    }
    
    err := h.db.DB.NewSelect().
        Table("orders").
        Where("id = ?", orderID).
        Scan(c.Request.Context(), &order)
    
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
        return
    }
    
    // Convert to PDF format and generate
    pdfOrder := pdf.Order{
        OrderID:      order.ID,
        Customer: pdf.Customer{
            Name:    order.CustomerName,
            // Fill other fields
        },
        // Fill other fields
    }
    
    err = pdf.GenerateOrderPDF(pdfOrder)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate PDF"})
        return
    }
    
    filename := fmt.Sprintf("order_%s.pdf", orderID)
    c.FileAttachment(filename, filename)
}

// OrderHandler contains the database instance
type OrderHandler struct {
    db *db.Database
}

// NewOrderHandler creates a new order handler instance
func NewOrderHandler(database *db.Database) *OrderHandler {
    return &OrderHandler{
        db: database,
    }
}

// HandleOrders routes the request to the appropriate handler based on the HTTP method
func (h *OrderHandler) HandleOrders(c *gin.Context) {
    switch c.Request.Method {
    case http.MethodGet:
        // Check if we're getting a single order or filtering
        if id := c.Query("id"); id != "" {
            h.GetOrderByID(c)
            return
        }
        if status := c.Query("status"); status != "" {
            h.GetOrdersByStatus(c)
            return
        }
        if client := c.Query("client"); client != "" {
            h.GetOrdersByClient(c)
            return
        }
        if project := c.Query("project"); project != "" {
            h.GetOrdersByProject(c)
            return
        }
        h.GetAllOrders(c)
    case http.MethodPost, http.MethodPut:
        h.UpdateOrders(c)
    case http.MethodDelete:
        h.DeleteOrder(c)
    default:
        c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method not allowed"})
    }
}

// GetOrderByID retrieves a single order by its ID
func (h *OrderHandler) GetOrderByID(c *gin.Context) {
    id := c.Query("id")
    order := new(Order)
    
    err := h.db.DB.NewSelect().
        Model(order).
        Where("id = ?", id).
        Scan(c.Request.Context())
    
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, order)
}

// GetAllOrders retrieves all orders
func (h *OrderHandler) GetAllOrders(c *gin.Context) {
    var orders []Order
    
    err := h.db.DB.NewSelect().
        Model(&orders).
        Order("created_at DESC").
        Scan(c.Request.Context())
    
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, orders)
}

// GetOrdersByStatus retrieves all orders with a specific status
func (h *OrderHandler) GetOrdersByStatus(c *gin.Context) {
    status := c.Query("status")
    var orders []Order
    
    err := h.db.DB.NewSelect().
        Model(&orders).
        Where("status = ?", status).
        Order("created_at DESC").
        Scan(c.Request.Context())
    
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, orders)
}

// GetOrdersByClient retrieves all orders for a specific client
func (h *OrderHandler) GetOrdersByClient(c *gin.Context) {
    client := c.Query("client")
    var orders []Order
    
    err := h.db.DB.NewSelect().
        Model(&orders).
        Where("customer_name = ?", client).
        Order("created_at DESC").
        Scan(c.Request.Context())
    
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, orders)
}

// GetOrdersByProject retrieves all orders for a specific project
func (h *OrderHandler) GetOrdersByProject(c *gin.Context) {
    project := c.Query("project")
    var orders []Order
    
    err := h.db.DB.NewSelect().
        Model(&orders).
        Where("project_name = ?", project).
        Order("created_at DESC").
        Scan(c.Request.Context())
    
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, orders)
}

// UpdateOrders updates one or multiple orders
func (h *OrderHandler) UpdateOrders(c *gin.Context) {
    var orders []Order
    if err := c.ShouldBindJSON(&orders); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    ctx := c.Request.Context()
    
    // Start a transaction
    tx, err := h.db.DB.BeginTx(ctx, nil)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer tx.Rollback()
    
    for _, order := range orders {
        order.UpdatedAt = time.Now()
        
        _, err := tx.NewUpdate().
            Model(&order).
            WherePK().
            Exec(ctx)
        
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }
    
    if err := tx.Commit(); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{"message": "Orders updated successfully"})
}

// DeleteOrder deletes an order by ID
func (h *OrderHandler) DeleteOrder(c *gin.Context) {
    id := c.Query("id")
    
    _, err := h.db.DB.NewDelete().
        Model((*Order)(nil)).
        Where("id = ?", id).
        Exec(c.Request.Context())
    
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{"message": "Order deleted successfully"})
}
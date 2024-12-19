// models/order.go
package models

import (
    "time"
    "github.com/uptrace/bun"
)

type Order struct {
    bun.BaseModel `bun:"table:orders,alias:o"`
    
    ID           string    `bun:"id,pk"`
    CustomerID   string    `bun:"customer_id"`
    Customer     Customer  `bun:"rel:belongs-to,join:customer_id=id"`
    ProjectName  string    `bun:"project_name"`
    Location     string    `bun:"location"`
    DeliveryDate time.Time `bun:"delivery_date"`
    Vendor       string    `bun:"vendor"`
    Items        []OrderItem `bun:"rel:has-many,join:id=order_id"`
    Subtotal     float64   `bun:"subtotal"`
    Discount     float64   `bun:"discount"`
    IVA          float64   `bun:"iva"`
    Total        float64   `bun:"total"`
    CreatedAt    time.Time `bun:"created_at"`
    UpdatedAt    time.Time `bun:"updated_at"`
}

type OrderItem struct {
    bun.BaseModel `bun:"table:order_items,alias:oi"`
    
    ID          string  `bun:"id,pk"`
    OrderID     string  `bun:"order_id"`
    ComboID     string  `bun:"combo_id"`
    ProductID   string  `bun:"product_id"`
    Product     Product `bun:"rel:belongs-to,join:product_id=id"`
    Width       float64 `bun:"width"`
    Height      float64 `bun:"height"`
    Quantity    int     `bun:"quantity"`
    Price       float64 `bun:"price"`
    IVA         float64 `bun:"iva"`
    Total       float64 `bun:"total"`
}

type Customer struct {
    bun.BaseModel `bun:"table:customers,alias:c"`
    
    ID      string `bun:"id,pk"`
    Name    string `bun:"name"`
    Address string `bun:"address"`
    City    string `bun:"city"`
    Phone   string `bun:"phone"`
}

type Product struct {
    bun.BaseModel `bun:"table:products,alias:p"`
    
    ID          string `bun:"id,pk"`
    Name        string `bun:"name"`
    Description string `bun:"description"`
}
package main

import (
    "os"
    "log"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"

    "api-templado/handlers"
    "api-templado/db"
    "api-templado/middleware"
)

type Config struct {
    SupabaseURL       string
    SupabaseKey       string
    SupabaseJWTSecret string
    DBConfig          db.DBConfig
}

func main() {
    // Load .env file if it exists
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    config := Config{
        SupabaseURL:       os.Getenv("SUPABASE_URL"),
        SupabaseKey:       os.Getenv("SUPABASE_KEY"),
        SupabaseJWTSecret: os.Getenv("SUPABASE_JWT_SECRET"),
        DBConfig: db.DBConfig{
            User:     os.Getenv("SUPABASE_DB_USER"),
            Password: os.Getenv("SUPABASE_DB_PASSWORD"),
            Host:     os.Getenv("SUPABASE_DB_HOST"),
            Port:     os.Getenv("SUPABASE_DB_PORT"),
            Database: os.Getenv("SUPABASE_DB_NAME"),
        },
    }

    // Initialize database
//     dbUrl := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s", 
//     config.DBConfig.User, 
//     config.DBConfig.Password, 
//     config.DBConfig.Host, 
//     config.DBConfig.Port, 
//     config.DBConfig.Database,
    
// )

    database, err := db.NewDatabase(config.DBConfig)
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
    defer database.DB.Close()
    
    r := gin.Default()
    
    // Initialize handlers
    // Routes
    api := r.Group("/api")
    api.Use(middleware.AuthMiddleware()) // Apply auth middleware to API routes
    
    pdfHandler := handlers.NewPDFHandler(database)
    orderHandler := handlers.NewOrderHandler(database)
    {
        api.Any("/orders", orderHandler.HandleOrders)
        api.GET("/orders/:id/pdf", pdfHandler.GenerateOrderPDF)
        // api.POST("/orders", handlers.GenerateOrderPapers)
        // api.POST("/invoices", handlers.GenerateInvoice)
        // api.POST("/optimize", handlers.OptimizeGlass)
        // api.PUT("/inventory", handlers.UpdateInventory)
    }
    
    log.Fatal(r.Run(":8081"))
}
// db/db.go
package db

import (
    "fmt"
    "database/sql"
    "github.com/uptrace/bun"
    "github.com/uptrace/bun/dialect/pgdialect"
    "github.com/uptrace/bun/driver/pgdriver"
)

type Database struct {
    DB *bun.DB
}

type DBConfig struct {
    User     string
    Password string
    Host     string
    Port     string
    Database string
}

func NewDatabase(config DBConfig) (*Database, error) {
    // Format connection string for pgdriver
    dsn := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s?sslmode=disable",
        config.User,
        config.Password,
        config.Host,
        config.Port,
        config.Database,
    )

    // Create connector with the DSN
    connector := pgdriver.NewConnector(
        pgdriver.WithDSN(dsn),
    )

    sqldb := sql.OpenDB(connector)
    db := bun.NewDB(sqldb, pgdialect.New())

    // Test the connection
    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("failed to connect to database: %v", err)
    }

    return &Database{
        DB: db,
    }, nil
}
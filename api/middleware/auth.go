// middleware/auth.go
package middleware

import (
    "crypto/rsa"
    "encoding/base64"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
    "strings"
    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

type SupabaseSession struct {
    AccessToken string `json:"access_token"`
}

func parseSupabaseSecret(secret string) (*rsa.PublicKey, error) {
    // Decode the base64-encoded secret
    decodedSecret, err := base64.StdEncoding.DecodeString(secret)
    if err != nil {
        return nil, fmt.Errorf("failed to decode secret: %v", err)
    }

    // Parse PEM block to get RSA public key
    key, err := jwt.ParseRSAPublicKeyFromPEM(decodedSecret)
    if err != nil {
        return nil, fmt.Errorf("failed to parse RSA public key: %v", err)
    }

    return key, nil
}

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Get the Authorization header
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No authorization header"})
            return
        }

        // Check if it's a Bearer token
        bearerToken := strings.Split(authHeader, " ")
        if len(bearerToken) != 2 || bearerToken[0] != "Bearer" {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
            return
        }

        tokenString := bearerToken[1]

        // Try to parse the token as a Supabase session JSON
        var session SupabaseSession
        if err := json.Unmarshal([]byte(tokenString), &session); err == nil {
            // If successful, use the access_token
            tokenString = session.AccessToken
        }

        // Get JWT secret from environment
        jwtSecret := os.Getenv("SUPABASE_JWT_SECRET")
        if jwtSecret == "" {
            c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "JWT secret not configured"})
            return
        }

        // Parse and validate the token using RS256
        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            // Validate the algorithm
            if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
                return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
            }

            // Load project's public key
            publicKey, err := parseSupabaseSecret(jwtSecret)
            if err != nil {
                return nil, fmt.Errorf("failed to parse public key: %v", err)
            }

            return publicKey, nil
        })

        if err != nil {
            fmt.Printf("Token validation error: %v\n", err)
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("Invalid token: %v", err)})
            return
        }

        if !token.Valid {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Token is not valid"})
            return
        }

        claims, ok := token.Claims.(jwt.MapClaims)
        if !ok {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
            return
        }

        // Token is valid, set claims in context
        if claims["sub"] != nil {
            c.Set("user_id", claims["sub"])
        }
        if claims["role"] != nil {
            c.Set("role", claims["role"])
        }
        
        c.Next()
    }
}
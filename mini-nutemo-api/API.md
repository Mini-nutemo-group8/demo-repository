# Mini-Netumo API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints except registration and login require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
    "email": "admin@company.com",
    "password": "your_password"
}
```

**Response (201 Created)**
```json
{
    "message": "User registered successfully",
    "userId": 1,
    "token": "jwt_token_here"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "admin@company.com",
    "password": "your_password"
}
```

**Response (200 OK)**
```json
{
    "message": "Login successful",
    "token": "jwt_token_here",
    "userId": 1
}
```

### Targets

#### List All Targets
```http
GET /targets
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK)**
```json
[
    {
        "id": 1,
        "name": "Company Website",
        "url": "https://www.company.com",
        "is_active": true,
        "ssl_days_to_expiry": 30,
        "domain_days_to_expiry": 365,
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "id": 2,
        "name": "API Gateway",
        "url": "https://api.company.com",
        "is_active": true,
        "ssl_days_to_expiry": 45,
        "domain_days_to_expiry": 180,
        "created_at": "2024-01-01T00:00:00Z"
    }
]
```

#### Get Target by ID
```http
GET /targets/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK)**
```json
{
    "id": 1,
    "name": "Company Website",
    "url": "https://www.company.com",
    "is_active": true,
    "ssl_days_to_expiry": 30,
    "domain_days_to_expiry": 365,
    "created_at": "2024-01-01T00:00:00Z"
}
```

#### Create Target
```http
POST /targets
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
    "name": "Payment Gateway",
    "url": "https://payments.company.com"
}
```

**Response (201 Created)**
```json
{
    "id": 3,
    "name": "Payment Gateway",
    "url": "https://payments.company.com"
}
```

#### Update Target
```http
PUT /targets/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
    "name": "Main Website",
    "url": "https://www.company.com",
    "is_active": true
}
```

**Response (200 OK)**
```json
{
    "message": "Target updated successfully"
}
```

#### Delete Target
```http
DELETE /targets/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK)**
```json
{
    "message": "Target deleted successfully"
}
```

### Monitoring

#### Get Target Status
```http
GET /targets/:id/status
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK)**
```json
{
    "status_code": 200,
    "latency_ms": 150,
    "is_success": true,
    "created_at": "2024-01-01T00:00:00Z"
}
```

#### Get Target History
```http
GET /targets/:id/history
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters**
- `hours` (optional): Number of hours of history to return (default: 24)

**Response (200 OK)**
```json
[
    {
        "status_code": 200,
        "latency_ms": 150,
        "is_success": true,
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "status_code": 503,
        "latency_ms": 5000,
        "is_success": false,
        "error_message": "Service unavailable",
        "created_at": "2024-01-01T00:00:00Z"
    }
]
```

### Alerts

#### List Alerts
```http
GET /targets/alerts
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters**
- `limit` (optional): Maximum number of alerts to return (default: 50)

**Response (200 OK)**
```json
[
    {
        "id": 1,
        "target_id": 1,
        "target_name": "Company Website",
        "target_url": "https://www.company.com",
        "type": "ping_failure",
        "message": "Target failed 2 times consecutively. Last error: Connection timeout",
        "is_read": false,
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "id": 2,
        "target_id": 2,
        "target_name": "API Gateway",
        "target_url": "https://api.company.com",
        "type": "ssl_expiry",
        "message": "SSL certificate expires in 14 days",
        "is_read": false,
        "created_at": "2024-01-01T00:00:00Z"
    }
]
```

#### Mark Alert as Read
```http
PUT /targets/alerts/:id/read
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK)**
```json
{
    "message": "Alert marked as read"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
    "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
    "error": "Invalid or missing token"
}
```

### 404 Not Found
```json
{
    "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
    "error": "Internal server error"
}
``` 
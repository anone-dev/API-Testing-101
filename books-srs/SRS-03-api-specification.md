# SRS-03: API Endpoint Specification

## Azure DevOps Work Items

**Board:** https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_boards

| PBI ID | Feature | Axons Test Scenario IDs |
|--------|---------|-------------------------|
| [12555](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12555) | FR-01: Health Check | 12623 |
| [12556](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12556) | FR-02: Authentication | 12624, 12625 |
| [12557](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12557) | FR-03: Books Management | 12626, 12627, 12628, 12629, 12630, 12631 |
| [12558](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12558) | FR-04: Orders Management | 12632, 12633, 12634, 12635, 12636, 12637, 12638, 12639 |
| [12559](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12559) | FR-05: Stock Management | 12640 |

---

## Base URL

```
http://localhost:5000
```

## Authentication

Protected endpoints ต้องส่ง header:
```
Authorization: Bearer <accessToken>
```

---

## Endpoints

### 1. GET /status

ตรวจสอบสถานะ API Server

**Response 200:**
```json
{
  "status": "OK",
  "startTime": "1708123456.789"
}
```

---

### 2. POST /api-clients

ลงทะเบียน API Client เพื่อรับ Access Token

**Request Body:**
```json
{
  "clientEmail": "test@example.com",
  "clientName": "Test User"
}
```

**Response 201:**
```json
{
  "accessToken": "abc123...def456"
}
```

**Response 409 (Email ซ้ำ):**
```json
{
  "error": "API client already registered. Try a different email."
}
```

---

### 3. GET /books

ดึงรายการหนังสือทั้งหมด

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | No | `fiction` หรือ `non-fiction` |
| limit | integer | No | จำนวนสูงสุด (1-20) |

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "The Russian",
    "type": "fiction",
    "available": true
  }
]
```

---

### 4. GET /books/{bookId}

ดึงรายละเอียดหนังสือ

**Path Parameter:** `bookId` (integer)

**Response 200:**
```json
{
  "id": 1,
  "name": "The Russian",
  "type": "fiction",
  "available": true,
  "author": "James Patterson",
  "price": 12.99,
  "current-stock": 3
}
```

**Response 404:**
```json
{
  "error": "No book with id 99"
}
```

---

### 5. POST /orders 🔒

สร้าง Order ใหม่ (ต้องมี token)

**Request Body:**
```json
{
  "bookId": 1,
  "customerName": "John Doe"
}
```

**Response 201:**
```json
{
  "created": true,
  "orderId": "a1b2c3d4e5f6g7h8i9j10"
}
```

**Response 401 (ไม่มี token):**
```json
{
  "error": "Missing Authorization header."
}
```

**Response 404 (หมดสต็อก):**
```json
{
  "error": "This book is not in stock. Try again later."
}
```

---

### 6. GET /orders 🔒

ดึงรายการ orders ทั้งหมด (ต้องมี token)

**Response 200:**
```json
[
  {
    "id": "a1b2c3d4e5f6g7h8i9j10",
    "bookId": 1,
    "customerName": "John Doe",
    "quantity": 1,
    "createdBy": "abc123...",
    "timestamp": 1708123456789
  }
]
```

---

### 7. GET /orders/{orderId} 🔒

ดึงรายละเอียด order (ต้องมี token)

**Response 200:**
```json
{
  "id": "a1b2c3d4e5f6g7h8i9j10",
  "bookId": 1,
  "customerName": "John Doe",
  "quantity": 1,
  "createdBy": "abc123...",
  "timestamp": 1708123456789
}
```

**Response 404:**
```json
{
  "error": "No order with id xyz."
}
```

---

### 8. PATCH /orders/{orderId} 🔒

อัปเดต customerName ของ order (ต้องมี token)

**Request Body:**
```json
{
  "customerName": "Jane Doe"
}
```

**Response 204:** (No Content)

---

### 9. DELETE /orders/{orderId} 🔒

ลบ order (ต้องมี token)

**Response 204:** (No Content)

---

### 10. POST /reset

รีเซ็ตสต็อกหนังสือทั้งหมดกลับค่าเริ่มต้น

**Response 200:**
```json
{
  "message": "Stock reset successfully"
}
```

---

## Error Response Summary

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (success, no body) |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource not found or out of stock |
| 409 | Conflict - Email already registered |

## Data Models

### Book (List)
```typescript
{
  id: number
  name: string
  type: "fiction" | "non-fiction"
  available: boolean
}
```

### Book (Detail)
```typescript
{
  id: number
  name: string
  type: "fiction" | "non-fiction"
  available: boolean
  author: string
  price: number
  "current-stock": number
}
```

### Order
```typescript
{
  id: string           // UUID 21 chars
  bookId: number
  customerName: string
  quantity: number     // always 1
  createdBy: string    // first 64 chars of token
  timestamp: number    // Unix timestamp (ms)
}
```

# SRS-04: Business Flow & Test Scenarios

## Azure DevOps Work Items

**Board:** https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_boards

| PBI ID | Feature | Axons Test Scenario IDs |
|--------|---------|-------------------------|
| [12567](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12567) | Success Flows: S1-Order, S2-Update, S3-Delete | 12641, 12642, 12643, 12644, 12645 |
| [12568](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12568) | Failure Flows: F1-Out of Stock, F2-Update Deleted, F3-Delete Deleted, F4-Duplicate Email | 12646, 12647, 12648, 12649, 12650, 12651, 12652 |

---

## Overview

ระบบมี flow การทำงานหลัก 2 กลุ่ม:
- **Success Flows (S)** — flow ที่ทำงานสำเร็จตามปกติ
- **Failure Flows (F)** — flow ที่ระบบต้องจัดการ error ได้ถูกต้อง

## Pre-requisite: Authentication

ทุก flow ต้องผ่านขั้นตอน Authentication ก่อน (ยกเว้น F4)

```
POST /api-clients
Body: { "clientName": "...", "clientEmail": "...@example.com" }
→ 201: { "accessToken": "<token>" }
→ เก็บ token ไว้ใช้ใน protected endpoints
```

---

## Success Flows

### S1 - Order Books (Success)

**วัตถุประสงค์:** สั่งซื้อหนังสือ fiction (bookId=1) และตรวจสอบ order ที่สร้าง

```
[Pre] bookId = 1

1. GET /status
   → 200: { status: "OK" }

2. GET /books
   → 200: array of books
   → validate: type ∈ ["fiction", "non-fiction"]

3. GET /books/{bookId}
   → 200: book detail object
   → validate: type ∈ ["fiction", "non-fiction"]

4. POST /orders  🔒
   Body: { bookId: 1, customerName: "API test by {name}" }
   → 201: { created: true, orderId: "<uuid>" }
   → เก็บ orderId

5. GET /orders  🔒
   → 200: array of orders
   → validate: orderId อยู่ใน list
   → validate: createdBy เหมือนกันทุก item
   → validate: customerName เหมือนกันทุก item

6. GET /orders/{orderId}  🔒
   → 200: order detail
   → validate: id == orderId
   → validate: bookId == 1
   → validate: customerName ถูกต้อง
```

---

### S2 - Update Order (Success)

**วัตถุประสงค์:** สั่งซื้อหนังสือ non-fiction (bookId=5) แล้วแก้ไข customerName

```
[Pre] bookId = 5

1. GET /status → 200

2. GET /books?type=non-fiction
   → 200: array (non-fiction only)
   → validate: type == "non-fiction" ทุก item

3. GET /books/{bookId}
   → 200: book detail
   → validate: type == "non-fiction"

4. POST /orders  🔒
   Body: { bookId: 5, customerName: "API test by {name}" }
   → 201: { created: true, orderId: "<uuid>" }

5. GET /orders  🔒  [before update]
   → 200: validate orderId อยู่ใน list

6. GET /orders/{orderId}  🔒  [before update]
   → 200: validate customerName == original name

7. PATCH /orders/{orderId}  🔒
   Body: { customerName: "{newName}" }
   → 204: (no body)

8. GET /orders  🔒  [after update]
   → 200: validate customerName == newName

9. GET /orders/{orderId}  🔒  [after update]
   → 200: validate customerName == newName
   → validate: bookId == 5
```

---

### S3 - Delete Order (Success)

**วัตถุประสงค์:** สั่งซื้อหนังสือ fiction (bookId=1) แล้วลบ order และตรวจสอบว่าหายไปแล้ว

```
[Pre] bookId = 1

1. GET /status → 200

2. GET /books?type=fiction&limit=1
   → 200: array (fiction only, 1 item)
   → validate: type == "fiction" ทุก item
   → validate: length == 1

3. GET /books/{bookId}
   → 200: validate type == "fiction"

4. POST /orders  🔒  [target order]
   → 201: { created: true, orderId: "<uuid>" }

5. POST /orders  🔒  [extra data]
   → 201: (สร้าง order เพิ่มเพื่อ verify list)

6. GET /orders  🔒  [before delete]
   → 200: validate orderId อยู่ใน list

7. GET /orders/{orderId}  🔒  [before delete]
   → 200: validate order detail ถูกต้อง

8. DELETE /orders/{orderId}  🔒
   → 204: (no body)

9. GET /orders  🔒  [after delete]
   → 200: validate orderId ไม่อยู่ใน list แล้ว

10. GET /orders/{orderId}  🔒  [after delete]
    → 404: { error: "No order with id {orderId}." }
```

---

## Failure Flows

### F1 - Order Books Out of Stock

**วัตถุประสงค์:** พยายามสั่งซื้อหนังสือที่หมดสต็อก (bookId=2, stock=0)

```
[Pre] bookId = 2

1. GET /status → 200

2. GET /books?limit=5
   → 200: array (5 items)
   → validate: length == 5

3. GET /books/{bookId}
   → 200: book detail (available: false)

4. POST /orders  🔒
   Body: { bookId: 2, customerName: "..." }
   → 404: { error: "This book is not in stock. Try again later." }
```

---

### F2 - Update Deleted Order

**วัตถุประสงค์:** พยายาม PATCH order ที่ถูกลบไปแล้ว

```
[Pre] bookId = 1

1. GET /status → 200

2. GET /books?type=fiction&limit=1 → 200

3. GET /books/{bookId} → 200

4. POST /orders  🔒  [target order]
   → 201: { orderId: "<uuid>" }

5. POST /orders  🔒  [extra data]
   → 201

6. GET /orders  🔒  [before delete] → 200

7. GET /orders/{orderId}  🔒  [before delete] → 200

8. DELETE /orders/{orderId}  🔒
   → 204

9. GET /orders  🔒  [after delete]
   → 200: validate orderId ไม่อยู่ใน list

10. GET /orders/{orderId}  🔒  [after delete]
    → 404: { error: "No order with id {orderId}." }

11. PATCH /orders/{orderId}  🔒  [update deleted order]
    Body: { customerName: "..." }
    → 404: { error: "No order with id {orderId}." }
```

---

### F3 - Delete Deleted Order

**วัตถุประสงค์:** พยายาม DELETE order ที่ถูกลบไปแล้ว

```
[Pre] bookId = 1

1. GET /status → 200

2. GET /books?type=fiction&limit=1 → 200

3. GET /books/{bookId} → 200

4. POST /orders  🔒  [target order]
   → 201: { orderId: "<uuid>" }

5. POST /orders  🔒  [extra data]
   → 201

6. GET /orders  🔒  [before delete] → 200

7. GET /orders/{orderId}  🔒  [before delete] → 200

8. DELETE /orders/{orderId}  🔒  [first delete]
   → 204

9. GET /orders  🔒  [after delete]
   → 200: validate orderId ไม่อยู่ใน list

10. GET /orders/{orderId}  🔒  [after delete]
    → 404: { error: "No order with id {orderId}." }

11. DELETE /orders/{orderId}  🔒  [second delete - same orderId]
    → 404: { error: "No order with id {orderId}." }
```

---

### F4 - Duplicate Email Registration

**วัตถุประสงค์:** พยายามลงทะเบียนด้วย email ที่ใช้ไปแล้ว

```
[Pre] ใช้ lastName และ randomNum เดิมจาก preRequest

1. GET /status → 200

2. POST /api-clients  [same email as preRequest]
   Body: { clientName: "...", clientEmail: "{lastName}_{randomNum}@example.com" }
   → 409: { error: "API client already registered. Try a different email." }
```

---

## Flow Summary

| Flow | Scenario | bookId | Key Action | Expected Result |
|------|----------|--------|------------|-----------------|
| S1 | Order Books - Success | 1 (fiction) | Create order | 201 + orderId |
| S2 | Update Order - Success | 5 (non-fiction) | Create + PATCH order | 204 no body |
| S3 | Delete Order - Success | 1 (fiction) | Create + DELETE order | 204 → 404 |
| F1 | Order Out of Stock | 2 (stock=0) | Create order | 404 out of stock |
| F2 | Update Deleted Order | 1 (fiction) | DELETE then PATCH | 404 not found |
| F3 | Delete Deleted Order | 1 (fiction) | DELETE twice | 404 not found |
| F4 | Duplicate Email | - | Register same email | 409 conflict |

## State Diagram

```
[Start]
   │
   ▼
POST /api-clients ──── 409 ──→ [F4: Duplicate Email]
   │ 201
   ▼
GET /status (200)
   │
   ▼
GET /books ──── available=false ──→ POST /orders ──→ 404 [F1: Out of Stock]
   │ available=true
   ▼
GET /books/{id}
   │
   ▼
POST /orders (201) ──────────────────────────────────────────────┐
   │                                                              │
   ├──→ GET /orders → GET /orders/{id} → [S1: Order Success]     │
   │                                                              │
   ├──→ PATCH /orders/{id} (204) → GET /orders → [S2: Update]    │
   │                                                              │
   └──→ DELETE /orders/{id} (204) ──→ GET /orders/{id} → 404     │
              │                                                   │
              ├──→ [S3: Delete Success]                           │
              ├──→ PATCH /orders/{id} → 404 [F2: Update Deleted]  │
              └──→ DELETE /orders/{id} → 404 [F3: Delete Deleted] │
                                                                  │
[End] ◄────────────────────────────────────────────────────────┘
```

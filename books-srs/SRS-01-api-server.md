# SRS-01: API Server Requirements (books-local)

## 1. Overview

**System Name:** Simple Books API - Local Mock Server  
**Technology:** Python 3, Flask, Flask-CORS  
**Base URL:** `http://localhost:5000`  
**Web UI:** `http://localhost:8000/ui.html`  
**API Docs:** `http://localhost:8000/api-docs.html`

## 2. Functional Requirements

### FR-01: Health Check

| ID | Requirement |
|----|-------------|
| FR-01-01 | ระบบต้องมี endpoint `GET /status` สำหรับตรวจสอบสถานะ |
| FR-01-02 | Response ต้องมี field `status: "OK"` และ `startTime` |
| FR-01-03 | Response status code ต้องเป็น `200` |

### FR-02: Authentication

| ID | Requirement |
|----|-------------|
| FR-02-01 | ระบบต้องรองรับการลงทะเบียน API Client ผ่าน `POST /api-clients` |
| FR-02-02 | Request ต้องมี `clientEmail` และ `clientName` |
| FR-02-03 | ระบบต้องสร้าง `accessToken` (UUID hex 64 chars) และ return กลับ |
| FR-02-04 | Response status code ต้องเป็น `201` เมื่อสำเร็จ |
| FR-02-05 | ระบบต้องปฏิเสธ email ที่ลงทะเบียนซ้ำ ด้วย status `409` |
| FR-02-06 | Protected endpoints ต้องตรวจสอบ `Authorization: Bearer <token>` header |
| FR-02-07 | ระบบต้อง return `401` เมื่อไม่มี token หรือ token ไม่ถูกต้อง |

### FR-03: Books Management

| ID | Requirement |
|----|-------------|
| FR-03-01 | ระบบต้องมีข้อมูลหนังสือ 25 เล่ม (fiction และ non-fiction) |
| FR-03-02 | `GET /books` ต้อง return รายการหนังสือทั้งหมด (id, name, type, available) |
| FR-03-03 | `GET /books?type=fiction` ต้อง filter เฉพาะ fiction |
| FR-03-04 | `GET /books?type=non-fiction` ต้อง filter เฉพาะ non-fiction |
| FR-03-05 | `GET /books?limit=N` ต้อง return ไม่เกิน N รายการ (1-20) |
| FR-03-06 | `GET /books/{bookId}` ต้อง return รายละเอียดหนังสือ (id, name, type, available, author, price, current-stock) |
| FR-03-07 | `GET /books/{bookId}` ต้อง return `404` เมื่อไม่พบหนังสือ |
| FR-03-08 | field `available` ต้องสะท้อนสถานะ `current-stock > 0` |

### FR-04: Orders Management

| ID | Requirement |
|----|-------------|
| FR-04-01 | `POST /orders` ต้องสร้าง order ใหม่ (ต้องมี token) |
| FR-04-02 | Request ต้องมี `bookId` และ `customerName` |
| FR-04-03 | ระบบต้องตรวจสอบว่าหนังสือมีสต็อกก่อนสร้าง order |
| FR-04-04 | เมื่อสร้าง order สำเร็จ ต้องลด `current-stock` ลง 1 |
| FR-04-05 | Response ต้องมี `created: true` และ `orderId` (UUID 21 chars) |
| FR-04-06 | Response status code ต้องเป็น `201` เมื่อสำเร็จ |
| FR-04-07 | ระบบต้อง return `404` พร้อม error message เมื่อหนังสือหมดสต็อก |
| FR-04-08 | `GET /orders` ต้อง return รายการ orders ทั้งหมดของ token นั้น |
| FR-04-09 | `GET /orders/{orderId}` ต้อง return รายละเอียด order |
| FR-04-10 | `PATCH /orders/{orderId}` ต้องอัปเดต `customerName` ได้ |
| FR-04-11 | `PATCH /orders/{orderId}` ต้อง return `204` เมื่อสำเร็จ |
| FR-04-12 | `DELETE /orders/{orderId}` ต้องลบ order ได้ |
| FR-04-13 | `DELETE /orders/{orderId}` ต้อง return `204` เมื่อสำเร็จ |
| FR-04-14 | ทุก order endpoint ต้อง return `404` เมื่อไม่พบ orderId |

### FR-05: Stock Management

| ID | Requirement |
|----|-------------|
| FR-05-01 | `POST /reset` ต้องรีเซ็ตสต็อกหนังสือทั้งหมดกลับค่าเริ่มต้น |
| FR-05-02 | Response ต้องมี `message: "Stock reset successfully"` |
| FR-05-03 | Response status code ต้องเป็น `200` |

### FR-06: Web UI

| ID | Requirement |
|----|-------------|
| FR-06-01 | Web UI ต้องมีระบบ Password Protection (รหัสผ่าน: `qacoe`) |
| FR-06-02 | Web UI ต้องแสดงรายการหนังสือพร้อม filter ตาม type |
| FR-06-03 | Web UI ต้องรองรับการสร้าง, แก้ไข, ลบ Orders |
| FR-06-04 | Web UI ต้องมี Swagger UI สำหรับ API Documentation |
| FR-06-05 | Web UI ต้องมี `data-testid` attributes ครบถ้วนสำหรับ Automation Testing |
| FR-06-06 | Web UI ต้องรองรับ Color Themes อย่างน้อย 6 ชุดสี |

## 3. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | ระบบต้องรองรับ CORS สำหรับ cross-origin requests |
| NFR-02 | API ต้องรัน port `5000`, Web UI ต้องรัน port `8000` |
| NFR-03 | ระบบต้องรองรับ Windows และ macOS/Linux |
| NFR-04 | `/status` endpoint ต้องมี `Cache-Control: no-cache` header |
| NFR-05 | ระบบต้องเก็บข้อมูลใน memory (in-memory storage) |

## 4. Mock Data - Books

| ID | Name | Type | Author | Price | Initial Stock |
|----|------|------|--------|-------|---------------|
| 1 | The Russian | fiction | James Patterson | $12.99 | 3 |
| 2 | Just as I Am | non-fiction | Cicely Tyson | $20.33 | 0 |
| 3 | The Vanishing Half | fiction | Brit Bennett | $15.99 | 5 |
| 4 | The Midnight Library | fiction | Matt Haig | $13.50 | 8 |
| 5 | Untamed | non-fiction | Glennon Doyle | $14.99 | 12 |
| 6 | Viscount Who Loved Me | fiction | Julia Quinn | $11.99 | 7 |
| 7 | The Last Thing He Told Me | fiction | Laura Dave | $16.99 | 15 |
| 8 | Atomic Habits | non-fiction | James Clear | $18.99 | 20 |
| 9 | The Silent Patient | fiction | Alex Michaelides | $14.50 | 0 |
| 10 | Educated | non-fiction | Tara Westover | $17.99 | 9 |
| ... | (ทั้งหมด 25 เล่ม) | | | | |

## 5. Azure DevOps Work Items

**Board:** https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_boards

| PBI ID | Feature | Axons Test Scenario IDs |
|--------|---------|-------------------------|
| [12555](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12555) | FR-01: Health Check | 12653, 12570 |
| [12556](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12556) | FR-02: Authentication | 12571, 12572, 12573, 12574 |
| [12557](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12557) | FR-03: Books Management | 12575, 12576, 12577, 12578, 12579, 12580, 12581 |
| [12558](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12558) | FR-04: Orders Management | 12582, 12583, 12584, 12585, 12586, 12587, 12588, 12589, 12590, 12591 |
| [12559](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12559) | FR-05: Stock Management | 12592, 12593 |
| [12560](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12560) | FR-06: Web UI | 12595, 12596, 12597, 12598, 12599, 12600 |

## 6. Known Issues / Bugs

| ID | Description |
|----|-------------|
| BUG-01 | Book ID 3 (The Vanishing Half) ข้ามการตรวจสอบสต็อก — สามารถสั่งซื้อได้แม้หมดสต็อก |

## 7. data-testid Reference

### Authentication
- `password-input`, `password-submit`, `password-error`
- `email-input`, `name-input`, `register-button`, `token-display`

### Navigation
- `books-tab`, `orders-tab`, `swagger-tab`

### Books
- `book-card-{id}`, `book-title-{id}`, `book-type-{id}`, `book-status-{id}`
- `type-filter`, `limit-filter`, `refresh-books-button`, `reset-stock-button`

### Orders
- `order-book-id`, `order-customer-name`, `create-order-button`
- `order-item-{id}`, `edit-order-{id}`, `delete-order-{id}`

### Modals
- `book-modal`, `order-modal`, `delete-modal`
- `modal-close`, `save-order-button`, `confirm-delete-button`

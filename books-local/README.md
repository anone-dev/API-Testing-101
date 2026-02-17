# Simple Books API - Local Mock Server

Mock API Server สำหรับทดสอบ Simple Books API ในเครื่อง Local โดยไม่ต้องเชื่อมต่อกับ external API

## วิธีการใช้งาน

### Windows
```cmd
# PowerShell
.\start.bat

# CMD
start.bat
```

### macOS / Linux
```bash
chmod +x start.sh
./start.sh
```

### URLs
- **API Server**: http://localhost:5000
- **Web UI**: http://localhost:8000/ui.html
- **API Docs (Swagger)**: http://localhost:8000/api-docs.html

## ทดสอบ API

#### ตรวจสอบสถานะ
```bash
curl http://localhost:5000/status
```

#### ลงทะเบียน API Client
```bash
curl -X POST http://localhost:5000/api-clients ^
  -H "Content-Type: application/json" ^
  -d "{\"clientEmail\":\"test@example.com\",\"clientName\":\"Test User\"}"
```

#### ดูรายการหนังสือ
```bash
curl http://localhost:5000/books
curl http://localhost:5000/books?type=fiction
curl http://localhost:5000/books?limit=3
```

#### ดูรายละเอียดหนังสือ
```bash
curl http://localhost:5000/books/1
```

#### สร้าง Order (ต้องมี Token)
```bash
curl -X POST http://localhost:5000/orders ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"bookId\":1,\"customerName\":\"John Doe\"}"
```

#### ดู Orders
```bash
curl http://localhost:5000/orders ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

## API Documentation

เปิด **api-docs.html** ใน browser หรือคลิกที่ปุ่ม "📄 API Docs" ใน Web UI

## หนังสือที่มีใน Mock Data (25 เล่ม)

1. The Russian (fiction) - มีสต็อก
2. Just as I Am (non-fiction) - หมดสต็อก
3. The Vanishing Half (fiction) - มีสต็อก
4. The Midnight Library (fiction) - มีสต็อก
5. Untamed (non-fiction) - มีสต็อก
6. Viscount Who Loved Me (fiction) - มีสต็อก

## Features

✅ **Password Protected** - รหัสผ่าน: `qacoe` (ใส่ครั้งเดียวต่อการเปิด app)
✅ **Web UI** - อินเตอร์เฟซแบบกราฟิกสำหรับจัดการ Books และ Orders
✅ **Swagger UI** - API Documentation แบบสมบูรณ์
✅ รองรับ CORS
✅ Authentication ด้วย Bearer Token
✅ จัดการ Books, Orders, API Clients
✅ Filter หนังสือตาม type และ limit
✅ **Stock Management** - ระบบจัดการสต็อกอัตโนมัติ
✅ **Reset Stock** - รีเซ็ตสต็อกโดยไม่ต้อง restart server
✅ **Color Themes** - 6 ชุดสีให้เลือก
✅ **Playwright Ready** - มี data-testid สำหรับ automation testing

## 🎭 Playwright Automation Testing

Web UI มี **data-testid attributes** ครบถ้วนสำหรับ automation testing ด้วย Playwright

### ตัวอย่าง Test Scenarios

```javascript
// 1. Login
await page.fill('[data-testid="password-input"]', 'qacoe');
await page.click('[data-testid="password-submit"]');

// 2. Register API Client
await page.fill('[data-testid="email-input"]', 'test@example.com');
await page.fill('[data-testid="name-input"]', 'Test User');
await page.click('[data-testid="register-button"]');

// 3. View Book Details
await page.click('[data-testid="book-card-1"]');
await expect(page.locator('[data-testid="detail-value-name"]')).toBeVisible();

// 4. Create Order
await page.click('[data-testid="orders-tab"]');
await page.fill('[data-testid="order-book-id"]', '1');
await page.fill('[data-testid="order-customer-name"]', 'John Doe');
await page.click('[data-testid="create-order-button"]');

// 5. Edit Order
await page.click('[data-testid="edit-order-1"]');
await page.fill('[data-testid="edit-customer-name"]', 'Jane Doe');
await page.click('[data-testid="save-order-button"]');

// 6. Delete Order
await page.click('[data-testid="delete-order-1"]');
await page.click('[data-testid="confirm-delete-button"]');
```

### รายการ data-testid ที่สำคัญ

**Authentication:**
- `password-input`, `password-submit`, `password-error`
- `email-input`, `name-input`, `register-button`, `token-display`

**Navigation:**
- `books-tab`, `orders-tab`, `swagger-tab`

**Books:**
- `book-card-{id}`, `book-title-{id}`, `book-type-{id}`, `book-status-{id}`
- `type-filter`, `limit-filter`, `refresh-books-button`, `reset-stock-button`

**Orders:**
- `order-book-id`, `order-customer-name`, `create-order-button`
- `order-item-{id}`, `edit-order-{id}`, `delete-order-{id}`

**Modals:**
- `book-modal`, `order-modal`, `delete-modal`
- `modal-close`, `save-order-button`, `confirm-delete-button`

# API Testing 101 - Simple Books API

โปรเจกต์สำหรับเรียนรู้และฝึกทดสอบ API โดยใช้ Simple Books API พร้อม Local Mock Server, Modern Web UI และ Mobile App

**Developed by:** Anan.Ph : QA-CoE | 2026-02-17

---

## 📚 เนื้อหาในโปรเจกต์

### 1. **Swagger API Documentation** (GitHub Pages)
API documentation ที่โฮสต์บน GitHub Pages สำหรับ Simple Books API
- **Live Demo**: [https://peter-evans.github.io/swagger-github-pages](https://peter-evans.github.io/swagger-github-pages/)
- ใช้ Swagger UI แสดง API specification
- Auto-update Swagger UI dependency ผ่าน GitHub Actions

### 2. **Local Mock Server** (`books-local/`)
Mock API Server พร้อม Modern Web UI สำหรับทดสอบในเครื่อง Local

#### 🚀 Quick Start

**Windows:**
```cmd
cd books-local

# PowerShell
.\start.bat

# CMD
start.bat
```

**macOS / Linux:**
```bash
cd books-local
chmod +x start.sh
./start.sh
```

#### ✨ Features

- 📖 **25 Books** - Fiction และ Non-Fiction พร้อม emoji covers
- 🎨 **6 Color Themes** - เลือกชุดสีได้ตามใจชอบ
- 🔐 **Authentication** - Bearer Token authentication
- 📦 **Stock Management** - ระบบจัดการสต็อกอัตโนมัติ
- 🔄 **Reset Stock** - รีเซ็ตสต็อกโดยไม่ต้อง restart server
- 🛒 **Orders CRUD** - สร้าง, อ่าน, แก้ไข, ลบ orders
- 🐛 **Intentional Bug** - Book ID 3 สามารถสั่งซื้อได้แม้สต็อกหมด (สำหรับทดสอบ)
- 🎭 **Playwright Ready** - มี data-testid attributes สำหรับ automation testing
- 🌐 **Modern Web UI** - Single-page application พร้อม gradient backgrounds
- 📄 **Swagger UI** - API documentation แบบ interactive

#### 📂 ไฟล์สำคัญ

```
books-local/
├── start.bat              # Windows startup script
├── start.sh               # macOS/Linux startup script
├── app.py                 # Flask API server
├── ui.html                # Modern Web UI
├── api-docs.html          # Swagger UI documentation
├── swagger-local.yaml     # OpenAPI specification
├── requirements.txt       # Python dependencies
└── README.md              # คู่มือการใช้งานแบบละเอียด
```

#### 🌐 URLs

- **API Server**: http://localhost:5000
- **Web UI**: http://localhost:8000/ui.html
- **API Docs**: http://localhost:8000/api-docs.html

#### 📖 API Endpoints

- `GET /status` - ตรวจสอบสถานะ API
- `GET /books` - ดูรายการหนังสือ (รองรับ `?type=fiction|non-fiction&limit=1-20`)
- `GET /books/:id` - ดูรายละเอียดหนังสือ
- `POST /api-clients` - ลงทะเบียนและรับ access token
- `POST /orders` - สร้าง order (ต้องมี token)
- `GET /orders` - ดูรายการ orders (ต้องมี token)
- `GET /orders/:id` - ดูรายละเอียด order (ต้องมี token)
- `PATCH /orders/:id` - แก้ไข order (ต้องมี token)
- `DELETE /orders/:id` - ลบ order (ต้องมี token)
- `POST /reset` - รีเซ็ตสต็อกหนังสือ

### 3. **Mobile App** (`books_mobile_app/`)
Flutter mobile application สำหรับ Android และ iOS

#### 🚀 Quick Start

**Windows:**
```cmd
cd books_mobile_app
run-simple.bat
```

**Build APK:**
```cmd
cd books_mobile_app
build-apk.bat
```

#### ✨ Features

- 📱 **Cross-Platform** - Android, iOS, Windows, Web
- 🔐 **Authentication** - Register แลเ Login ด้วย token
- 📝 **Token Management** - Copy/Paste token จาก clipboard
- 📚 **Books Management** - ดู, ค้นหา, filter หนังสือ
- 🛍️ **Orders CRUD** - สร้าง, ดู, แก้ไข, ลบ orders
- 🤖 **Automation Ready** - มี keys สำหรับ Robot Framework + Appium
- 🎨 **Modern UI** - Material Design พร้อม gradient backgrounds

#### 📱 APK for Testing

**Build:**
```cmd
cd books_mobile_app
build-apk.bat
```

**Install:**
```bash
adb install build\app\outputs\flutter-apk\app-release.apk
```

**Appium Config:**
- **App Package:** `com.example.books_mobile_app`
- **App Activity:** `.MainActivity`
- **Automation Name:** `UiAutomator2`

ดูเพิ่มเติม: [books_mobile_app/README.md](books_mobile_app/README.md)

---

## 🔧 การตั้งค่า GitHub Pages (สำหรับ Swagger UI)

### วิธีที่ 1: ใช้ Template

1. คลิก `Use this template` เพื่อสร้าง repository ใหม่
2. ไปที่ Settings → Pages
3. เปิดใช้งาน GitHub Pages
4. เข้าดูได้ที่ `https://{username}.github.io/{repository-name}/`

### วิธีที่ 2: ตั้งค่าเอง

1. Download [Swagger UI](https://github.com/swagger-api/swagger-ui/releases)
2. Copy "dist" directory มาที่ root ของ repository
3. ย้าย `index.html` จาก dist มาที่ root
4. Copy `swagger.yaml` มาที่ root
5. แก้ไข `dist/swagger-initializer.js`:
   ```javascript
   window.ui = SwaggerUIBundle({
       url: "swagger.yaml",
       ...
   ```
6. แก้ไข path ใน `index.html` ให้ชี้ไปที่ `dist/`
7. เปิดใช้งาน GitHub Pages ใน Settings

---

## 📝 การใช้งาน

### ทดสอบด้วย Web UI (แนะนำ)
1. รัน `start.bat` (Windows) หรือ `./start.sh` (macOS/Linux)
2. เปิด browser ที่ http://localhost:8000/ui.html
3. ลงทะเบียนเพื่อรับ token
4. ทดสอบ Books และ Orders ผ่าน UI

### ทดสอบด้วย curl

```bash
# ตรวจสอบสถานะ
curl http://localhost:5000/status

# ดูรายการหนังสือ
curl http://localhost:5000/books?type=fiction&limit=5

# ลงทะเบียน
curl -X POST http://localhost:5000/api-clients \
  -H "Content-Type: application/json" \
  -d '{"clientEmail":"test@example.com","clientName":"Test User"}'

# สร้าง order
curl -X POST http://localhost:5000/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"bookId":1,"customerName":"John Doe"}'
```

---

## 🧪 Testing Features

### Stock Management Testing
1. สั่งซื้อหนังสือจนสต็อกหมด
2. ตรวจสอบว่า `available` เปลี่ยนเป็น `false`
3. ลองสั่งซื้อหนังสือที่หมดสต็อก (ควรได้ error)
4. **Bug**: ลองสั่งซื้อ Book ID 3 ตอนสต็อกหมด (จะสั่งได้!)
5. กดปุ่ม "Reset Stock" เพื่อรีเซ็ต

### Playwright Automation
ทุก element มี `data-testid` attributes:
- `data-testid="email-input"`
- `data-testid="register-button"`
- `data-testid="book-card-{id}"`
- `data-testid="create-order-button"`
- และอื่นๆ

---

## 🛠️ Technical Stack

**Backend:**
- Python Flask + CORS

**Frontend:**
- Vanilla JavaScript + Modern CSS (Web UI)
- Flutter + Dart (Mobile App)

**State Management:**
- Provider (Flutter)

**API Docs:**
- Swagger UI + OpenAPI 3.0

**Testing:**
- Playwright-ready (Web UI)
- Appium-ready (Mobile App)

**Deployment:**
- GitHub Pages (Swagger UI)

---

## 📚 Resources

**API:**
- [Simple Books API (Live)](https://simple-books-api.glitch.me)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Specification](https://swagger.io/specification/)

**Backend:**
- [Flask Documentation](https://flask.palletsprojects.com/)

**Frontend:**
- [Playwright Testing](https://playwright.dev/)

**Mobile:**
- [Flutter Documentation](https://docs.flutter.dev/)
- [Appium Documentation](http://appium.io/docs/en/latest/)
- [Robot Framework](https://robotframework.org/)

---

## 📄 License

This project is open source and available under the MIT License.

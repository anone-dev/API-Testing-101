# SRS-02: Mobile App Requirements (books_mobile_app)

## 1. Overview

**System Name:** Books Mobile App  
**Technology:** Flutter (Dart), Provider, HTTP, SharedPreferences  
**Platform:** Android, iOS, Windows Desktop, Web (Chrome)  
**Package:** `com.example.books_mobile_app`  
**Version:** 1.0.0+1

## 2. Functional Requirements

### FR-01: Authentication Screen

| ID | Requirement |
|----|-------------|
| FR-01-01 | แอปต้องแสดง Auth Screen เป็นหน้าแรกเมื่อยังไม่ได้ login |
| FR-01-02 | Auth Screen ต้องมี 2 mode: **Register** และ **Login with Token** |
| FR-01-03 | ผู้ใช้ต้องสลับระหว่าง Register / Login mode ได้ |
| FR-01-04 | **Register mode** ต้องมี field: Email, Name |
| FR-01-05 | Email field ต้องตรวจสอบรูปแบบ email (ต้องมี `@`) |
| FR-01-06 | Name field ต้องไม่ว่างเปล่า |
| FR-01-07 | เมื่อ Register สำเร็จ ระบบต้องบันทึก token และเข้าสู่ Home Screen |
| FR-01-08 | เมื่อ Register ล้มเหลว ต้องแสดง error message ใน SnackBar |
| FR-01-09 | **Login mode** ต้องมี field: Access Token |
| FR-01-10 | Login mode ต้องมีปุ่ม Paste จาก Clipboard |
| FR-01-11 | ระบบต้อง validate token กับ API ก่อน login |
| FR-01-12 | เมื่อ token ไม่ถูกต้อง ต้องแสดง error message |
| FR-01-13 | Auth Screen ต้องมี gradient background (purple theme) |

### FR-02: Home Screen / Navigation

| ID | Requirement |
|----|-------------|
| FR-02-01 | Home Screen ต้องมี Bottom Navigation Bar |
| FR-02-02 | Navigation ต้องมี 3 tabs: **Books**, **Orders**, **Profile/Logout** |
| FR-02-03 | ผู้ใช้ต้องสามารถ logout ได้ และกลับไปยัง Auth Screen |

### FR-03: Books Screen

| ID | Requirement |
|----|-------------|
| FR-03-01 | Books Screen ต้องแสดงรายการหนังสือทั้งหมดจาก API |
| FR-03-02 | ต้องมี filter: **All**, **Fiction**, **Non-Fiction** (SegmentedButton) |
| FR-03-03 | แต่ละ book card ต้องแสดง: ชื่อหนังสือ, ID, type, สถานะ (Available/Out of Stock) |
| FR-03-04 | Book card ต้องมี icon สีแตกต่างกันตาม type (fiction=purple, non-fiction=orange) |
| FR-03-05 | ต้องรองรับ Pull to Refresh |
| FR-03-06 | เมื่อกด book card ต้องนำไปยัง Book Detail Screen |
| FR-03-07 | ต้องแสดง loading indicator ขณะโหลดข้อมูล |
| FR-03-08 | เมื่อโหลดล้มเหลว ต้องแสดง error message ใน SnackBar |

### FR-04: Book Detail Screen

| ID | Requirement |
|----|-------------|
| FR-04-01 | Book Detail Screen ต้องแสดง: ชื่อ, ผู้แต่ง, ราคา, สถานะสต็อก |
| FR-04-02 | ต้องมีฟอร์มสำหรับสร้าง Order (Customer Name input) |
| FR-04-03 | ปุ่ม Create Order ต้องส่ง request ไปยัง API |
| FR-04-04 | เมื่อสร้าง Order สำเร็จ ต้องแสดง success message |
| FR-04-05 | เมื่อสร้าง Order ล้มเหลว ต้องแสดง error message |

### FR-05: Orders Screen

| ID | Requirement |
|----|-------------|
| FR-05-01 | Orders Screen ต้องแสดงรายการ orders ทั้งหมดของ token ปัจจุบัน |
| FR-05-02 | แต่ละ order card ต้องแสดง: Order ID, Customer Name, Book ID |
| FR-05-03 | ต้องมีปุ่ม Edit (แก้ไข customerName) ในแต่ละ order |
| FR-05-04 | เมื่อกด Edit ต้องแสดง Dialog พร้อม text field สำหรับแก้ไขชื่อ |
| FR-05-05 | ต้องมีปุ่ม Delete ในแต่ละ order |
| FR-05-06 | เมื่อกด Delete ต้องแสดง Confirmation Dialog ก่อนลบ |
| FR-05-07 | ต้องรองรับ Pull to Refresh |
| FR-05-08 | เมื่อไม่มี orders ต้องแสดงข้อความ "No orders yet" |

## 3. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | แอปต้องรองรับ Android, iOS, Windows Desktop, Web |
| NFR-02 | แอปต้อง connect กับ API Server ที่ `http://10.0.2.2:5000` (Android Emulator default) |
| NFR-03 | แอปต้องรองรับการเปลี่ยน base URL สำหรับ Physical Device |
| NFR-04 | แอปต้องมี `key` attributes ครบถ้วนสำหรับ Robot Framework + Appium testing |
| NFR-05 | แอปต้องใช้ Provider pattern สำหรับ state management |
| NFR-06 | Token ต้องถูกเก็บใน SharedPreferences |

## 4. Project Structure

```
lib/
├── main.dart                    # Entry point
├── models/
│   ├── book.dart               # Book data model
│   └── order.dart              # Order data model
├── services/
│   └── api_service.dart        # HTTP API calls
├── providers/
│   └── auth_provider.dart      # Authentication state management
└── screens/
    ├── auth_screen.dart        # Login/Register screen
    ├── home_screen.dart        # Main navigation
    ├── books_screen.dart       # Books list with filter
    ├── book_detail_screen.dart # Book details + create order
    └── orders_screen.dart      # Orders list + edit/delete
```

## 5. API Integration

| Screen | API Call | Endpoint |
|--------|----------|----------|
| Auth (Register) | POST | `/api-clients` |
| Auth (Login) | GET | `/orders` (validate token) |
| Books Screen | GET | `/books?type={filter}` |
| Book Detail | GET | `/books/{bookId}` |
| Book Detail | POST | `/orders` |
| Orders Screen | GET | `/orders` |
| Orders Screen | PATCH | `/orders/{orderId}` |
| Orders Screen | DELETE | `/orders/{orderId}` |

## 6. Automation Testing Keys

### Auth Screen
- `email_input`, `name_input`, `register_button`
- `token_input`, `paste_token_button`, `login_button`
- `toggle_mode_button`

### Books Screen
- `book_filter`
- `book_card_{id}`

### Book Detail Screen
- `book_name`, `book_author`, `book_price`, `book_stock`
- `customer_name_input`, `create_order_button`

### Orders Screen
- `order_card_{id}`
- `edit_order_{id}`, `delete_order_{id}`

### Dialogs
- `update_order_dialog`, `update_customer_name_input`
- `update_cancel_button`, `update_confirm_button`
- `delete_order_dialog`, `delete_cancel_button`, `delete_confirm_button`

## 7. Dependencies

```yaml
dependencies:
  http: ^1.2.0              # HTTP requests
  provider: ^6.1.1          # State management
  shared_preferences: ^2.2.2 # Local token storage

dev_dependencies:
  flutter_lints: ^2.0.0
  flutter_launcher_icons: ^0.13.1
```

## 8. Build & Run

| Platform | Command |
|----------|---------|
| Windows Desktop | `flutter run -d windows` หรือ `run-simple.bat` |
| Android Emulator | `flutter run` |
| Chrome | `flutter run -d chrome` |
| Build APK | `build-apk.bat` หรือ `flutter build apk --release` |

## 8. Azure DevOps Work Items

**Board:** https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_boards

| PBI ID | Feature | Axons Test Scenario IDs |
|--------|---------|-------------------------|
| [12561](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12561) | FR-01: Authentication Screen | 12601, 12602, 12603, 12604, 12605, 12606, 12607, 12608 |
| [12562](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12562) | FR-02: Home Screen / Navigation | 12609, 12610 |
| [12563](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12563) | FR-03: Books Screen | 12611, 12612, 12613, 12615 |
| [12564](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12564) | FR-04: Book Detail Screen | 12614, 12616, 12617 |
| [12565](https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_workitems/edit/12565) | FR-05: Orders Screen | 12618, 12619, 12620, 12621, 12622 |

## 9. Appium Configuration (Robot Framework)

```robot
${PLATFORM_NAME}        Android
${DEVICE_NAME}          emulator-5554
${APP_PACKAGE}          com.example.books_mobile_app
${APP_ACTIVITY}         .MainActivity
${AUTOMATION_NAME}      UiAutomator2
```

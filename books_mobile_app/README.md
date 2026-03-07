# 📱 Books Mobile App (Flutter)

Flutter mobile application สำหรับ Simple Books API

## 🚀 Quick Start

### Windows (แนะนำ)
```cmd
cd books_mobile_app
run-simple.bat
```

### Build for Android

#### APK (สำหรับ Testing)
```bash
cd books_mobile_app
flutter build apk
```
APK จะอยู่ที่: `build/app/outputs/flutter-apk/app-release.apk`

#### APK แยกตาม CPU (ขนาดเล็กกว่า)
```bash
flutter build apk --split-per-abi
```
APK จะอยู่ที่:
- `build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk`
- `build/app/outputs/flutter-apk/app-arm64-v8a-release.apk`
- `build/app/outputs/flutter-apk/app-x86_64-release.apk`

#### App Bundle (สำหรับ Google Play Store)
```bash
flutter build appbundle
```
AAB จะอยู่ที่: `build/app/outputs/bundle/release/app-release.aab`

#### Windows Batch Script
```cmd
build-apk.bat
```

### Build for iOS (macOS only)

#### .app สำหรับ iOS Simulator (Appium Testing)
```bash
cd books_mobile_app
flutter build ios --simulator --debug
```
.app จะอยู่ที่: `build/ios/iphonesimulator/Runner.app`

#### .ipa สำหรับ Physical Device
```bash
flutter build ipa --release
```
.ipa จะอยู่ที่: `build/ios/ipa/books_mobile_app.ipa`

#### เปิดใน Xcode (สำหรับ Archive/Upload)
```bash
open ios/Runner.xcworkspace
```

**หมายเหตุ iOS:**
- **Simulator**: ใช้ `.app` (ไม่ต้อง Apple Developer Account)
- **Physical Device**: ใช้ `.ipa` (ต้อง Apple Developer Account + code signing)
- **Manual Testing**: ไม่ต้อง build แค่ `flutter run`

### Manual

#### 1. ติดตั้ง Dependencies
```bash
cd books_mobile_app
flutter pub get
```

#### 2. เริ่มต้น Local API Server
```bash
# ใน terminal อื่น
cd ../books-local
start.bat  # Windows
# หรือ ./start.sh  # macOS/Linux
```

#### 3. รัน Flutter App
```bash
# Windows Desktop
flutter run -d windows

# Chrome
flutter run -d chrome

# Android Emulator
flutter run

# เลือก device
flutter devices
flutter run -d <device-id>
```

## 🔧 Configuration

### API URL

แอปจะ **auto-detect port อัตโนมัติ** โดยลองเชื่อมต่อ:
1. Port 5001 ก่อน (macOS default)
2. Port 5000 (Windows/Linux default)

**ไม่ต้องแก้ไขโค้ด** - แอปจะหา port ที่ใช้งานได้เองอัตโนมัติ

**สำหรับ Physical Device** (ต้องใช้ IP ของเครื่อง):

แก้ไข `lib/services/api_service.dart`:
```dart
// เปลี่ยนจาก auto-detect เป็น IP จริง
static Future<String> get baseUrl async {
  return 'http://192.168.1.xxx:5001'; // ใช้ IP ของเครื่อง
}
```

### หา IP Address ของเครื่อง
**Windows:**
```cmd
ipconfig
# ดูที่ IPv4 Address
```

**macOS/Linux:**
```bash
ifconfig | grep inet
```

## 📱 Features

- ✅ **Authentication** - Register และ Login ด้วย token
- ✅ **Token Management** - Copy/Paste token จาก clipboard
- ✅ **Books List** - แสดงรายการหนังสือพร้อม ID, type และ filter (All/Fiction/Non-Fiction)
- ✅ **Book Details** - รายละเอียดหนังสือ + สถานะสต็อก + ราคา
- ✅ **Create Order** - สร้างคำสั่งซื้อ
- ✅ **Orders List** - ดูรายการคำสั่งซื้อ
- ✅ **Update Order** - แก้ไขชื่อลูกค้า
- ✅ **Delete Order** - ลบคำสั่งซื้อ
- ✅ **Pull to Refresh** - รีเฟรชข้อมูล
- ✅ **Automation Ready** - มี keys สำหรับ Robot Framework + Appium

## 📂 Project Structure

```
lib/
├── main.dart                    # Entry point
├── models/
│   ├── book.dart               # Book model
│   └── order.dart              # Order model
├── services/
│   └── api_service.dart        # HTTP API calls
├── providers/
│   └── auth_provider.dart      # Authentication state
└── screens/
    ├── auth_screen.dart        # Login/Register
    ├── home_screen.dart        # Main navigation
    ├── books_screen.dart       # Books list
    ├── book_detail_screen.dart # Book details + Order
    └── orders_screen.dart      # Orders list
```

## 🧪 Testing

### รัน App บน Windows Desktop (แนะนำ)
```cmd
run-simple.bat
```

### ดู Logs
```cmd
view-logs.bat
```

### Build APK สำหรับ Appium Testing
```cmd
build-apk.bat
```

**ติดตั้ง APK:**
```bash
# ติดตั้งบน Emulator
adb install build\app\outputs\flutter-apk\app-release.apk

# ติดตั้งบน Physical Device
adb -s <device-id> install build\app\outputs\flutter-apk\app-release.apk

# ดู devices ที่เชื่อมต่อ
 adb devices
```

### Appium Configuration
**Desired Capabilities สำหรับ Robot Framework:**

**Android:**
```robot
*** Settings ***
Library    AppiumLibrary

*** Variables ***
${PLATFORM_NAME}        Android
${DEVICE_NAME}          emulator-5554
${APP_PACKAGE}          com.example.books_mobile_app
${APP_ACTIVITY}         .MainActivity
${AUTOMATION_NAME}      UiAutomator2
${APK_PATH}             ${CURDIR}/../build/app/outputs/flutter-apk/app-release.apk

*** Test Cases ***
Open Books App Android
    Open Application    http://localhost:4723/wd/hub
    ...    platformName=${PLATFORM_NAME}
    ...    deviceName=${DEVICE_NAME}
    ...    appPackage=${APP_PACKAGE}
    ...    appActivity=${APP_ACTIVITY}
    ...    automationName=${AUTOMATION_NAME}
    ...    app=${APK_PATH}
```

**iOS Simulator:**
```robot
*** Settings ***
Library    AppiumLibrary

*** Variables ***
${PLATFORM_NAME}        iOS
${PLATFORM_VERSION}     17.0
${DEVICE_NAME}          iPhone 15
${AUTOMATION_NAME}      XCUITest
${APP_PATH}             ${CURDIR}/../build/ios/iphonesimulator/Runner.app

*** Test Cases ***
Open Books App iOS
    Open Application    http://localhost:4723/wd/hub
    ...    platformName=${PLATFORM_NAME}
    ...    platformVersion=${PLATFORM_VERSION}
    ...    deviceName=${DEVICE_NAME}
    ...    automationName=${AUTOMATION_NAME}
    ...    app=${APP_PATH}
```

**iOS Physical Device:**
```robot
*** Variables ***
${PLATFORM_NAME}        iOS
${PLATFORM_VERSION}     17.0
${DEVICE_NAME}          iPhone
${UDID}                 <your-device-udid>
${AUTOMATION_NAME}      XCUITest
${APP_PATH}             ${CURDIR}/../build/ios/ipa/books_mobile_app.ipa

*** Test Cases ***
Open Books App iOS Device
    Open Application    http://localhost:4723/wd/hub
    ...    platformName=${PLATFORM_NAME}
    ...    platformVersion=${PLATFORM_VERSION}
    ...    deviceName=${DEVICE_NAME}
    ...    udid=${UDID}
    ...    automationName=${AUTOMATION_NAME}
    ...    app=${APP_PATH}
```

### Automation Testing Keys
แอปมี `key` attributes สำหรับ Robot Framework + Appium:

**Auth Screen:**
- `email_input`, `name_input`, `register_button`
- `token_input`, `paste_token_button`, `login_button`
- `toggle_mode_button`

**Books Screen:**
- `book_filter`, `book_card_{id}`

**Orders Screen:**
- `order_card_{id}`, `edit_order_{id}`, `delete_order_{id}`

**Book Detail:**
- `book_name`, `book_author`, `book_price`, `book_stock`
- `customer_name_input`, `create_order_button`

**Dialogs:**
- `update_order_dialog`, `delete_order_dialog`

### ทดสอบบน Android Emulator
1. เปิด Android Studio → AVD Manager
2. Start emulator
3. `flutter run`

### ทดสอบบน iOS Simulator (macOS only)
1. `open -a Simulator`
2. `flutter run`

### ทดสอบบน Physical Device
1. เปิด USB Debugging (Android) หรือ Developer Mode (iOS)
2. เชื่อมต่อ device
3. `flutter devices`
4. `flutter run -d <device-id>`
5. **สำคัญ:** แก้ API URL เป็น IP ของเครื่อง

## 📦 Dependencies

```yaml
dependencies:
  http: ^1.2.0              # HTTP requests
  provider: ^6.1.1          # State management
  shared_preferences: ^2.2.2 # Local storage
```

## 🐛 Troubleshooting

### ❌ Connection refused
- ตรวจสอบว่า API server รันอยู่ที่ http://localhost:5000
- Android Emulator ใช้ `10.0.2.2` แทน `localhost`
- Physical device ต้องใช้ IP address ของเครื่อง

### ❌ Certificate error (iOS)
```bash
# Allow HTTP (not HTTPS) in iOS
# แก้ไข ios/Runner/Info.plist
```

### ❌ Package not found
```bash
flutter clean
flutter pub get
```

## 🎨 Screenshots

- **Auth Screen** - Register form พร้อม gradient background
- **Books List** - Grid/List view พร้อม filter
- **Book Details** - รายละเอียดและฟอร์มสั่งซื้อ
- **Orders** - รายการคำสั่งซื้อพร้อมปุ่มลบ

## 📚 Resources

- [Flutter Documentation](https://docs.flutter.dev/)
- [Provider Package](https://pub.dev/packages/provider)
- [HTTP Package](https://pub.dev/packages/http)
- [Simple Books API](../books-local/README.md)

## 🔜 Next Steps

- [x] เพิ่ม PATCH order (แก้ไขคำสั่งซื้อ)
- [x] เพิ่ม Login with Token
- [x] เพิ่ม Automation Testing Keys
- [ ] เพิ่ม search books
- [ ] เพิ่ม pagination
- [ ] เพิ่ม error handling ที่ดีขึ้น
- [ ] เพิ่ม loading states
- [ ] เพิ่ม unit tests
- [ ] เพิ่ม integration tests

---

**Developed by:** Anan.Ph : QA-CoE | 2026-02-17

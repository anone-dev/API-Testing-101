# 🔧 Troubleshooting Guide

## ❌ Error: "engine.realm is being used by another process"

### วิธีแก้:

**1. ปิด process ที่ค้าง:**
```cmd
taskkill /F /IM dart.exe
taskkill /F /IM flutter.exe
```

**2. ลบ Flutter cache:**
```cmd
rmdir /S /Q D:\flutter\bin\cache
```

**3. Rebuild cache:**
```cmd
flutter pub get
```

---

## ❌ Error: "No devices found"

### วิธีแก้:

**Option 1: รันบน Windows Desktop**
```cmd
flutter config --enable-windows-desktop
flutter run -d windows
```

**Option 2: รันบน Chrome**
```cmd
flutter config --enable-web
flutter run -d chrome
```

**Option 3: รันบน Android Emulator**
1. เปิด Android Studio
2. AVD Manager → Start Emulator
3. `flutter run`

---

## ❌ Error: "Connection refused" เมื่อเรียก API

### วิธีแก้:

**1. ตรวจสอบ API Server รันอยู่:**
```cmd
cd ..\books-local
start.bat
```

**2. แก้ API URL ตาม platform:**

แก้ไขใน `lib/services/api_service.dart`:

```dart
// Windows Desktop / Chrome
static const String baseUrl = 'http://localhost:5000';

// Android Emulator
static const String baseUrl = 'http://10.0.2.2:5000';

// iOS Simulator
static const String baseUrl = 'http://localhost:5000';

// Physical Device (ใช้ IP จริง)
static const String baseUrl = 'http://192.168.1.xxx:5000';
```

**3. หา IP Address:**
```cmd
ipconfig
# ดูที่ IPv4 Address
```

---

## ❌ Error: "Developer Mode required"

### วิธีแก้:

**Windows:**
1. กด `Win + I` เปิด Settings
2. ไปที่ Privacy & Security → For developers
3. เปิด "Developer Mode"

หรือรันคำสั่ง:
```cmd
start ms-settings:developers
```

---

## 🧹 Clean Build (แก้ปัญหาทั่วไป)

```cmd
flutter clean
flutter pub get
flutter run
```

---

## 📱 รันบน Platform ต่างๆ

### Windows Desktop
```cmd
flutter config --enable-windows-desktop
flutter run -d windows
```

### Web (Chrome)
```cmd
flutter config --enable-web
flutter run -d chrome
```

### Android
```cmd
# เปิด emulator ก่อน
flutter run
```

### iOS (macOS only)
```cmd
flutter run
```

---

## 🔍 ตรวจสอบ Flutter Setup

```cmd
flutter doctor -v
```

แก้ไขปัญหาตามที่แนะนำ (Android SDK, Visual Studio, etc.)

---

## 💡 Tips

1. **Hot Reload:** กด `r` ใน terminal ขณะรัน app
2. **Hot Restart:** กด `R` ใน terminal
3. **Quit:** กด `q` ใน terminal
4. **Clear Console:** กด `c` ใน terminal

---

## 📞 ยังแก้ไม่ได้?

1. ตรวจสอบ Flutter version: `flutter --version`
2. Update Flutter: `flutter upgrade`
3. ดู logs: `flutter run -v` (verbose mode)

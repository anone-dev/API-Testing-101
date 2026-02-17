# 🐛 Flutter Debugging Guide

## 📱 ดู Error Logs บน Android

### วิธีที่ 1: ใช้ Script (ง่ายที่สุด)
```cmd
view-logs.bat
```

### วิธีที่ 2: Flutter Logs (แนะนำ)
```cmd
# ดู logs แบบ real-time
flutter logs

# ดู logs แบบ verbose (รายละเอียดเยอะ)
flutter logs -v
```

### วิธีที่ 3: Android Logcat
```cmd
# ดูทั้งหมด
adb logcat

# Filter เฉพาะ Flutter
adb logcat | findstr "flutter"

# Filter เฉพาะ Errors
adb logcat *:E

# Filter เฉพาะ app ของคุณ
adb logcat | findstr "books_mobile_app"

# Clear logs แล้วเริ่มใหม่
adb logcat -c
adb logcat
```

### วิธีที่ 4: ดูใน Android Studio
1. เปิด Android Studio
2. View → Tool Windows → Logcat
3. Filter: `package:mine` หรือ `flutter`

---

## 🔍 Debug ใน Flutter App

### 1. เพิ่ม Debug Prints
```dart
// ใน code ของคุณ
print('Debug: Loading books...');
debugPrint('Error: ${e.toString()}');
```

### 2. ใช้ Flutter DevTools
```cmd
# รัน app ก่อน
flutter run

# เปิด DevTools (ใน terminal อื่น)
flutter pub global activate devtools
flutter pub global run devtools
```

### 3. Hot Reload & Hot Restart
```
ขณะ app รันอยู่:
- กด 'r' = Hot Reload (รีโหลดเร็ว)
- กด 'R' = Hot Restart (รีสตาร์ทใหม่)
- กด 'p' = แสดง widget tree
- กด 'o' = Toggle platform (iOS/Android)
- กด 'q' = ออกจาก app
```

---

## 🔧 Debug API Connection Issues

### ตรวจสอบ API URL
```dart
// lib/services/api_service.dart
static const String baseUrl = 'http://10.0.2.2:5000'; // Android Emulator
```

### Test API Connection
```cmd
# จาก emulator (ใช้ adb shell)
adb shell
curl http://10.0.2.2:5000/status

# หรือจาก PC
curl http://localhost:5000/status
```

### เพิ่ม Debug Logging ใน API Service
```dart
Future<List<Book>> getBooks({String? type, int? limit}) async {
  print('🔵 API Call: GET /books?type=$type&limit=$limit');
  
  try {
    final response = await http.get(uri);
    print('✅ Response: ${response.statusCode}');
    print('📦 Body: ${response.body}');
    
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Book.fromJson(json)).toList();
    }
  } catch (e) {
    print('❌ Error: $e');
    throw Exception('Failed to load books: $e');
  }
}
```

---

## 📊 Common Errors & Solutions

### ❌ SocketException: Connection refused
```
สาเหตุ: API server ไม่ได้รัน หรือ URL ผิด
แก้ไข:
1. เช็ค API server: curl http://localhost:5000/status
2. เช็ค URL ใน api_service.dart
3. Android Emulator ต้องใช้ 10.0.2.2 แทน localhost
```

### ❌ FormatException: Unexpected character
```
สาเหตุ: JSON parsing ผิดพลาด
แก้ไข:
1. print(response.body) ดู response จริง
2. เช็ค API ว่า return JSON ถูกต้อง
```

### ❌ Null check operator used on a null value
```
สาเหตุ: ข้อมูลเป็น null แต่ใช้ ! operator
แก้ไข:
1. ใช้ ?. แทน .
2. เช็ค null ก่อนใช้งาน: if (data != null) { ... }
```

### ❌ setState() called after dispose()
```
สาเหตุ: เรียก setState หลัง widget ถูก dispose แล้ว
แก้ไข:
if (mounted) {
  setState(() { ... });
}
```

---

## 🎯 Debug Specific Features

### Debug Authentication
```dart
Future<void> register(String email, String name) async {
  print('🔐 Registering: $email, $name');
  _token = await _apiService.register(email, name);
  print('✅ Token received: ${_token?.substring(0, 10)}...');
  notifyListeners();
}
```

### Debug Orders
```dart
Future<void> _createOrder() async {
  print('🛒 Creating order for book: ${widget.bookId}');
  print('👤 Customer: ${_nameController.text}');
  
  try {
    final orderId = await _apiService.createOrder(...);
    print('✅ Order created: $orderId');
  } catch (e) {
    print('❌ Order failed: $e');
  }
}
```

---

## 💡 Pro Tips

1. **ใช้ try-catch ทุกที่ที่เรียก API**
2. **เพิ่ม print() เพื่อ track flow**
3. **ใช้ if (mounted) ก่อน setState()**
4. **เช็ค null ด้วย ?. และ ??**
5. **ดู logs ตั้งแต่เริ่มรัน app**

---

## 📱 Save Logs to File

```cmd
# Save all logs
adb logcat > logs.txt

# Save Flutter logs only
adb logcat | findstr "flutter" > flutter-logs.txt

# Save errors only
adb logcat *:E > errors.txt
```

---

## 🔗 Useful Commands

```cmd
# ดู connected devices
adb devices

# Restart adb
adb kill-server
adb start-server

# Clear app data
adb shell pm clear com.example.books_mobile_app

# Uninstall app
adb uninstall com.example.books_mobile_app

# Take screenshot
adb shell screencap /sdcard/screen.png
adb pull /sdcard/screen.png
```

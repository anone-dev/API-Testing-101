# 🎨 App Icon Guide

## วิธีสร้าง App Icon

### วิธีที่ 1: ใช้ Online Tool (แนะนำ)

**1. ไปที่ Icon Kitchen:**
- URL: https://icon.kitchen/

**2. สร้าง Icon:**
- เลือก "Emoji" → พิมพ์ 📚
- หรือ Upload รูปภาพของคุณ (1024x1024 px)
- เลือกสี Background: `#667eea` (สีม่วงน้ำเงิน)

**3. Download:**
- คลิก "Download"
- เลือก "Android" และ "iOS"

**4. ติดตั้ง:**
```cmd
# Extract ไฟล์ zip
# Copy ไฟล์ไปที่:
android\app\src\main\res\
```

**5. Build APK ใหม่:**
```cmd
build-apk.bat
```

---

### วิธีที่ 2: ใช้ flutter_launcher_icons

**1. เตรียม Icon Image:**
- สร้างรูป PNG ขนาด 1024x1024 px
- ตั้งชื่อ `icon.png`
- วางไว้ในโฟลเดอร์ `assets/`

**2. สร้างโฟลเดอร์ assets:**
```cmd
mkdir assets
```

**3. รัน flutter_launcher_icons:**
```cmd
flutter pub get
flutter pub run flutter_launcher_icons
```

**4. Build APK:**
```cmd
build-apk.bat
```

---

## ตำแหน่งไฟล์ Icon

### Android
```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png
├── mipmap-mdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
├── mipmap-xxhdpi/ic_launcher.png
└── mipmap-xxxhdpi/ic_launcher.png
```

### iOS
```
ios/Runner/Assets.xcassets/AppIcon.appiconset/
```

---

## ชื่อแอป

ชื่อแอปถูกตั้งค่าใน:

**Android:**
```xml
android/app/src/main/AndroidManifest.xml
<application android:label="Books App" ...>
```

**iOS:**
```xml
ios/Runner/Info.plist
<key>CFBundleName</key>
<string>Books App</string>
```

---

## เครื่องมือสร้าง Icon

1. **Icon Kitchen** - https://icon.kitchen/ (แนะนำ)
2. **App Icon Generator** - https://appicon.co/
3. **Figma** - สร้างเองแล้ว export
4. **Canva** - ใช้ template

---

## ขนาด Icon ที่แนะนำ

- **Android:** 1024x1024 px (PNG)
- **iOS:** 1024x1024 px (PNG)
- **Adaptive Icon:** 432x432 px (foreground)

---

## Tips

1. ใช้สีที่เข้ากับ theme ของแอป (#667eea)
2. Icon ควรเรียบง่าย อ่านง่าย
3. ทดสอบบนหลายขนาดหน้าจอ
4. ใช้ emoji 📚 ถ้าต้องการความเรียบง่าย

---

**Current App Name:** Books App  
**Current Icon:** Default Flutter Icon (ต้องเปลี่ยน)

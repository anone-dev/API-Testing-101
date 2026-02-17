# 📦 Build Instructions - Books API Standalone

สร้างไฟล์ executable เดียวที่รันได้เลยโดยไม่ต้องติดตั้งอะไรเพิ่ม

---

## 🪟 Windows

### Build
```cmd
cd books-local
build-windows-standalone.bat
```

### Output
- ไฟล์: `dist\BooksAPI-Windows.exe` (ประมาณ 15-20 MB)
- รันได้เลย: Double-click `BooksAPI-Windows.exe`
- Browser จะเปิดอัตโนมัติที่ http://localhost:5000/ui.html

---

## 🍎 macOS

### Build
```bash
cd books-local
chmod +x build-macos-standalone.sh
./build-macos-standalone.sh
```

### Output
- ไฟล์: `dist/BooksAPI-macOS` (ประมาณ 15-20 MB)
- รัน: `./dist/BooksAPI-macOS`
- Browser จะเปิดอัตโนมัติที่ http://localhost:5000/ui.html

### macOS Security Note
ถ้าเจอ "unidentified developer" warning:
```bash
xattr -cr dist/BooksAPI-macOS
```

---

## ✨ Features

- ✅ **Single File** - ไฟล์เดียว ไม่ต้องติดตั้ง Python
- ✅ **All-in-One** - รวม API Server + Web UI + Swagger Docs
- ✅ **Auto Browser** - เปิด browser อัตโนมัติ
- ✅ **Portable** - Copy ไปใช้เครื่องอื่นได้เลย
- ✅ **No Dependencies** - ไม่ต้อง download อะไรเพิ่ม

---

## 📋 Requirements (สำหรับ Build เท่านั้น)

- Python 3.8+
- pip

---

## 🎯 การใช้งาน

### Windows
1. Double-click `BooksAPI-Windows.exe`
2. Browser จะเปิดอัตโนมัติ
3. เริ่มใช้งานได้เลย!

### macOS
1. เปิด Terminal
2. `cd` ไปที่ folder ที่มีไฟล์
3. `./BooksAPI-macOS`
4. Browser จะเปิดอัตโนมัติ

### ปิดโปรแกรม
- Windows: กด Ctrl+C ใน command window หรือปิด window
- macOS: กด Ctrl+C ใน Terminal

---

## 📦 File Size

- Windows: ~15-20 MB
- macOS: ~15-20 MB

---

## 🔧 Troubleshooting

### Windows: "Windows protected your PC"
1. คลิก "More info"
2. คลิก "Run anyway"

### macOS: "Cannot be opened because it is from an unidentified developer"
```bash
xattr -cr BooksAPI-macOS
```

### Port 5000 ถูกใช้งานอยู่
- ปิดโปรแกรมที่ใช้ port 5000
- หรือแก้ไข `app_standalone.py` เปลี่ยน port

---

## 📝 Notes

- ไฟล์ที่ build ออกมาจะใหญ่กว่าปกติเพราะรวม Python runtime
- ครั้งแรกที่รันอาจช้านิดหน่อย (extract files)
- Data จะหายเมื่อปิดโปรแกรม (in-memory storage)
- เหมาะสำหรับ demo และ testing เท่านั้น

# 🚀 GitHub Actions - Auto Build

Build executable ทั้ง Windows และ macOS อัตโนมัติผ่าน GitHub Actions

---

## 📋 Setup (ครั้งเดียว)

1. **Push code ขึ้น GitHub**
   ```bash
   git add .
   git commit -m "Add GitHub Actions build workflow"
   git push
   ```

2. **เปิดใช้งาน Actions**
   - ไปที่ repository บน GitHub
   - คลิกแท็บ "Actions"
   - คลิก "I understand my workflows, go ahead and enable them"

---

## 🎯 วิธีใช้งาน

### Auto Build (เมื่อ push code)
```bash
git push
```
→ GitHub จะ build อัตโนมัติ

### Manual Build
1. ไปที่ GitHub → Actions
2. เลือก "Build Books API Executables"
3. คลิก "Run workflow" → "Run workflow"

---

## 📦 Download ไฟล์

1. ไปที่ GitHub → Actions
2. คลิก workflow run ล่าสุด (เช็ค ✅ สีเขียว)
3. Scroll ลงมาที่ "Artifacts"
4. Download:
   - `BooksAPI-Windows` (Windows .exe)
   - `BooksAPI-macOS` (macOS executable)

---

## ⏱️ Build Time

- Windows: ~3-5 นาที
- macOS: ~3-5 นาที
- รวม: ~5-8 นาที (รันพร้อมกัน)

---

## ✨ Features

- ✅ Build ทั้ง 2 OS พร้อมกัน
- ✅ Auto-build เมื่อ push
- ✅ Manual trigger ได้
- ✅ เก็บไฟล์ 30 วัน
- ✅ ฟรี (public repo)

---

## 🔧 Troubleshooting

### Actions ไม่ทำงาน
- ตรวจสอบว่าเปิดใช้งาน Actions แล้ว
- ตรวจสอบว่า push ไปที่ branch `main` หรือ `master`

### Build ล้มเหลว
- คลิกดู logs ใน Actions
- ตรวจสอบว่าไฟล์ครบ: `ui.html`, `api-docs.html`, `swagger-local.yaml`

---

## 📝 Files

- `.github/workflows/build-executables.yml` - Workflow configuration
- `books-local/app_standalone.py` - Standalone app
- `books-local/build-requirements.txt` - Dependencies

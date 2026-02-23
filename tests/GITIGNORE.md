# .gitignore Configuration Summary

## 📋 Overview

ไฟล์ .gitignore ถูกตั้งค่าให้ **ignore เฉพาะ local environment files** เพื่อป้องกันข้อมูล development ส่วนตัวไม่ให้ถูก commit ขึ้น repository

## 🔌 API Testing (.gitignore)

### ✅ Ignored Files (ไม่ถูก track)
- `.env.local` - Local development environment

### 📝 Tracked Files (ถูก track และ commit ได้)
- `.env` - SIT environment (default)
- `.env.uat` - UAT environment
- `fixtures/test-data.ts` - SIT test data
- `fixtures/test-data.uat.ts` - UAT test data
- `db-scripts/setup.sit.sql` - SIT database setup
- `db-scripts/setup.uat.sql` - UAT database setup

### ❌ Also Ignored
- `node_modules/`
- `/test-results/`
- `/playwright-report/`
- `/blob-report/`
- `/playwright/.cache/`
- `/playwright/.auth/`

---

## 🌐 Web Testing (.gitignore)

### ✅ Ignored Files (ไม่ถูก track)
- `.env.local` - Local development environment

### 📝 Tracked Files (ถูก track และ commit ได้)
- `.env` - SIT environment (default)
- `.env.uat` - UAT environment
- `fixtures/testdata.sit.json` - SIT test data
- `fixtures/testdata.uat.json` - UAT test data
- `db-scripts/setup.sit.sql` - SIT database setup
- `db-scripts/setup.uat.sql` - UAT database setup

### ❌ Also Ignored
- `node_modules/`
- `/test-results/`
- `/playwright-report/`
- `/blob-report/`
- `/playwright/.cache/`
- `/playwright/.auth/`

---

## 📱 Mobile Testing (.gitignore)

### ✅ Ignored Files (ไม่ถูก track)
- `.env.android.local` - Android local environment
- `.env.ios.local` - iOS local environment

### 📝 Tracked Files (ถูก track และ commit ได้)
- `.env` - Global configuration
- `.env.android.sit` - Android SIT environment (default)
- `.env.android.uat` - Android UAT environment
- `.env.ios.sit` - iOS SIT environment (default)
- `.env.ios.uat` - iOS UAT environment
- `fixtures/android/sit.yaml` - Android SIT test data
- `fixtures/android/uat.yaml` - Android UAT test data
- `fixtures/ios/sit.yaml` - iOS SIT test data
- `fixtures/ios/uat.yaml` - iOS UAT test data
- `config/android.sit.robot` - Android SIT config
- `config/android.uat.robot` - Android UAT config
- `config/ios.sit.robot` - iOS SIT config
- `config/ios.uat.robot` - iOS UAT config
- `db-scripts/setup.sit.sql` - SIT database setup
- `db-scripts/setup.uat.sql` - UAT database setup

### ❌ Also Ignored
- `log.html`, `report.html`, `output.xml`
- `results/`, `screenshots/`
- `*.pyc`, `__pycache__/`
- `venv/`, `env/`
- `.vscode/`, `.idea/`
- `.DS_Store`, `Thumbs.db`

---

## 🎯 Why This Configuration?

### ✅ **Ignore Local Files**
- **เหตุผล**: ไฟล์ local มักมีข้อมูลส่วนตัว เช่น localhost URLs, local database credentials
- **ประโยชน์**: แต่ละ developer สามารถมี local config ของตัวเองโดยไม่กระทบคนอื่น

### 📝 **Track SIT & UAT Files**
- **เหตุผล**: SIT และ UAT เป็น shared environments ที่ทีมใช้ร่วมกัน
- **ประโยชน์**: 
  - ทุกคนใช้ config เดียวกันสำหรับ SIT/UAT
  - ง่ายต่อการ sync และ maintain
  - CI/CD pipeline สามารถใช้ไฟล์เหล่านี้ได้ทันที

---

## 🔒 Security Best Practices

### ⚠️ **สิ่งที่ควรระวัง:**

1. **ไม่ควรใส่ sensitive data ใน .env files ที่ถูก track**
   - ❌ ห้าม: Real passwords, API keys, tokens
   - ✅ ควรใช้: Placeholder values, dummy credentials

2. **ใช้ Secret Management สำหรับ production**
   - Azure Key Vault
   - AWS Secrets Manager
   - HashiCorp Vault

3. **ตัวอย่าง .env ที่ปลอดภัย:**
   ```bash
   # ✅ Good - Placeholder values
   API_BASE_URL=https://sit-api.example.com
   USERNAME=sit_user
   PASSWORD=<use-secret-manager>
   
   # ❌ Bad - Real credentials
   API_BASE_URL=https://sit-api.example.com
   USERNAME=admin@company.com
   PASSWORD=MyRealPassword123!
   ```

---

## 📋 Quick Reference

### Check Ignored Files
```bash
# ดูว่าไฟล์ไหนถูก ignore
git status --ignored

# ตรวจสอบว่าไฟล์ถูก ignore หรือไม่
git check-ignore -v .env.local
```

### Force Add Ignored File (ถ้าจำเป็น)
```bash
# บังคับ add ไฟล์ที่ถูก ignore
git add -f .env.local
```

### Update .gitignore
```bash
# หลังจากแก้ไข .gitignore ให้ clear cache
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```

---

## 🚀 Summary

| Environment | API Testing | Web Testing | Mobile Testing |
|-------------|-------------|-------------|----------------|
| **LOCAL** | ❌ Ignored | ❌ Ignored | ❌ Ignored |
| **SIT** | ✅ Tracked | ✅ Tracked | ✅ Tracked |
| **UAT** | ✅ Tracked | ✅ Tracked | ✅ Tracked |

**ผลลัพธ์:**
- ✅ Local files ปลอดภัย ไม่ถูก commit
- ✅ SIT/UAT files ถูก share ในทีม
- ✅ CI/CD pipeline ใช้งานได้ทันที
- ✅ แต่ละ developer มี local config ของตัวเอง

# Multi-Environment Configuration Guide

## 📋 Available Environments

โปรเจคนี้รองรับ 3 environments:
- **LOCAL** - สำหรับการพัฒนาและทดสอบบนเครื่อง local
- **SIT** (default) - System Integration Testing
- **UAT** - User Acceptance Testing

## 🔌 API Testing

### Environment Files
- `.env.sit` - SIT (default)
- `.env.local` - Local development
- `.env.uat` - UAT

### Test Data Files
- `fixtures/test-data.sit.ts` - SIT
- `fixtures/test-data.local.ts` - Local
- `fixtures/test-data.uat.ts` - UAT

### Database Scripts
- `db-scripts/setup.sit.sql`
- `db-scripts/setup.local.sql`
- `db-scripts/setup.uat.sql`

### Commands
```bash
# SIT (default)
npm test
npm run test:smoke
npm run test:regression

# Local
npm run test:local
npm run test:smoke:local
npm run test:regression:local

# UAT
npm run test:uat
npm run test:smoke:uat
npm run test:regression:uat
```

## 🌐 Web Testing

### Environment Files
- `.env.sit` - SIT (default)
- `.env.local` - Local development
- `.env.uat` - UAT

### Test Data Files
- `fixtures/testdata.sit.json` - SIT
- `fixtures/testdata.local.json` - Local
- `fixtures/testdata.uat.json` - UAT

### Database Scripts
- `db-scripts/setup.sit.sql`
- `db-scripts/setup.local.sql`
- `db-scripts/setup.uat.sql`

### Commands
```bash
# SIT (default)
npm test
npm run test:smoke
npm run test:regression

# Local
npm run test:local
npm run test:smoke:local
npm run test:regression:local

# UAT
npm run test:uat
npm run test:smoke:uat
npm run test:regression:uat
```

## 📱 Mobile Testing

### Environment Files

**Android:**
- `.env.android.sit` - SIT (default)
- `.env.android.local` - Local development
- `.env.android.uat` - UAT

**iOS:**
- `.env.ios.sit` - SIT (default)
- `.env.ios.local` - Local development
- `.env.ios.uat` - UAT

### Test Data Files

**Android:**
- `fixtures/android/sit.yaml`
- `fixtures/android/local.yaml`
- `fixtures/android/uat.yaml`

**iOS:**
- `fixtures/ios/sit.yaml`
- `fixtures/ios/local.yaml`
- `fixtures/ios/uat.yaml`

### Config Files

**Android:**
- `config/android.sit.robot`
- `config/android.local.robot`
- `config/android.uat.robot`

**iOS:**
- `config/ios.sit.robot`
- `config/ios.local.robot`
- `config/ios.uat.robot`

### Database Scripts
- `db-scripts/setup.sit.sql`
- `db-scripts/setup.local.sql`
- `db-scripts/setup.uat.sql`

### App Binaries
- `apps/android/local/` - Local Android apps
- `apps/android/sit/` - SIT Android apps
- `apps/android/uat/` - UAT Android apps
- `apps/ios/local/` - Local iOS apps
- `apps/ios/sit/` - SIT iOS apps
- `apps/ios/uat/` - UAT iOS apps

### Commands

```bash
# SIT (default)
robot tests-mobile/android/
robot tests-mobile/ios/
robot --include smoke tests-mobile/

# Local
robot --variable ENV:local tests-mobile/android/
robot --variable ENV:local tests-mobile/ios/
robot --variable ENV:local --include smoke tests-mobile/

# UAT
robot --variable ENV:uat tests-mobile/android/
robot --variable ENV:uat tests-mobile/ios/
robot --variable ENV:uat --include smoke tests-mobile/
```

## 🎯 Quick Reference

### Default Environment (SIT)
```bash
# API Testing
cd tests/api-testing && npm test

# Web Testing
cd tests/web-testing && npm test

# Mobile Testing
cd tests/mobile-testing && robot tests-mobile/android/
```

### Local Environment
```bash
# API Testing
cd tests/api-testing && npm run test:local

# Web Testing
cd tests/web-testing && npm run test:local

# Mobile Testing
cd tests/mobile-testing && robot --variable ENV:local tests-mobile/android/
```

### UAT Environment
```bash
# API Testing
cd tests/api-testing && npm run test:uat

# Web Testing
cd tests/web-testing && npm run test:uat

# Mobile Testing
cd tests/mobile-testing && robot --variable ENV:uat tests-mobile/android/
```

## 📝 Environment Configuration

### API & Web Testing
Environment ถูกกำหนดผ่าน `ENV` variable ใน `.env` files:
- `ENV=SIT` (default)
- `ENV=LOCAL`
- `ENV=UAT`

### Mobile Testing
Environment ถูกกำหนดผ่าน `--variable ENV:xxx`:
- Default: `sit`
- Local: `--variable ENV:local`
- UAT: `--variable ENV:uat`

## 🔧 Setup New Environment

หากต้องการเพิ่ม environment ใหม่ (เช่น PROD):

1. สร้าง environment file (`.env.prod`)
2. สร้าง test data file (`test-data.prod.ts` / `testdata.prod.json` / `prod.yaml`)
3. สร้าง database script (`setup.prod.sql`)
4. เพิ่ม npm script ใน `package.json`
5. สร้าง config file สำหรับ mobile (`android.prod.robot`, `ios.prod.robot`)
6. เพิ่ม app path ใน `apps/versions.json`

## 🚀 Best Practices

1. **ใช้ SIT เป็น default** - ไม่ต้องระบุ environment
2. **Local สำหรับ development** - ทดสอบบนเครื่องก่อน push code
3. **UAT สำหรับ acceptance testing** - ทดสอบก่อน deploy production
4. **แยก test data ตาม environment** - ป้องกันข้อมูลปนกัน
5. **ใช้ database scripts** - setup/cleanup ข้อมูลทดสอบ

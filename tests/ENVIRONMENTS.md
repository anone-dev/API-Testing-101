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
- `fixtures/testdata.sit.ts` - SIT
- `fixtures/testdata.local.ts` - Local
- `fixtures/testdata.uat.ts` - UAT

### Database Scripts
- `db-scripts/setup.sit.sql`
- `db-scripts/setup.local.sql`
- `db-scripts/setup.uat.sql`

### Commands
```bash
# Run all tests (SIT default)
npm run api:sit:all:cliMode
npm run api:sit:all:guiMode

# Run by feature
npm run api:sit:SRS01-healthCheck:cliMode
npm run api:sit:SRS01-authentication:cliMode
npm run api:sit:SRS01-books:cliMode
npm run api:sit:SRS01-orders:cliMode
npm run api:sit:SRS01-stockAndBug:cliMode
npm run api:sit:SRS03:cliMode
npm run api:sit:SRS04-successFlows:cliMode
npm run api:sit:SRS04-failureFlows:cliMode

# Local
npm run api:local:all:cliMode

# UAT
npm run api:uat:all:cliMode

# View report
npm run report
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
# Run all tests
npm run ui:sit:all:cliMode
npm run ui:sit:all:guiMode

# Run FR06 Web UI suite
npm run ui:local:FR06:cliMode
npm run ui:local:FR06:guiMode
npm run ui:sit:FR06:cliMode
npm run ui:uat:FR06:cliMode   # ยังไม่มี script นี้ใน package.json

# View report
npm run report
```

## 📱 Mobile Testing

### Test Data Files (Fixtures with Appium capabilities)
- `fixtures/testdata.sit.android.yaml` - SIT Android
- `fixtures/testdata.sit.ios.yaml` - SIT iOS
- `fixtures/testdata.local.android.yaml` - Local Android
- `fixtures/testdata.local.ios.yaml` - Local iOS

### App Binaries
- `apps/app-release.apk` - Android app
- `apps/ios-debug.app/` - iOS app

### Database Scripts
- `db-scripts/setup.sit.sql`
- `db-scripts/setup.local.sql`
- `db-scripts/cleanup.sql`

### Commands

```bash
# Android - SIT (default)
robot --variable ENV:sit --variable PLATFORM:android --outputdir results/android-sit tests-mobile/

# Android - Local
robot --variable ENV:local --variable PLATFORM:android --outputdir results/android-local tests-mobile/

# iOS - SIT
robot --variable ENV:sit --variable PLATFORM:ios --outputdir results/ios-sit tests-mobile/

# iOS - Local
robot --variable ENV:local --variable PLATFORM:ios --outputdir results/ios-local tests-mobile/

# Run specific feature
robot --variable ENV:sit --variable PLATFORM:android tests-mobile/auth/
robot --variable ENV:sit --variable PLATFORM:android tests-mobile/books/
robot --variable ENV:sit --variable PLATFORM:android tests-mobile/orders/

# Run tagged tests
robot --variable ENV:sit --variable PLATFORM:android tests-mobile/tagged_tests/smoke.robot
robot --variable ENV:sit --variable PLATFORM:android tests-mobile/tagged_tests/regression.robot
```

## 🎯 Quick Reference

### Default Environment (SIT)
```bash
# API Testing
cd tests/api-testing && npm run api:sit:all:cliMode

# Web Testing
cd tests/web-testing && npm run ui:sit:all:cliMode

# Mobile Testing
cd tests/mobile-testing && robot --variable ENV:sit --variable PLATFORM:android tests-mobile/
```

### Local Environment
```bash
# API Testing
cd tests/api-testing && npm run api:local:all:cliMode

# Web Testing
cd tests/web-testing && npm run ui:local:all:cliMode

# Mobile Testing
cd tests/mobile-testing && robot --variable ENV:local --variable PLATFORM:android tests-mobile/
```

### UAT Environment
```bash
# API Testing
cd tests/api-testing && npm run api:uat:all:cliMode

# Mobile Testing
cd tests/mobile-testing && robot --variable ENV:uat --variable PLATFORM:android tests-mobile/
```

## 📝 Environment Configuration

### API & Web Testing
Environment ถูกกำหนดผ่าน `ENV` variable ใน `.env.*` files:
- `ENV=sit` (default)
- `ENV=local`
- `ENV=uat`

### Mobile Testing
Environment และ Platform ถูกกำหนดผ่าน `--variable`:
- Default: `--variable ENV:sit --variable PLATFORM:android`
- Local: `--variable ENV:local --variable PLATFORM:android`
- iOS: `--variable PLATFORM:ios`

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

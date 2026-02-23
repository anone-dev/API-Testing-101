# COE Standard QA Automation

โปรเจคทดสอบอัตโนมัติแบบครบวงจรที่รวม API Testing, Web UI Testing และ Mobile Testing พร้อมด้วย CI/CD integration, multi-environment support และ comprehensive reporting

## 🚀 Features

- **API Testing**: Playwright + TypeScript with schema validation
- **Web UI Testing**: Playwright + Page Object Model + Accessibility testing
- **Mobile Testing**: Robot Framework + Appium for Android/iOS
- **Multi-Environment**: LOCAL, SIT, UAT configurations
- **CI/CD Ready**: Azure DevOps pipelines included
- **Comprehensive Reporting**: HTML, JSON, JUnit reports
- **Database Integration**: SQL scripts for test data setup
- **Parallel Execution**: Run tests concurrently for faster feedback

## 📁 โครงสร้างโปรเจคต์

```
coe-standard-qa-automation/
└── tests/
    ├── api-testing/              # 🔌 API Testing with Playwright + TypeScript
    │   ├── tests-api/            # Test files organized by features
    │   │   ├── feature-1/        # Feature 1: User & Post APIs
    │   │   ├── feature-2/        # Feature 2: Schema validation
    │   │   ├── feature-3/        # Feature 3: Comments & Env-specific
    │   │   └── tagged-tests.spec.ts  # Smoke & Regression tests
    │   ├── helpers/              # API helpers and utilities
    │   │   ├── api.helper.ts     # API request wrapper
    │   │   ├── schema.validator.ts  # JSON schema validator
    │   │   ├── env.helper.ts     # Environment config loader
    │   │   └── databaseHelper.ts # Database operations
    │   ├── schemas/              # JSON schema definitions
    │   │   └── api.schema.ts     # API response schemas
    │   ├── fixtures/             # Test data per environment
    │   │   ├── test-data.ts      # SIT test data (default)
    │   │   ├── test-data.local.ts # Local test data
    │   │   └── test-data.uat.ts  # UAT test data
    │   ├── postman/              # Postman collection integration
    │   │   ├── collection.json   # Postman collection
    │   │   ├── environment.sit.json  # SIT environment
    │   │   └── environment.uat.json  # UAT environment
    │   ├── db-scripts/           # Database setup scripts
    │   │   ├── setup.local.sql   # Local data setup
    │   │   ├── setup.sit.sql     # SIT data setup
    │   │   ├── setup.uat.sql     # UAT data setup
    │   │   └── cleanup.sql       # Cleanup script
    │   ├── pipelines/            # CI/CD pipeline configs
    │   │   └── api-pipeline.yaml # Azure DevOps pipeline
    │   ├── .env                  # SIT environment (default)
    │   ├── .env.local            # Local environment
    │   ├── .env.uat              # UAT environment
    │   ├── playwright.config.ts  # Playwright configuration
    │   └── package.json          # Dependencies & scripts
    │
    ├── web-testing/              # 🌐 Web UI Testing with Playwright + TypeScript
    │   ├── tests-web/             # Web test files by features
    │   │   ├── feature-1/        # Feature 1: Login tests
    │   │   ├── feature-2/        # Feature 2: User management
    │   │   ├── feature-3/        # Feature 3: Dashboard
    │   │   └── tagged-tests.spec.ts  # Smoke & Regression tests
    │   ├── pages/                # Page Object Model
    │   │   ├── BasePage.ts       # Base page with common methods
    │   │   ├── LoginPage.ts      # Login page object
    │   │   └── DashboardPage.ts  # Dashboard page object
    │   ├── fixtures/             # Test data per environment
    │   │   ├── testdata.sit.json # SIT test data (default)
    │   │   ├── testdata.local.json # Local test data
    │   │   └── testdata.uat.json # UAT test data
    │   ├── helpers/              # Test utilities
    │   │   ├── testDataLoader.ts # Load test data
    │   │   └── databaseHelper.ts # Database operations
    │   ├── db-scripts/           # Database setup scripts
    │   │   ├── setup.local.sql   # Local data setup
    │   │   ├── setup.sit.sql     # SIT data setup
    │   │   ├── setup.uat.sql     # UAT data setup
    │   │   └── cleanup.sql       # Cleanup script
    │   ├── pipelines/            # CI/CD pipeline configs
    │   │   └── web-pipeline.yaml # Azure DevOps pipeline
    │   ├── .env                  # SIT environment (default)
    │   ├── .env.local            # Local environment
    │   ├── .env.uat              # UAT environment
    │   ├── playwright.config.ts  # Playwright configuration
    │   └── package.json          # Dependencies & scripts
    │
    ├── mobile-testing/           # 📱 Mobile Testing with Robot Framework + Appium
    │   ├── tests-mobile/         # Test cases by platform
    │   │   ├── android/          # Android test cases
    │   │   │   ├── auth/         # Authentication tests
    │   │   │   ├── payment/      # Payment tests
    │   │   │   └── profile/      # Profile tests
    │   │   ├── ios/              # iOS test cases
    │   │   │   ├── auth/         # Authentication tests
    │   │   │   ├── payment/      # Payment tests
    │   │   │   └── profile/      # Profile tests
    │   │   └── tagged-tests/     # Smoke & Regression tests
    │   │       ├── smoke.android.robot
    │   │       ├── smoke.ios.robot
    │   │       ├── regression.android.robot
    │   │       └── regression.ios.robot
    │   ├── pages/                # Page Object Model
    │   │   ├── android/          # Android page objects
    │   │   │   ├── common/       # Common keywords
    │   │   │   ├── auth/         # LoginPage, RegisterPage
    │   │   │   ├── payment/      # Payment page objects
    │   │   │   └── profile/      # Profile page objects
    │   │   └── ios/              # iOS page objects (same structure)
    │   ├── fixtures/             # Test data per environment
    │   │   ├── android/          # Android test data
    │   │   │   ├── local.yaml    # Local test data
    │   │   │   ├── sit.yaml      # SIT test data
    │   │   │   └── uat.yaml      # UAT test data
    │   │   └── ios/              # iOS test data (same structure)
    │   ├── helpers/              # Python utility functions
    │   │   ├── app_manager.py    # App version management
    │   │   ├── testdata_loader.py  # Load YAML test data
    │   │   └── database_helper.py  # Database operations
    │   ├── apps/                 # App binaries (.apk, .app, .ipa)
    │   │   ├── android/          # Android apps
    │   │   │   ├── local/        # Local environment apps
    │   │   │   ├── sit/          # SIT environment apps
    │   │   │   └── uat/          # UAT environment apps
    │   │   ├── ios/              # iOS apps
    │   │   │   ├── local/        # Local environment apps
    │   │   │   ├── sit/          # SIT environment apps
    │   │   │   └── uat/          # UAT environment apps
    │   │   └── versions.json     # App version tracking
    │   ├── db-scripts/           # Database setup scripts
    │   │   ├── setup.local.sql   # Local data setup
    │   │   ├── setup.sit.sql     # SIT data setup
    │   │   ├── setup.uat.sql     # UAT data setup
    │   │   └── cleanup.sql       # Cleanup script
    │   ├── pipelines/            # CI/CD pipeline configs
    │   │   ├── mobile-android-pipeline.yaml
    │   │   ├── mobile-ios-pipeline.yaml
    │   │   └── mobile-pipeline.yaml
    │   ├── .env.android.local    # Android Local config
    │   ├── .env.android.sit      # Android SIT config (default)
    │   ├── .env.android.uat      # Android UAT config
    │   ├── .env.ios.local        # iOS Local config
    │   ├── .env.ios.sit          # iOS SIT config (default)
    │   ├── .env.ios.uat          # iOS UAT config
    │   └── requirements.txt      # Python dependencies
    │
    ├── instructions/             # 📚 Guidelines and Templates
    │   ├── aldlc/                # ALDLC-specific templates
    │   │   ├── test-cases-template.md    # Test case template
    │   │   └── test-script-template.md   # Test script template
    │   ├── api-testing-playwright-guideline.md  # API testing with Playwright
    │   ├── api-testing-postman-guideline.md     # API testing with Postman
    │   ├── web-testing-playwright-guideline.md  # Web testing with Playwright
    │   ├── mobile-testing-robot-guideline.md    # Mobile testing with Robot Framework
    │   ├── test-scenario-guildeline.md          # Test scenario guide
    │   └── versioncontrol-guideline.md          # Git workflow guide
    │
    └── test-scenario/            # 📄 Test scenarios and documentation
        ├── PBI-7420-test-scenario.md   # Test scenario documentation
        └── PBI-7420-test-scenario.csv  # Test scenario in CSV format
```

## 🚀 การเริ่มต้นใช้งาน

### 1. 🔌 API Testing
```bash
cd tests/api-testing
npm install
npm test                    # รันเทสทั้งหมด (SIT)
npm run test:local         # รันเทสบน Local
npm run test:uat           # รันเทสบน UAT
npm run test:smoke         # รัน Smoke tests
npm run test:regression    # รัน Regression tests
```
📦 **Features**: Schema validation, Postman integration, Multi-environment support

📈 [API Testing Documentation](tests/api-testing/README.md)

### 2. 🌐 Web UI Testing
```bash
cd tests/web-testing
npm install
npm test                    # รันเทสทั้งหมด (SIT)
npm run test:local         # รันเทสบน Local
npm run test:uat           # รันเทสบน UAT
npm run test:ui            # รันแบบ interactive
npm run test:headed        # รันแบบเห็นบราวเซอร์
```
📦 **Features**: Page Object Model, Accessibility testing, Performance monitoring

📈 [Web UI Testing Documentation](tests/web-testing/README.md)

### 3. 📱 Mobile Testing
```bash
cd tests/mobile-testing
pip install -r requirements.txt
appium                      # เริ่ม Appium server
# ใน terminal ใหม่:
robot tests-mobile/android/        # รัน Android tests (SIT)
robot tests-mobile/ios/            # รัน iOS tests (SIT)
robot --variable ENV:local tests-mobile/android/   # รันบน Local
robot --variable ENV:uat tests-mobile/android/     # รันบน UAT
robot --include smoke tests-mobile/ # รัน Smoke tests
```
📦 **Features**: Android/iOS support, Parallel execution, Cloud platform integration

📈 [Mobile Testing Documentation](tests/mobile-testing/README.md)

### 4. 📄 Test Scenarios
เก็บเอกสาร test scenarios และ documentation ในโฟลเดอร์ `tests/test-scenario/`
- **Markdown format**: เอกสารแบบอ่านง่าย
- **CSV format**: นำเข้า Excel หรือ test management tools

## 🌍 Multi-Environment Support

โปรเจครองรับ 3 environments:
- **LOCAL** - Development environment (http://localhost:3000)
- **SIT** (default) - System Integration Testing
- **UAT** - User Acceptance Testing

### Quick Commands
```bash
# API Testing
npm test              # SIT (default)
npm run test:local    # Local
npm run test:uat      # UAT

# Web Testing
npm test              # SIT (default)
npm run test:local    # Local
npm run test:uat      # UAT

# Mobile Testing
robot tests-mobile/android/                        # SIT (default)
robot --variable ENV:local tests-mobile/android/   # Local
robot --variable ENV:uat tests-mobile/android/     # UAT
```

## 🛠️ เทคโนโลยีที่ใช้

| ประเภทการทดสอบ | เทคโนโลยีหลัก | ความสามารถพิเศษ |
|---|---|---|
| **API Testing** | Playwright + TypeScript | Schema validation, Multi-env, Postman integration |
| **Web UI Testing** | Playwright + TypeScript + POM | Accessibility, Performance, Cross-browser |
| **Mobile Testing** | Robot Framework + Appium + Python | Android/iOS, Parallel execution, Cloud platforms |
| **Test Management** | Tags-based execution | smoke, regression, critical, performance |
| **Environment Support** | LOCAL, SIT, UAT configurations | Environment-specific test data |
| **CI/CD Integration** | Azure DevOps Pipelines | Automated execution, reporting, notifications |
| **Database Integration** | SQL Scripts | Test data setup and cleanup |
| **Reporting** | HTML, JSON, JUnit | Screenshots, videos, traces, metrics |

## ⚡ Quick Start

### 📦 ติดตั้ง Dependencies ทั้งหมด

```bash
# API & Web UI Testing
cd tests/api-testing && npm install && cd ../..
cd tests/web-testing && npm install && cd ../..

# Mobile Testing
cd tests/mobile-testing && pip install -r requirements.txt && cd ../..

# Install Appium for Mobile Testing
npm install -g appium
appium driver install uiautomator2  # Android
appium driver install xcuitest      # iOS (macOS only)
```

### 🔥 รันเทสแบบ Smoke Test (ทดสอบรวดเร็ว)

```bash
# API Testing
cd tests/api-testing && npm run test:smoke

# Web UI Testing  
cd tests/web-testing && npm run test:smoke

# Mobile Testing
cd tests/mobile-testing && robot --include smoke tests-mobile/
```

### 🔄 รันเทสแบบ Regression (ทดสอบครบวงจร)

```bash
# API Testing
cd tests/api-testing && npm run test:regression

# Web UI Testing
cd tests/web-testing && npm run test:regression

# Mobile Testing
cd tests/mobile-testing && robot --include regression tests-mobile/
```

### 🔀 รันเทสแบบ Parallel (รันพร้อมกัน)

```bash
# API Testing
cd tests/api-testing && npm run test:parallel

# Web UI Testing
cd tests/web-testing && npm run test:parallel

# Mobile Testing
cd tests/mobile-testing && pabot --processes 2 tests-mobile/
```

## 📈 รายงานผลการทดสอบ

| ประเภทการทดสอบ | รายงานหลัก | ตำแหน่งไฟล์ |
|---|---|---|
| **API Testing** | HTML + JSON + JUnit | `tests/api-testing/playwright-report/index.html` |
| **Web UI Testing** | HTML + JSON + JUnit | `tests/web-testing/playwright-report/index.html` |
| **Mobile Testing** | HTML + Log + XML | `tests/mobile-testing/report.html` |

### 📊 ประเภทรายงานที่รองรับ

- **HTML Reports**: รายงานแบบ interactive พร้อม screenshots
- **JSON Reports**: สำหรับ CI/CD integration
- **JUnit Reports**: สำหรับ Azure DevOps, Jenkins
- **Screenshots**: ภาพหน้าจอเมื่อเทสล้มเหลว
- **Videos**: วิดีโอการทำงานของเทส (Web/API)
- **Traces**: ข้อมูลการ debug แบบละเอียด (Web/API)
- **Performance Metrics**: Core Web Vitals, Lighthouse scores
- **Accessibility Reports**: axe-core compliance results
- **API Schema Validation**: JSON schema validation results
- **Database Logs**: SQL execution logs and data setup results

### 📧 การแจ้งเตือนผลการทดสอบ

โปรเจคต์รองรับการแจ้งเตือนผ่าน:
- **Slack Integration**: แจ้งผลการทดสอบใน Slack channels
- **Teams Integration**: แจ้งผลการทดสอบใน Microsoft Teams
- **Email Reports**: ส่งรายงานทาง email อัตโนมัติ
- **Dashboard Integration**: แสดงผลบน monitoring dashboards

## 🔧 Best Practices

### 📋 Test Organization
- **Feature-based structure**: จัดกลุ่มเทสตาม business features
- **Tag-based execution**: ใช้ tags เพื่อรันเทสแบบเลือกสรร
- **Environment separation**: แยกการตั้งค่าสำหรับแต่ละ environment
- **Data-driven testing**: ใช้ test data files สำหรับข้อมูลทดสอบ

### 🚀 Performance Optimization
- **Parallel execution**: รันเทสพร้อมกันเพื่อลดเวลา
- **Smart test selection**: รันเฉพาะเทสที่เกี่ยวข้องกับการเปลี่ยนแปลง
- **Resource management**: จัดการ browser instances และ database connections
- **Caching strategies**: ใช้ cache สำหรับ dependencies และ test data

### 🔒 Security & Compliance
- **Credential management**: เก็บ credentials ใน environment variables
- **Data privacy**: ใช้ synthetic data แทนข้อมูลจริง
- **Access control**: จำกัดการเข้าถึง test environments
- **Audit trails**: บันทึกการทำงานของเทสเพื่อการตรวจสอบ

## 🤝 Contributing

### การเพิ่มเทสใหม่
1. สร้าง feature branch จาก `develop`
2. เพิ่มเทสในโฟลเดอร์ที่เหมาะสม
3. เพิ่ม tags ที่เหมาะสม (@smoke, @regression)
4. อัปเดต documentation
5. สร้าง Pull Request

### Code Standards
- **TypeScript**: ใช้ strict mode และ proper typing
- **Robot Framework**: ตาม Robot Framework style guide
- **Naming conventions**: ใช้ชื่อที่อธิบายได้ชัดเจน
- **Documentation**: เขียน comments และ documentation

## 📞 Support & Contact

- **Technical Issues**: สร้าง issue ใน repository
- **Feature Requests**: ใช้ feature request template
- **Documentation**: อ่าน README ในแต่ละโฟลเดอร์
- **Training**: ติดต่อ QA team สำหรับการฝึกอบรม

---

**🎯 Happy Testing!** 🚀

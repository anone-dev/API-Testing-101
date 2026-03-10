# Mobile Testing with Robot Framework + Appium

## Overview
Mobile testing framework using Robot Framework and Appium with Page Object Model, multi-environment support (LOCAL/SIT), and organized test structure.

## Key Features
- ✅ **Page Object Model** - Locators + Keywords in one place
- ✅ **Multi-Environment** - LOCAL, SIT via fixtures yaml
- ✅ **Multi-Platform** - Android & iOS support
- ✅ **Test Organization** - Feature-based structure with tags
- ✅ **Database Integration** - SQL scripts for test data
- ✅ **CI/CD Ready** - Azure DevOps pipelines
- ✅ **Parallel Execution** - Run tests concurrently

## Project Structure

```
tests/mobile-testing/
├── requirements.txt              # Python dependencies
│
├── pipelines/                    # CI/CD pipeline configurations
│   ├── mobile-pipeline.yaml
│   └── azure-pipelines-env-emulator-verification.yml
│
├── pages/                        # Page Object Model
│   ├── common/
│   │   └── BasePage.resource
│   ├── auth/
│   │   ├── locators.android.yaml     # Auth locators — Android
│   │   ├── locators.ios.yaml         # Auth locators — iOS
│   │   └── AuthPage.resource         # Keywords only
│   ├── books/
│   │   ├── locators.android.yaml     # Books locators — Android
│   │   ├── locators.ios.yaml         # Books locators — iOS
│   │   └── BooksPage.resource        # Keywords only
│   └── orders/
│       ├── locators.android.yaml     # Orders locators — Android
│       ├── locators.ios.yaml         # Orders locators — iOS
│       └── OrdersPage.resource       # Keywords only
│
├── fixtures/                     # Test data + Appium capabilities per env/platform
│   ├── testdata.local.android.yaml
│   ├── testdata.local.ios.yaml
│   ├── testdata.sit.android.yaml
│   └── testdata.sit.ios.yaml
│
├── db-scripts/
│   ├── setup.local.sql
│   ├── setup.sit.sql
│   ├── cleanup.sql
│   └── README.md
│
├── helpers/
│   ├── env_loader.py
│   ├── database_helper.py
│   ├── testdata_loader.py
│   └── app_manager.py
│
├── apps/
│   └── app-release.apk
│
└── tests-mobile/
    ├── auth/
    │   └── auth.robot
    ├── books/
    │   └── books.robot
    ├── orders/
    │   └── orders.robot
    └── tagged_tests/
        ├── smoke.robot
        └── regression.robot
```

## Prerequisites

### Required
- Python 3.8+
- Node.js 16+ (for Appium)
- Java JDK 8+

### Platform Specific
- **Android**: Android SDK
- **iOS**: Xcode (macOS only)

## Installation

```bash
cd tests/mobile-testing
pip install -r requirements.txt

npm install -g appium
appium driver install uiautomator2  # Android
appium driver install xcuitest      # iOS (macOS only)
```

## Environment Configuration

### Available Environments
| Environment | File | Platform |
|-------------|------|----------|
| Local Android | `fixtures/testdata.local.android.yaml` | Android |
| Local iOS | `fixtures/testdata.local.ios.yaml` | iOS |
| SIT Android | `fixtures/testdata.sit.android.yaml` | Android |
| SIT iOS | `fixtures/testdata.sit.ios.yaml` | iOS |

### Fixture File Structure
```yaml
# === Appium Capabilities ===
APPIUM_URL: http://localhost:4723
PLATFORM_NAME: Android
PLATFORM_VERSION: "16"
DEVICE_NAME: emulator-5554
APP_PATH: .../apps/app-release.apk
AUTOMATION_NAME: UiAutomator2

# === API ===
BASE_URL: http://localhost:5000

# === Test Data ===
USERS:
  valid:
    email: "testuser@local.com"
    name: "Test User"
```

## Running Tests

### Start Appium Server
```bash
appium
```

### Basic Test Execution

**Command format:** `robot --variable ENV:<env> --variable PLATFORM:<platform> [options] <suite>`

ทุก `.robot` มี default variables (`ENV=local`, `PLATFORM=android`) ไว้แล้ว สามารถ override ได้ผ่าน `--variable`:

```bash
# Android Local (default - no variables needed)
robot tests-mobile/

# Android SIT
robot --variable ENV:sit tests-mobile/

# iOS Local
robot --variable PLATFORM:ios tests-mobile/

# iOS SIT
robot --variable ENV:sit --variable PLATFORM:ios tests-mobile/
```

### Run Specific Suite
```bash
robot --variable ENV:local --variable PLATFORM:android tests-mobile/auth/auth.robot
robot --variable ENV:local --variable PLATFORM:android tests-mobile/books/books.robot
robot --variable ENV:local --variable PLATFORM:android tests-mobile/orders/orders.robot
robot --variable ENV:sit   --variable PLATFORM:android tests-mobile/
robot --variable ENV:sit   --variable PLATFORM:ios     tests-mobile/
```

### Run with Tags
```bash
robot --variable ENV:local --variable PLATFORM:android --include smoke           tests-mobile/
robot --variable ENV:local --variable PLATFORM:android --include regression      tests-mobile/
robot --variable ENV:sit   --variable PLATFORM:android --include Feature:Auth    tests-mobile/
robot --variable ENV:sit   --variable PLATFORM:android --include Important:Critical tests-mobile/
```

### Run with Output Directory

> ⚠️ ถ้าไม่กำหนด `--outputdir` ไฟล์ `output.xml`, `log.html`, `report.html` จะถูกสร้างใน current directory และ**ทับกันทุกครั้ง**ที่รัน แนะนำให้กำหนดเสมอ

```bash
# Android Local - auth suite only
robot --variable ENV:local --variable PLATFORM:android --outputdir results/android-local tests-mobile/auth/auth.robot

# Android Local - all suites
robot --variable ENV:local --variable PLATFORM:android --outputdir results/android-local tests-mobile/

# iOS SIT - all suites
robot --variable ENV:sit   --variable PLATFORM:ios     --outputdir results/ios-sit       tests-mobile/
```

### Parallel Execution
```bash
pip install robotframework-pabot

pabot --processes 2 --variable ENV:local --variable PLATFORM:android tests-mobile/
pabot --processes 2 --variable ENV:sit   --variable PLATFORM:ios     tests-mobile/
```

### Debug Mode
```bash
robot --variable ENV:local --variable PLATFORM:android --loglevel DEBUG tests-mobile/auth/auth.robot
appium --log-level debug
```

## Page Object Model

### Example: Test Case
```robot
*** Settings ***
Resource    ../../pages/auth/AuthPage.resource
Resource    ../../pages/common/BasePage.resource
Variables   ../../fixtures/testdata.${ENV}.${PLATFORM}.yaml

Suite Setup      Setup Mobile Test
Suite Teardown   Teardown Mobile Test

*** Variables ***
# กำหนดค่า Default ไว้ (เผื่อลืมใส่ตอนรัน)
${PLATFORM}    android
${ENV}         local
${HEADLESS}    false

*** Test Cases ***
User Should Register Successfully
    Register With Credentials    ${USERS.valid.email}    ${USERS.valid.name}
    Verify Home Screen Displayed
```

## Test Tags

| Tag | Usage |
|-----|-------|
| `Feature:Auth` | `--include Feature:Auth` |
| `Feature:Books` | `--include Feature:Books` |
| `Feature:Orders` | `--include Feature:Orders` |
| `Important:Critical` | `--include Important:Critical` |
| `Important:High` | `--include Important:High` |
| `Scenario:Success` | `--include Scenario:Success` |
| `Scenario:Alternative` | `--include Scenario:Alternative` |

## Device Management

### Android
```bash
adb devices
adb kill-server && adb start-server
```

### iOS
```bash
xcrun simctl list devices
xcrun simctl boot "iPhone 14"
xcrun simctl shutdown "iPhone 14"
```

## App Management

### Download from Azure DevOps
```bash
az pipelines runs artifact download --artifact-name android-sit --path apps/
```

### Download from AWS S3
```bash
aws s3 cp s3://builds/android/sit/app-latest.apk apps/app-release.apk
```

## Database Setup

```bash
mysql -u root -p testdb < db-scripts/setup.sit.sql
mysql -u root -p testdb < db-scripts/cleanup.sql
```

## Reports

### View Reports
```bash
# Windows
start results\android-local\report.html

# macOS/Linux
open results/android-local/report.html
```

### Report Files
- **HTML Report**: `results/report.html`
- **Log File**: `results/log.html`
- **Output XML**: `results/output.xml`

## Troubleshooting

### Verify Appium Installation
```bash
appium-doctor --android
appium-doctor --ios
```

### Check Devices
```bash
adb devices                    # Android
xcrun simctl list devices      # iOS
```

### Debug Mode
```bash
robot --variable ENV:local --variable PLATFORM:android --loglevel DEBUG tests-mobile/auth/auth.robot
appium --log-level debug
```

### Common Issues

| Issue | Solution |
|-------|----------|
| App not found | Check `APP_PATH` in fixture yaml |
| Device not connected | Verify device/emulator is running |
| Element not found | Check locator strategy and wait times |
| Appium not starting | Check port 4723 is available |
| Connection refused | Ensure Appium server is running |

## Additional Resources

- [Robot Framework Documentation](https://robotframework.org/)
- [Appium Documentation](https://appium.io/docs/)
- [AppiumLibrary Keywords](https://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html)
- [CI/CD Pipelines](pipelines/)
- [Database Scripts](db-scripts/README.md)

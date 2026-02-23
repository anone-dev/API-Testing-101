# Mobile Testing with Robot Framework + Appium

## Overview
Mobile testing framework using Robot Framework and Appium with Page Object Model, multi-environment support (LOCAL/SIT/UAT), and organized test structure.

## Key Features
- ✅ **Page Object Model** - Locators + Keywords in one place
- ✅ **Multi-Environment** - LOCAL, SIT, UAT via .env files
- ✅ **Multi-Platform** - Android & iOS support
- ✅ **Test Organization** - Feature-based structure with tags
- ✅ **Database Integration** - SQL scripts for test data
- ✅ **CI/CD Ready** - Azure DevOps pipelines
- ✅ **Parallel Execution** - Run tests concurrently

## Project Structure

```
mobile-testing/
├── .env.android.local            # Android Local config
├── .env.android.sit              # Android SIT config (default)
├── .env.android.uat              # Android UAT config
├── .env.ios.local                # iOS Local config
├── .env.ios.sit                  # iOS SIT config (default)
├── .env.ios.uat                  # iOS UAT config
├── requirements.txt              # Python dependencies
│
├── tests-mobile/                 # Test cases (feature-based)
│   ├── android/
│   │   ├── auth/                 # Authentication tests
│   │   ├── payment/              # Payment tests
│   │   └── profile/              # Profile tests
│   ├── ios/
│   │   ├── auth/
│   │   ├── payment/
│   │   └── profile/
│   └── tagged-tests/             # Smoke & regression tests
│       ├── smoke.android.robot
│       ├── smoke.ios.robot
│       ├── regression.android.robot
│       └── regression.ios.robot
│
├── pages/                        # Page Object Model (Locators + Keywords)
│   ├── android/
│   │   ├── common/               # CommonKeywords.robot
│   │   ├── auth/                 # LoginPage.robot
│   │   ├── payment/
│   │   └── profile/
│   └── ios/                      # Same structure as android
│
├── fixtures/                     # Test data per environment
│   ├── android/
│   │   ├── local.yaml            # Local test data
│   │   ├── sit.yaml              # SIT test data
│   │   ├── uat.yaml              # UAT test data
│   │   └── test_data.robot       # Robot variables
│   └── ios/                      # Same structure as android
│
├── helpers/                      # Python utilities
│   ├── app_manager.py            # App version management
│   ├── testdata_loader.py        # Load YAML test data
│   └── database_helper.py        # Database operations
│
├── apps/                         # App binaries (.apk, .app, .ipa)
│   ├── android/
│   │   ├── local/
│   │   ├── sit/
│   │   └── uat/
│   ├── ios/
│   │   ├── local/
│   │   ├── sit/
│   │   └── uat/
│   └── versions.json             # App version tracking
│
├── db-scripts/                   # Database setup scripts
│   ├── setup.local.sql
│   ├── setup.sit.sql
│   ├── setup.uat.sql
│   └── cleanup.sql
│
└── pipelines/                    # CI/CD configurations
    ├── mobile-android-pipeline.yaml
    ├── mobile-ios-pipeline.yaml
    └── mobile-pipeline.yaml
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

### 1. Install Python Dependencies
```bash
cd tests/mobile-testing
pip install -r requirements.txt
```

### 2. Install Appium
```bash
npm install -g appium
appium driver install uiautomator2  # Android
appium driver install xcuitest      # iOS (macOS only)
```

### 3. Verify Installation
```bash
appium --version
robot --version
```

## Environment Configuration

### Available Environments
| Platform | Local | SIT (default) | UAT |
|----------|-------|---------------|-----|
| Android  | `.env.android.local` | `.env.android.sit` | `.env.android.uat` |
| iOS      | `.env.ios.local` | `.env.ios.sit` | `.env.ios.uat` |

### Environment Variables
```bash
PLATFORM_NAME=Android          # Android/iOS
PLATFORM_VERSION=11            # OS version
DEVICE_NAME=emulator-5554      # Device/emulator name
APP_PATH=./apps/android/sit/app-latest.apk
APP_PACKAGE=com.example.app.sit
APP_ACTIVITY=.MainActivity     # Android only
AUTOMATION_NAME=UiAutomator2   # UiAutomator2/XCUITest
NO_RESET=true
```

## Running Tests

### Start Appium Server
```bash
appium
```

### Android Tests
```bash
# SIT (default)
robot tests-mobile/android/

# Local environment
robot --variable ENV:local tests-mobile/android/

# UAT environment
robot --variable ENV:uat tests-mobile/android/

# Specific feature
robot tests-mobile/android/auth/

# Smoke tests
robot tests-mobile/tagged-tests/smoke.android.robot

# Regression tests
robot tests-mobile/tagged-tests/regression.android.robot
```

### iOS Tests
```bash
# SIT (default)
robot tests-mobile/ios/

# Local environment
robot --variable ENV:local tests-mobile/ios/

# UAT environment
robot --variable ENV:uat tests-mobile/ios/

# Smoke tests
robot tests-mobile/tagged-tests/smoke.ios.robot
```

### Run with Tags
```bash
# Smoke tests only
robot --include smoke tests-mobile/

# Regression tests
robot --include regression tests-mobile/

# Specific feature
robot --include auth tests-mobile/android/
```

### Parallel Execution
```bash
# Install pabot
pip install robotframework-pabot

# Run with 2 processes
pabot --processes 2 tests-mobile/android/

# Run Android and iOS in parallel
pabot --processes 2 tests-mobile/android/ tests-mobile/ios/
```

## Page Object Model

### Structure
- **Locators** - Element identifiers
- **Keywords** - Reusable actions
- **All in one file** - Easy maintenance

### Example: LoginPage.robot
```robot
*** Settings ***
Resource    ../common/CommonKeywords.robot

*** Variables ***
${LOGIN_USERNAME_FIELD}    id=com.example.app:id/username
${LOGIN_PASSWORD_FIELD}    id=com.example.app:id/password
${LOGIN_BUTTON}            id=com.example.app:id/loginButton

*** Keywords ***
Input Username
    [Arguments]    ${username}
    Input Text Safe    ${LOGIN_USERNAME_FIELD}    ${username}

Input Password
    [Arguments]    ${password}
    Input Text Safe    ${LOGIN_PASSWORD_FIELD}    ${password}

Click Login Button
    Click Element Safe    ${LOGIN_BUTTON}

Verify Login Page Displayed
    Wait For Element    ${LOGIN_USERNAME_FIELD}
    Wait For Element    ${LOGIN_PASSWORD_FIELD}
```

### Example: Test Case
```robot
*** Settings ***
Resource    ../../../pages/android/auth/LoginPage.robot
Variables   ../../../fixtures/android/sit.yaml

Suite Setup       Setup Android Test    sit
Suite Teardown    Teardown Android Test

*** Test Cases ***
Login With Valid User Should Success
    [Tags]    smoke    auth
    Verify Login Page Displayed
    Input Username    ${USERS.valid.username}
    Input Password    ${USERS.valid.password}
    Click Login Button
```

## Test Data Management

### YAML Files (Recommended)
```yaml
# fixtures/android/sit.yaml
USERS:
  valid:
    username: testuser@example.com
    password: Test123!
  invalid:
    username: invalid@example.com
    password: wrongpass

PAYMENT:
  valid_card:
    number: "4111111111111111"
    cvv: "123"
    expiry: "12/25"
```

### Robot Variables
```robot
# fixtures/android/test_data.robot
*** Variables ***
${VALID_USERNAME}    testuser@example.com
${VALID_PASSWORD}    Test123!

&{ADMIN_USER}        username=admin@example.com    password=Admin123!
```

## Test Tags

| Tag | Purpose | Usage |
|-----|---------|-------|
| `smoke` | Critical tests for quick validation | `robot --include smoke tests-mobile/` |
| `regression` | Full regression test suite | `robot --include regression tests-mobile/` |
| `auth` | Authentication tests | `robot --include auth tests-mobile/` |
| `payment` | Payment tests | `robot --include payment tests-mobile/` |
| `profile` | Profile tests | `robot --include profile tests-mobile/` |
| `critical` | Business critical functionality | `robot --include critical tests-mobile/` |

## Reports

```bash
# Generate reports in custom directory
robot --outputdir results tests-mobile/android/
```

### Report Files
- `report.html` - Test execution report
- `log.html` - Detailed test log
- `output.xml` - Machine-readable results
- Screenshots captured on failure

## Best Practices

1. **Page Object Model** - Store locators + keywords in pages/
2. **Test Data Files** - Use YAML files in fixtures/
3. **Tag Your Tests** - Use @smoke, @regression, @critical
4. **Feature-Based** - Organize tests by features (auth/, payment/)
5. **Multi-Environment** - Use .env files for LOCAL/SIT/UAT
6. **Explicit Waits** - Use Wait For Element instead of Sleep
7. **Screenshots** - Automatically captured on failure
8. **Parallel Execution** - Use pabot for faster execution

## Locator Strategies

### Android
```robot
id=com.example.app:id/elementId                 # Resource ID (Recommended)
xpath=//android.widget.Button[@text='Login']    # XPath
android=new UiSelector().text("Login")          # UiAutomator
accessibility_id=loginButton                     # Accessibility ID
```

### iOS
```robot
accessibility_id=elementId                       # Accessibility ID (Recommended)
xpath=//XCUIElementTypeButton[@name='Login']     # XPath
ios_predicate=name == "Login"                    # Predicate
ios_class_chain=**/XCUIElementTypeButton[`name == "Login"`]  # Class Chain
```

## Dependencies

```txt
# Core
robotframework==6.0.1
robotframework-appiumlibrary==2.0.0
appium-server==2.11.5

# Test Data
PyYAML==6.0.1
python-dotenv==1.0.0

# Database (Optional)
pymysql==1.1.0

# Parallel Execution (Optional)
robotframework-pabot==2.16.0
```

## Troubleshooting

### Check Devices
```bash
# Android
adb devices

# iOS
xcrun simctl list devices
```

### Common Issues

| Issue | Solution |
|-------|----------|
| App not found | Check APP_PATH in .env file |
| Device not connected | Verify device/emulator is running |
| Element not found | Check locator strategy and wait times |
| Session timeout | Increase timeout in .env |
| Appium not starting | Check port 4723 is available |

### View Appium Logs
```bash
appium --log-level debug
```

## Additional Resources

- [Robot Framework Documentation](https://robotframework.org/)
- [Appium Documentation](https://appium.io/docs/)
- [AppiumLibrary Keywords](https://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html)
- [CI/CD Pipelines](pipelines/)
- [Database Scripts](db-scripts/README.md)
- [App Management](apps/README.md)

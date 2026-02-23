# AI Instructions - Mobile Testing (Robot Framework + Appium)

## 🚨 File Modification Rules

**CRITICAL: Always ask before modifying any files**
**CRITICAL: Never translate any language without user review first**

### ✅ When to Ask Permission
- Creating new files
- Editing existing files  
- Deleting files
- Moving/renaming files

### ❌ When NOT to Ask
- Reading files (fsRead, listDirectory)
- Taking screenshots
- Running non-destructive commands

### 📝 What to Confirm
1. Which file(s) will be modified
2. What changes will be made
3. Why the changes are needed

**Example:**
```
ฉันจะสร้างไฟล์ test สำหรับ Mobile Testing ด้วย Robot Framework
คุณต้องการให้ฉันดำเนินการไหม?
```

---

## 📁 Project Structure

```
mobile-testing/
├── 📂 tests-mobile/                # Test cases by platform
│   ├── android/                    # Android test cases
│   │   ├── auth/                   # Authentication tests
│   │   ├── payment/                # Payment tests
│   │   └── profile/                # Profile tests
│   ├── ios/                        # iOS test cases
│   │   ├── auth/                   # Authentication tests
│   │   ├── payment/                # Payment tests
│   │   └── profile/                # Profile tests
│   └── tagged-tests/               # Smoke & Regression tests
│       ├── smoke.android.robot
│       ├── smoke.ios.robot
│       ├── regression.android.robot
│       └── regression.ios.robot
├── 📂 pages/                       # Page Object Model
│   ├── android/                    # Android page objects
│   │   ├── common/                 # Common keywords
│   │   ├── auth/                   # LoginPage, RegisterPage
│   │   ├── payment/                # Payment page objects
│   │   └── profile/                # Profile page objects
│   └── ios/                        # iOS page objects (same structure)
├── 📂 fixtures/                    # Test data per environment
│   ├── android/                    # Android test data
│   │   ├── local.yaml              # Local test data
│   │   ├── sit.yaml                # SIT test data
│   │   └── uat.yaml                # UAT test data
│   └── ios/                        # iOS test data (same structure)
├── 📂 helpers/                     # Python utility functions
│   ├── app_manager.py              # App version management
│   ├── testdata_loader.py          # Load YAML test data
│   └── database_helper.py          # Database operations
├── 📂 apps/                        # App binaries (.apk, .app, .ipa)
│   ├── android/                    # Android apps
│   │   ├── local/                  # Local environment apps
│   │   ├── sit/                    # SIT environment apps
│   │   └── uat/                    # UAT environment apps
│   ├── ios/                        # iOS apps
│   │   ├── local/                  # Local environment apps
│   │   ├── sit/                    # SIT environment apps
│   │   └── uat/                    # UAT environment apps
│   └── versions.json               # App version tracking
├── 📂 db-scripts/                  # Database setup scripts
│   ├── setup.local.sql             # Local data setup
│   ├── setup.sit.sql               # SIT data setup
│   ├── setup.uat.sql               # UAT data setup
│   └── cleanup.sql                 # Cleanup script
├── 📂 pipelines/                   # CI/CD pipeline configs
│   ├── mobile-android-pipeline.yaml
│   ├── mobile-ios-pipeline.yaml
│   └── mobile-pipeline.yaml
├── 📂 reports/                     # Test execution reports
│   ├── report.html                 # HTML report
│   ├── log.html                    # Detailed log
│   └── output.xml                  # XML output
├── 📄 .env.android.local           # Android Local config
├── 📄 .env.android.sit             # Android SIT config (default)
├── 📄 .env.android.uat             # Android UAT config
├── 📄 .env.ios.local               # iOS Local config
├── 📄 .env.ios.sit                 # iOS SIT config (default)
├── 📄 .env.ios.uat                 # iOS UAT config
├── 📄 requirements.txt             # Python dependencies
└── 📄 README.md                    # Project documentation
```

---

## 📝 Coding Standards

### 1. 🏷️ File and Folder Naming
**File Names**: lowerCamelCase (e.g., `userLogin.robot`)
**Folder Names**: Keep existing format (e.g., `auth/`, `payment/`)

```robot
# ✅ CORRECT - lowerCamelCase for file names
userLogin.robot
productSearch.robot
formValidation.robot
passwordReset.robot

# ✅ CORRECT - Folder names (keep existing format)
auth/
payment/
profile/
user-management/

# ❌ WRONG - File naming conventions
UserLogin.robot          # PascalCase
user_login.robot         # snake_case
user-login.robot         # kebab-case
User Login.robot         # spaces
```

### 2. 🎯 Element Locator Strategy (Priority Order)

**Use this priority order for element selection:**

#### 1️⃣ Accessibility ID (Highest Priority - Most Stable)
```robot
# ✅ BEST - Accessibility ID locators (most reliable)
Tap Element    accessibility_id=username-input
Tap Element    accessibility_id=submit-btn
Element Should Be Visible    accessibility_id=error-msg
```

#### 2️⃣ ID Locators (Second Priority)
```robot
# ✅ GOOD - ID-based locators
Input Text    id=username    ${username}
Tap Element    id=login-button
Wait Until Element Is Visible    id=dashboard
```

#### 3️⃣ Class Name (Third Priority)
```robot
# ✅ GOOD - Class-based locators
Tap Element    class=login-form-submit
Element Should Contain Text    class=error-message    Invalid credentials
```

#### 4️⃣ XPath (Fourth Priority - Use When Necessary)
```robot
# ✅ OK - XPath when above methods not available
Tap Element    xpath=//android.widget.Button[@text='Login']
Wait Until Element Is Visible    xpath=//android.widget.TextView[contains(@text,'Welcome')]
```

#### ❌ What NOT to Use
```robot
# ❌ WRONG - Generic locators
Tap Element    xpath=//android.widget.Button    # Too generic
Input Text    class=input                      # Too generic
```

### 3. 🏗️ Test Structure (AAA Pattern)
```robot
*** Test Cases ***
[TC-XXXX] User Should Login Successfully With Valid Credentials
    [Documentation]    Verify user can login with valid username and password
    [Tags]    Feature:Login    Important:Critical    Scenario:Success
    
    # 📝 Arrange - Setup test data
    ${valid_username}    Set Variable    testuser@example.com
    ${valid_password}    Set Variable    password123
    
    # 🎬 Act - Perform actions
    Open Mobile Application
    Input Username    ${valid_username}
    Input Password    ${valid_password}
    Tap Login Button
    
    # ✅ Assert - Verify results
    Verify Dashboard Is Displayed
    Verify Welcome Message Contains    ${valid_username}
```

### 4. 🏷️ Code Generation Tags
**MANDATORY**: All tests MUST include all tags:
- `Feature`: Feature name (e.g., Login, Payment, Profile)
- `Important`: Priority level (Critical, High, Medium, Low)
- `Scenario`: Test scenario type (Success, Alternative, Error)

```robot
*** Test Cases ***
[TC-001] User Should Login Successfully
    [Documentation]    Test successful login with valid credentials
    [Tags]    Feature:Login    Important:Critical    Scenario:Success
    
    # Test implementation
    Open Mobile Application
    Login With Valid Credentials
    Verify Dashboard Is Displayed
```

**Tag Format Rules:**
```robot
# ✅ CORRECT - All required tags present
[Tags]    Feature:Login    Important:Critical    Scenario:Success

# ❌ WRONG - Missing tags
[Tags]    Login    # Missing Feature:, Important:, Scenario: prefixes

# ❌ WRONG - Invalid tag values
[Tags]    Feature:Login    Important:VeryImportant    Scenario:Success
# Should be: Critical, High, Medium, or Low
```

### 5. 📸 Screenshot Strategy
**MANDATORY**: Capture screenshots for critical steps:
```robot
*** Test Cases ***
[TC-001] User Should Login Successfully
    [Tags]    Feature:Login    Important:Critical    Scenario:Success
    
    # 📝 Arrange
    Open Mobile Application
    ${valid_username}=    Set Variable    test@example.com
    ${valid_password}=    Set Variable    password123
    
    # 📸 Screenshot - Before action
    Capture Page Screenshot    login-before.png
    
    # 🎬 Act
    Input Username    ${valid_username}
    Input Password    ${valid_password}
    Tap Login Button
    
    # ✅ Assert
    Wait Until Element Is Visible    id=dashboard
    Element Should Be Visible    id=welcome-message
    
    # 📸 Screenshot - After action
    Capture Page Screenshot    login-after.png
```

### 6. 🚫 Obsoleted Test Case Handling
**When test case becomes obsolete:**
- Add [Tags] with Skip
- Add comment with reason and new Test Case ID
```robot
*** Test Cases ***
[TC-001] User Should See Validation Error For Empty Fields
    [Documentation]    Skip because expected result changed to TC-XXXX
    [Tags]    Feature:Login    Important:High    Scenario:Alternative    Skip
    
    Open Mobile Application
    Tap Login Button
    Element Should Be Visible    id=error-message
    Element Text Should Be    id=error-message    Email is required
```

### 7. 📦 Test Data Management
```robot
*** Variables ***
# Test Data
${VALID_USERNAME}        testuser@example.com
${VALID_PASSWORD}        password123
${INVALID_USERNAME}      invalid@test.com
${INVALID_PASSWORD}      wrongpass

# App Configuration
${APP_PACKAGE}          com.example.app
${APP_ACTIVITY}         .MainActivity
${PLATFORM}             Android
${DEVICE_NAME}          emulator-5554
```

---

## 🏷️ Test Naming Conventions

### 🔑 Testcase ID Requirements
**MANDATORY: Every test MUST include [TC-xxxx] in title**
**ID Format: [TC-xxxx] where xxxx = ID from AXONS Test Scenario v2 in Azure DevOps Board**

#### Single Testcase ID
```robot
*** Test Cases ***
[TC-123456] User Should Login With Valid Credentials
    [Documentation]    Test successful login
    [Tags]    Feature:Login    Important:Critical    Scenario:Success
    # test implementation
```

#### Multiple Testcase IDs
```robot
*** Test Cases ***
[TC-123456][TC-123457] User Should Complete Registration Flow
    [Documentation]    Test complete user registration process
    [Tags]    Feature:Registration    Important:High    Scenario:Success
    # test implementation
```

### 🏷️ Test Suite Naming Conventions

**MANDATORY: Every test suite MUST include [PBI-xxxx] prefix in Settings**

```robot
*** Settings ***
Documentation    [PBI-1234] User Authentication Feature
...              Test suite for user login and authentication
Library          AppiumLibrary
Resource         ../pages/android/auth/LoginPage.robot
```

---

## 🔄 Test Generation Workflow

### MANDATORY CONFIRMATION STEPS
**Before generating any test code, MUST follow these steps:**

#### 1️⃣ Requirements Confirmation
```
📋 ยืนยันความต้องการ:
- Feature: [ชื่อ feature]
- Test Type: Mobile Testing (Android/iOS)
- Platform: [Android/iOS/Both]
- Source: [CSV/Manual/Azure DevOps]
- Environment: [local/sit/uat]
```

#### 2️⃣ Testcase List (MCP only)
```
📝 รายการ Test Cases จาก Azure DevOps:
[TC-001] - Login with valid credentials
[TC-002] - Login with invalid credentials
[TC-003] - Password reset flow
```

#### 3️⃣ Folder Structure Preview
```
📁 โครงสร้างที่จะสร้าง:
tests-mobile/
├── android/
│   └── auth/
│       ├── userLogin.robot
│       └── passwordReset.robot
└── ios/
    └── auth/
        ├── userLogin.robot
        └── passwordReset.robot
```

#### 4️⃣ Implementation Plan
```
🎯 แผนการทำงาน:
1. สร้างโฟลเดอร์ auth/
2. สร้างไฟล์ test 2 ไฟล์
3. เพิ่ม tags: Feature:Login, Important:Critical, Scenario:Success/Alternative
4. ใช้ Page Object Model pattern

❓ ยืนยันการดำเนินการ? (Y/ยืนยัน)
```

### 🚫 ABSOLUTE RESTRICTIONS
- **NO CODE WITHOUT CONFIRMATION**: ห้ามเขียนโค้ดก่อนได้รับการยืนยัน
- **WAIT FOR USER APPROVAL**: รอคำตอบ "Y" หรือ "ยืนยัน"
- **ASK IF UNCLEAR**: ถามเมื่อไม่แน่ใจ
- **FOLLOW CSV ORDER**: ทำตามลำดับใน CSV
- **PRESERVE LANGUAGE**: รักษาภาษาเดิมในเนื้อหา

---

## 📚 Quick Reference

### ✅ DO's
- Use descriptive test case and keyword names
- **MANDATORY: Add Feature:, Important: and Scenario: tags to EVERY test**
- Use Test Case ID format: `[TC-XXXX]`
- Follow Page Object pattern with resource files
- Use proper element waiting strategies
- Implement error handling with TRY/EXCEPT
- Capture screenshots for failures
- Log important actions and verifications
- Ask before modifying files

### ❌ DON'Ts
- Write code without confirmation
- Translate CSV content
- Use generic locators
- Skip element waiting
- Forget testcase IDs format `[TC-XXXX]`
- **NEVER skip Feature:, Important: and Scenario: tags**
- Use unclear variable names
- Tap without waiting for elements

---

## ✍️ How to Write Mobile Tests

### 🏗️ Basic Mobile Test Structure
```robot
*** Settings ***
Documentation    [PBI-1234] User Login Feature
Library          AppiumLibrary
Resource         ../../pages/android/auth/LoginPage.robot
Resource         ../../pages/android/common/CommonKeywords.robot

*** Test Cases ***
[TC-001] User Should Login Successfully With Valid Credentials
    [Documentation]    Verify successful login with valid credentials
    [Tags]    Feature:Login    Important:Critical    Scenario:Success
    
    # 📝 Arrange - Setup test data
    ${username}=    Set Variable    test@example.com
    ${password}=    Set Variable    password123
    
    # 🎬 Act - Perform login
    Open Mobile Application
    Input Username    ${username}
    Input Password    ${password}
    Tap Login Button
    
    # ✅ Assert - Verify dashboard
    Wait Until Element Is Visible    id=dashboard    timeout=10s
    Element Should Be Visible    id=welcome-message
    Element Text Should Contain    id=welcome-message    Welcome
```

### 📱 Mobile Interaction Patterns
```robot
*** Keywords ***
# Form Interactions
Input Text Into Field
    [Arguments]    ${locator}    ${text}
    Wait Until Element Is Visible    ${locator}    timeout=10s
    Input Text    ${locator}    ${text}

Tap Element Safely
    [Arguments]    ${locator}
    Wait Until Element Is Visible    ${locator}    timeout=10s
    Tap Element    ${locator}

# Swipe Actions
Swipe Up On Screen
    Swipe By Percent    50    80    50    20

Swipe Down On Screen
    Swipe By Percent    50    20    50    80

# Wait Strategies
Wait For Element And Tap
    [Arguments]    ${locator}    ${timeout}=10s
    Wait Until Element Is Visible    ${locator}    timeout=${timeout}
    Tap Element    ${locator}
```

### 🔍 Mobile Verification Patterns
```robot
*** Keywords ***
# Visibility Checks
Verify Element Is Visible
    [Arguments]    ${locator}
    Wait Until Element Is Visible    ${locator}    timeout=10s
    Element Should Be Visible    ${locator}

Verify Element Is Not Visible
    [Arguments]    ${locator}
    Element Should Not Be Visible    ${locator}

# Text Verification
Verify Element Contains Text
    [Arguments]    ${locator}    ${expected_text}
    ${actual_text}=    Get Text    ${locator}
    Should Contain    ${actual_text}    ${expected_text}

Verify Element Text Equals
    [Arguments]    ${locator}    ${expected_text}
    ${actual_text}=    Get Text    ${locator}
    Should Be Equal    ${actual_text}    ${expected_text}
```

---

## 🏷️ Code Generation Tags

### 📝 Tag Requirements
**MANDATORY: All generated code MUST include Feature, Important and Scenario tags**

#### Tag Format
```robot
[Tags]    Feature:<FeatureName>    Important:<Level>    Scenario:<Type>
```

#### 📊 Important Levels
- **Critical**: Core mobile functionality (login, payment, navigation)
- **High**: Important mobile features (validation, error handling, offline mode)
- **Medium**: Nice-to-have mobile features (animations, gestures)
- **Low**: Optional mobile features (themes, preferences)

#### 🎯 Scenario Types
- **Success**: Happy path mobile flows, expected behavior
- **Alternative**: Error cases, edge cases, validation failures

### 📝 Mobile Test Examples with Tags
```robot
*** Test Cases ***
[TC-001] User Should Login With Valid Credentials
    [Documentation]    Critical mobile functionality - login is essential
    [Tags]    Feature:Login    Important:Critical    Scenario:Success
    
    Open Mobile Application
    Login With Valid Credentials
    Verify Dashboard Is Displayed

[TC-002] User Should See Error With Invalid Credentials
    [Documentation]    Important mobile validation testing
    [Tags]    Feature:Login    Important:High    Scenario:Alternative
    
    Open Mobile Application
    Login With Invalid Credentials
    Verify Error Message Is Displayed
    Verify Error Message Contains    Invalid credentials
```

---

## 📦 Requirements.txt Format

```txt
robotframework==6.1.1
robotframework-appiumlibrary==2.0.0
robotframework-pythonlibcore==4.2.0
Appium-Python-Client==2.11.1
PyYAML==6.0.1
python-dotenv==1.0.0
```

---

## 🚀 Running Tests

### Android Tests
```bash
# Run all Android tests (SIT)
robot tests-mobile/android/

# Run specific feature
robot tests-mobile/android/auth/

# Run with environment
robot --variable ENV:local tests-mobile/android/

# Run with tags
robot --include Feature:Login tests-mobile/android/
robot --include Important:Critical tests-mobile/android/
```

### iOS Tests
```bash
# Run all iOS tests (SIT)
robot tests-mobile/ios/

# Run specific feature
robot tests-mobile/ios/auth/

# Run with environment
robot --variable ENV:uat tests-mobile/ios/
```

---

## 📞 Emergency Contacts
- **File Issues**: Always ask before modifying
- **Language Issues**: Never translate without approval
- **CSV Issues**: Preserve original order and content
- **Unclear Requirements**: Ask for clarification

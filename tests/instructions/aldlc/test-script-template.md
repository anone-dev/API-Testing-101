# Test Script Template

## Project Structure
```
project-root/
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
    │   ├── tests-mobile/         # Test files organized by features
    │   │   ├── auth/
    │   │   │   ├── auth.robot
    │   │   │   └── login.robot
    │   │   ├── books/
    │   │   │   └── books.robot
    │   │   ├── orders/
    │   │   │   └── orders.robot
    │   │   └── tagged_tests/
    │   │       ├── smoke.robot
    │   │       └── regression.robot
    │   ├── pages/                # Page Object Model (Shared for Flutter)
    │   │   ├── common/
    │   │   │   └── BasePage.resource
    │   │   ├── auth/
    │   │   │   ├── AuthPage.resource
    │   │   │   └── LoginPage.resource
    │   │   ├── books/
    │   │   │   └── BooksPage.resource
    │   │   ├── dashboard/
    │   │   │   └── DashboardPage.resource
    │   │   └── orders/
    │   │       └── OrdersPage.resource
    │   ├── fixtures/             # Test data + Appium capabilities per env/platform
    │   │   ├── testdata.local.android.yaml
    │   │   ├── testdata.local.ios.yaml
    │   │   ├── testdata.sit.android.yaml
    │   │   └── testdata.sit.ios.yaml
    │   ├── helpers/
    │   │   ├── __init__.py
    │   │   ├── env_loader.py
    │   │   ├── app_manager.py
    │   │   ├── testdata_loader.py
    │   │   └── database_helper.py
    │   ├── apps/
    │   │   ├── .keep
    │   │   └── app-release.apk
    │   ├── db-scripts/
    │   │   ├── setup.local.sql
    │   │   ├── setup.sit.sql
    │   │   └── cleanup.sql
    │   ├── pipelines/
    │   │   ├── mobile-pipeline.yaml
    │   │   └── azure-pipelines-env-emulator-verification.yml
    │   ├── package.json          # npm scripts: mobile:{os}:{env}:{mode}
    │   ├── run.js                # Runner: translates args → robot command
    │   └── requirements.txt
    │
    └── test-scenario/            # 📄 Test scenarios and documentation
        ├── PBI-7420-test-scenario.md   # Test scenario documentation
        └── PBI-7420-test-scenario.csv  # Test scenario in CSV format
```


## Automation Script Coding Standards

### For Playwright (API & Web UI Testing)

#### Playwright Standards

### 1. Async/Await Usage
- **MANDATORY**: Always use async/await for Playwright operations
- Never omit await keyword for page interactions

### 2. Naming Conventions
- **Variables**: Descriptive camelCase names
- **Files/Folders**: Snake_case format (e.g., `user_login.spec.ts`, `api_authentication.spec.ts`)
```typescript
// ✅ CORRECT - Snake case for files and folders
user_login.spec.ts
api_authentication.spec.ts
test_data_validation.spec.ts
user_management/
api_endpoints/

// ❌ WRONG - Other naming conventions
UserLogin.spec.ts          // PascalCase
userLogin.spec.ts          // camelCase
user-login.spec.ts         // kebab-case
User Login.spec.ts         // spaces
```

### 3. Test Structure (AAA Pattern)
- **Arrange**: Setup test data and preconditions
- **Act**: Perform actions being tested
- **Assert**: Verify expected results

#### Test Description Naming Convention
- **MANDATORY: Every test.describe MUST include [PBI-xxxx] prefix**
- ID is from Azure devops ID
```typescript
// ✅ CORRECT - Single PBI ID
test.describe('[PBI-1234] User Login Feature', () => {
  // test implementations
});

// ✅ CORRECT - Multiple PBI IDs
test.describe('[PBI-1234][PBI-1235] User Registration Flow', () => {
  // test implementations covering multiple PBIs
});

// ❌ WRONG Examples - Missing PBI ID
test.describe('User Login Feature');        // Missing PBI ID
```

#### Test Naming Convention
- **MANDATORY: Every test MUST include [TC-xxxx] in title**
- ID is from Azure devops ID
```typescript
// ✅ CORRECT - Single testcase ID
test('[TC-XXXX] should display error for invalid login', async ({ page }) => {
  // 📝 Arrange - Setup test data
  const invalidEmail = 'invalid@test.com';
  
  // 🎬 Act - Perform actions
  await page.goto('/login');
  await page.fill('#email', invalidEmail);
  await page.click('#submit');
  
  // ✅ Assert - Verify results
  await expect(page.locator('.error')).toBeVisible();
});

// ✅ CORRECT - Multiple testcase ID
test('[TC-XXXX][TC-YYYY] should display error for invalid login', async ({ page }) => {
  // 📝 Arrange - Setup test data
  const invalidEmail = 'invalid@test.com';
  
  // 🎬 Act - Perform actions
  await page.goto('/login');
  await page.fill('#email', invalidEmail);
  await page.click('#submit');
  
  // ✅ Assert - Verify results
  await expect(page.locator('.error')).toBeVisible();
});
```

### 4. Code Generation Tags
**MANDATORY**: All tests MUST include all tags:
```typescript
// @Feature: Login
test.describe('[PBI-001] Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/login');
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-002] should perform specific UI action', async ({ page }) => {
    // 📝 Arrange - Setup test data
    const testData = { email: 'user@test.com', password: 'password123' };
    
    // 🎬 Act - Perform UI actions
    await page.fill('#email', testData.email);
    await page.fill('#password', testData.password);
    await page.click('#submit');
    
    // ✅ Assert - Verify UI results
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('.welcome-message')).toBeVisible();
  });
});
```

### 5. 🎯 Element Locator Strategy (Priority Order)

**Use this priority order for element selection:**
#### 1️⃣ getByTestId (Highest Priority - Most Stable)
```typescript
// ✅ BEST - Test ID locators (most reliable)
const usernameInput = page.getByTestId('username-input');
const submitButton = page.getByTestId('submit-btn');
const errorMessage = page.getByTestId('error-msg');
```

#### 2️⃣ getByRole (Second Priority - Accessibility Friendly)
```typescript
// ✅ GOOD - Role-based locators
const usernameInput = page.getByRole('textbox', { name: 'Username' });
const submitButton = page.getByRole('button', { name: 'Submit' });
const loginForm = page.getByRole('form', { name: 'Login Form' });
```

#### 3️⃣ getByText/getByLabel (Third Priority - User-Friendly)
```typescript
// ✅ GOOD - Text and label locators
const passwordInput = page.getByLabel('Password');
const loginButton = page.getByText('Login');
const welcomeText = page.getByText('Welcome back!');
```

#### 4️⃣ CSS Selectors (Fourth Priority - Flexible)
```typescript
// ✅ OK - CSS selectors when above methods not available
const emailInput = page.locator('#email');
const submitButton = page.locator('button[type="submit"]');
const errorMessage = page.locator('.error-message');
```

#### 5️⃣ XPath (Last Resort - Use Only When Necessary)
```typescript
// ⚠️ LAST RESORT - XPath locators
const dynamicElement = page.locator('xpath=//div[contains(@class, "dynamic")]//button[text()="Click Me"]');
const complexElement = page.locator('xpath=//input[@placeholder="Username"]');
```

#### ❌ What NOT to Use
```typescript
// ❌ WRONG - Generic locators
const input = page.locator('input');           // Too generic
const button = page.locator('button');         // Too generic
const div = page.locator('div');               // Too generic
```

### 6. API Test Logging
**MANDATORY**: Log all API requests and responses:
```typescript
// Before request
console.log('=== REQUEST LOG ===');
console.log('Method:', method);
console.log('URL:', url);
console.log('Data:', data);

// After response
console.log('=== RESPONSE LOG ===');
console.log('Status:', response.status());
console.log('Body:', await response.json());
```

### 7. 🔍 UI Assertions Best Practices
```typescript
// ✅ CORRECT - Specific UI assertions
await expect(page.locator('.success-message')).toBeVisible();
await expect(page).toHaveURL('/dashboard');
await expect(page.locator('#username')).toHaveText('John Doe');
await expect(page.locator('.modal')).toBeHidden();

// ❌ WRONG - Generic assertions
await expect(page.locator('.message')).toBeTruthy();
```


### 8. 🖥️ UI Test Template with Screenshots
```typescript
test.describe('Login Feature', () => {
  // @Important: Critical
  // @Scenario: Success
  test('[TC001] should login with valid credentials', async ({ page }) => {
    // 📝 Arrange
    await page.goto('/login');
    const validUser = { email: 'user@test.com', password: 'password123' };
    
    // 📸 Screenshot - Before action
    await page.screenshot({ path: 'test-results/login-before.png' });
    
    // 🎬 Act
    await page.fill('#email', validUser.email);
    await page.fill('#password', validUser.password);
    await page.click('#login-btn');
    
    // ✅ Assert
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('.welcome-message')).toBeVisible();
    
    // 📸 Screenshot - After action
    await page.screenshot({ path: 'test-results/login-after.png' });
  });
});
```

### 9. 🎭 UI Interaction Patterns
```typescript
// Form Interactions
await page.fill('#input-field', 'value');
await page.selectOption('#dropdown', 'option-value');
await page.check('#checkbox');
await page.click('#button');

// Wait for Elements
await page.waitForSelector('.loading-spinner', { state: 'hidden' });
await page.waitForLoadState('networkidle');

// Hover and Focus
await page.hover('.menu-item');
await page.focus('#search-input');

// File Upload
await page.setInputFiles('#file-input', 'path/to/file.pdf');
```

### 10. 🔍 UI Verification Patterns
```typescript
// Visibility Checks
await expect(page.locator('.success-alert')).toBeVisible();
await expect(page.locator('.error-modal')).toBeHidden();

// Text Content
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('.username')).toContainText('John');

// Attributes
await expect(page.locator('#submit-btn')).toBeEnabled();
await expect(page.locator('#email')).toHaveAttribute('required');

// URL and Title
await expect(page).toHaveURL('/dashboard');
await expect(page).toHaveTitle('Dashboard - MyApp');
```


### 11. 📦 Import Organization
```typescript
// ✅ CORRECT - Organized imports
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import userData from '../fixtures/testdata.sit.json';
```

### 12. Obsoleted Test Case
- Update test to skip
- Add comment with reason and new Test Case ID
```typescript
test.skip('[TC-001] should display validation error for empty fields', async ({ page }) => {
  // Skip because expected result changed to TC-XXXX
  await page.goto('/login');
  await page.click('#login-btn');
  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toHaveText('Email is required');
});
```

### 13. Test Generation Workflow
**MANDATORY CONFIRMATION STEPS**:
1. **Requirements Confirmation**: Feature, test type, source
2. **Testcase List** (MCP only): Display all test cases from Azure DevOps
3. **Folder Structure Preview**: Show directory structure
4. **Implementation Plan**: Confirm approach and tags

**ABSOLUTE RESTRICTIONS**:
- 🚫 NO CODE WITHOUT CONFIRMATION
- ⏳ WAIT FOR USER APPROVAL ("Y" or "ยืนยัน")
- ❓ ASK IF UNCLEAR
- 📄 FOLLOW CSV ORDER
- 🌍 PRESERVE LANGUAGE

### 14. Package.json Scripts Format (Playwright)
**MANDATORY Format**: `[type]:[environment]:[feature]:[mode]`
- **type**: `ui` | `api`
- **environment**: `dev` | `uat`
- **feature**: `sprint1` | `sprint2` | `feature1` | etc.
- **mode**: `cliMode` | `guiMode`

**Example**:
```json
"ui:dev:all:cliMode": "ENV=dev playwright test ui/tests_ui --config=ui/playwright.config.ts",
"ui:dev:pbi:cliMode": "ENV=dev playwright test ui/tests_ui --grep '@PBI:.*$PBI' --config=ui/playwright.config.ts",
"ui:dev:tag:cliMode": "ENV=dev playwright test ui/tests_ui --grep '@Feature:.*$FEATURE' --config=ui/playwright.config.ts",
    
"api:dev:all:cliMode": "ENV=dev playwright test api/tests_api --config=api/playwright.config.ts",
"api:dev:pbi:cliMode": "ENV=dev playwright test api/tests_api --grep '@PBI:.*$PBI' --config=api/playwright.config.ts",
"api:dev:tag:cliMode": "ENV=dev playwright test api/tests_api --grep '@Feature:.*$FEATURE' --config=api/playwright.config.ts"


```


---

### For Robot Framework (Mobile UI Testing)

#### Robot Framework Standards

### 1. File Structure and Naming
- **Test Files**: Snake_case format (e.g., `user_login.robot`, `api_authentication.robot`)
- **Resource Files**: Snake_case format (e.g., `common_keywords.resource`, `mobile_elements.resource`)
- **Variable Files**: Snake_case format (e.g., `test_data.py`, `app_config.py`)

```robot
# ✅ CORRECT - Snake case for files
user_login.robot
api_authentication.robot
mobile_navigation.robot
common_keywords.resource

# ❌ WRONG - Other naming conventions
UserLogin.robot          # PascalCase
userLogin.robot          # camelCase
user-login.robot         # kebab-case
```

### 2. Test Case Structure
- **Test Case Names**: Descriptive with spaces allowed
- **Keywords**: Title Case with spaces
- **Variables**: UPPER_CASE for constants, ${lower_case} for local

```robot
*** Test Cases ***
[TC-XXXX] User Should Login Successfully With Valid Credentials
    [Documentation]    Verify user can login with valid username and password
    [Tags]    login    Critical    Success
    
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

### 3. Mandatory Tags (Same as Playwright)
**MANDATORY**: All tests MUST include all tags:
```robot
[Tags]    Feature:sample-request,approve-document    Important:Critical|High|Medium|Low    Scenario:Success|Alternative
```

### 4. 🎯 Element Locator Strategy (Priority Order)

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

### 5. Keyword Organization
- **Page Object Pattern**: Create resource files for each screen
- **Common Keywords**: Reusable keywords in separate resource files
- **Data-Driven**: Use variables and test data files

```robot
*** Settings ***
Resource    ../resources/common_keywords.resource
Resource    ../resources/login_page.resource
Variables    ../data/test_data.py
Library     AppiumLibrary
Library     Collections

*** Keywords ***
Open Mobile Application
    [Documentation]    Launch the mobile application
    Open Application    ${REMOTE_URL}    platformName=${PLATFORM}
    ...    deviceName=${DEVICE_NAME}    app=${APP_PATH}
    Wait Until Element Is Visible    accessibility_id=app-root    timeout=30s

Verify Element Contains Expected Text
    [Documentation]    Verify element contains expected text with logging
    [Arguments]    ${locator}    ${expected_text}
    
    Log    Verifying element '${locator}' contains text '${expected_text}'
    ${actual_text}    Get Text    ${locator}
    Should Contain    ${actual_text}    ${expected_text}
    Log    ✅ Verification successful: Found '${expected_text}' in '${actual_text}'
```

### 6. Mobile-Specific Best Practices
```robot
# ✅ CORRECT - Mobile-specific actions
Swipe By Percent    50    80    50    20    # Swipe up
Wait Until Element Is Visible    accessibility_id=element    timeout=10s
Capture Page Screenshot    login_success.png
Hide Keyboard    # For text input scenarios

# Device-specific waits
Wait Until Element Is Visible    ${locator}    timeout=30s
Sleep    2s    # Only when necessary for animations
```

### 7. Test Data Management
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

### 8. Error Handling and Logging
```robot
*** Keywords ***
Safe Tap Element
    [Documentation]    Tap element with error handling and logging
    [Arguments]    ${locator}
    
    Log    Attempting to tap element: ${locator}
    TRY
        Wait Until Element Is Visible    ${locator}    timeout=10s
        Tap Element    ${locator}
        Log    ✅ Successfully tapped element: ${locator}
    EXCEPT    Element not found
        Log    ❌ Failed to find element: ${locator}
        Capture Page Screenshot    error_element_not_found.png
        Fail    Element '${locator}' was not found on the screen
    END
```

### 9. Test Generation Workflow (Same as Playwright)
**MANDATORY CONFIRMATION STEPS**:
1. **Requirements Confirmation**: Feature, test type, source
2. **Testcase List** (MCP only): Display all test cases from Azure DevOps
3. **Folder Structure Preview**: Show directory structure
4. **Implementation Plan**: Confirm approach and tags

**ABSOLUTE RESTRICTIONS**:
- 🚫 NO CODE WITHOUT CONFIRMATION
- ⏳ WAIT FOR USER APPROVAL ("Y" or "ยืนยัน")
- ❓ ASK IF UNCLEAR
- 📄 FOLLOW CSV ORDER
- 🌍 PRESERVE LANGUAGE

---

## 📚 Quick Reference

### ✅ DO's (Playwright)
- Always use async/await for UI actions
- **MANDATORY: Add @Important and @Scenario tags to EVERY test**
- Take screenshots for critical steps
- Use specific locators
- Wait for elements properly
- Follow AAA pattern (Arrange, Act, Assert)
- Ask before modifying files

### ✅ DO's (Robot Framework)
- Use descriptive test case and keyword names
- **MANDATORY: Add @Important and @Scenario tags to EVERY test**
- Follow Page Object pattern with resource files
- Use proper element waiting strategies
- Implement error handling with TRY/EXCEPT
- Capture screenshots for failures
- Log important actions and verifications

### ❌ DON'Ts (Both Frameworks)
- Write code without confirmation
- Translate CSV content
- Use generic locators
- Skip element waiting
- Forget testcase IDs
- **NEVER skip @Important and @Scenario tags**
- Use unclear variable names
- Click/Tap without waiting for elements

### 🎯 Testing Best Practices

#### Playwright (API & Web UI)
- **Locator Strategy**: Use data-testid > id > class > text
- **Wait Strategy**: Always wait for elements before interaction
- **Screenshot Strategy**: Capture before/after critical actions
- **Assertion Strategy**: Verify both visibility and content
- **Error Handling**: Test both success and failure scenarios

#### Robot Framework (Mobile UI)
- **Locator Strategy**: Use accessibility_id > id > class > xpath
- **Wait Strategy**: Always wait for elements with proper timeouts
- **Screenshot Strategy**: Capture on failures and critical steps
- **Keyword Strategy**: Create reusable keywords for common actions
- **Resource Strategy**: Organize keywords by page/feature

### 📞 Emergency Contacts
- **File Issues**: Always ask before modifying
- **Language Issues**: Never translate without approval
- **CSV Issues**: Preserve original order and content
- **Unclear Requirements**: Ask for clarification

## Summary
- Update automation status refered from test case
### API Case
| Endpoint | Method | User Story | Test Case | Case | Automation Status |
|----------|--------|---------|------------|-----|-----|
| [/api/resource] | [GET/POST/etc] | [PBI-001] | [TC-001] | [Success] | ✅/❌ |
| [/api/resource] | [GET/POST/etc] | [PBI-001] | [TC-002] | [Validation Error] | ✅/❌ |

### UI Case
| User Flow | User Story | Test Case | Case | Automation Status |
|--------|---------|------------|-----|-----|
| [User Story] | [PBI-001] | [TC-003] | [Test flow in short] | ✅/❌ |
| [User Story] | [PBI-001] | [TC-004] | [Validation Error] | ✅/❌ |
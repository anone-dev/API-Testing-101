# AI Instructions - UI Testing

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
ฉันจะแก้ไขไฟล์ package.json เพื่อเพิ่ม script ใหม่สำหรับรัน UI tests
คุณต้องการให้ฉันดำเนินการไหม?
```

---

## 📁 Project Structure

```
web-testing/
├── 📂 tests-web/                   # Web test files by features
│   ├── feature-1/                  # Feature 1: Login tests
│   ├── feature-2/                  # Feature 2: User management
│   ├── feature-3/                  # Feature 3: Dashboard
│   └── tagged-tests.spec.ts        # Smoke & Regression tests
├── 📂 pages/                       # Page Object Model
│   ├── BasePage.ts                 # Base page with common methods
│   ├── LoginPage.ts                # Login page object
│   └── DashboardPage.ts            # Dashboard page object
├── 📂 fixtures/                    # Test data per environment
│   ├── testdata.sit.json           # SIT test data (default)
│   ├── testdata.local.json         # Local test data
│   └── testdata.uat.json           # UAT test data
├── 📂 helpers/                     # Test utilities
│   ├── testDataLoader.ts           # Load test data
│   └── databaseHelper.ts           # Database operations
├── 📂 db-scripts/                  # Database setup scripts
│   ├── setup.local.sql             # Local data setup
│   ├── setup.sit.sql               # SIT data setup
│   ├── setup.uat.sql               # UAT data setup
│   └── cleanup.sql                 # Cleanup script
├── 📂 pipelines/                   # CI/CD pipeline configs
│   └── web-pipeline.yaml           # Azure DevOps pipeline
├── 📂 playwright-report/           # Test execution reports
│   └── index.html                  # Latest test report
├── 📂 test-results/                # Test artifacts & screenshots
│   └── .last-run.json              # Last test run metadata
├── 📄 .env                         # SIT environment (default)
├── 📄 .env.local                   # Local environment
├── 📄 .env.uat                     # UAT environment
├── 📄 playwright.config.ts         # Playwright configuration
├── 📄 package.json                 # Dependencies & scripts
├── 📄 package-lock.json            # Dependency lock file
├── 📄 .gitignore                   # Git ignore rules
└── 📄 README.md                    # Project documentation
```

---

## 📝 Coding Standards

### 1. ⏰ Async/Await Usage
```typescript
// ✅ CORRECT - Always use async/await
test('should login successfully', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'user@test.com');
  await page.click('#submit');
});

// ❌ WRONG - Missing async/await
test('should login', ({ page }) => {
  page.goto('/login'); // Will fail!
});
```

### 2. 🎯 Element Locator Strategy (Priority Order)

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

### 3. 🏷️ Naming Conventions
```typescript
// ✅ CORRECT - Descriptive names
const loginButton = page.locator('#login-btn');
const userEmail = 'test@example.com';
const welcomeMessage = page.locator('.welcome-text');

// ❌ WRONG - Unclear names
const btn = page.locator('#login-btn');
const email = 'test@example.com';
const msg = page.locator('.welcome-text');
```

### 4. 📁 File and Folder Naming
**File Names**: lowerCamelCase (e.g., `userLogin.spec.ts`)
**Folder Names**: Keep existing format (e.g., `feature-1/`, `feature-2/`)

```typescript
// ✅ CORRECT - lowerCamelCase for file names
userLogin.spec.ts
productSearch.spec.ts
formValidation.spec.ts
passwordReset.spec.ts

// ✅ CORRECT - Folder names (keep existing format)
feature-1/
feature-2/
feature-3/
user-management/
ui-components/

// ❌ WRONG - File naming conventions
UserLogin.spec.ts          // PascalCase
user_login.spec.ts         // snake_case
user-login.spec.ts         // kebab-case
User Login.spec.ts         // spaces
```

### 5. 🏗️ Test Structure (AAA Pattern)
```typescript
test('should display error for invalid login', async ({ page }) => {
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

### 6. 🔍 UI Assertions Best Practices
```typescript
// ✅ CORRECT - Specific UI assertions
await expect(page.locator('.success-message')).toBeVisible();
await expect(page).toHaveURL('/dashboard');
await expect(page.locator('#username')).toHaveText('John Doe');
await expect(page.locator('.modal')).toBeHidden();

// ❌ WRONG - Generic assertions
await expect(page.locator('.message')).toBeTruthy();
```

### 7. 📦 Import Organization
```typescript
// ✅ CORRECT - Organized imports
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import userData from '../fixtures/testdata.sit.json';
```

### 8. 🏷️ Code Generation Tags
**MANDATORY**: All tests MUST include all tags:
- `@Feature`: Feature name (e.g., Login, UserManagement)
- `@Important`: Priority level (Critical, High, Medium, Low)
- `@Scenario`: Test scenario type (Success, Alternative, Error)

```typescript
// @Feature: Login
test.describe('[PBI-001] User Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/login');
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-001] should login successfully with valid credentials', async ({ page }) => {
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

  // @Important: High
  // @Scenario: Error
  test('[TC-002] should display error message with invalid credentials', async ({ page }) => {
    // 📝 Arrange - Setup test data
    const invalidData = { email: 'invalid@test.com', password: 'wrongpass' };
    
    // 🎬 Act - Perform UI actions
    await page.fill('#email', invalidData.email);
    await page.fill('#password', invalidData.password);
    await page.click('#submit');
    
    // ✅ Assert - Verify error message
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toHaveText('Invalid credentials');
  });
});
```

**Tag Format Rules:**
```typescript
// ✅ CORRECT - All required tags present
// @Feature: Login
// @Important: Critical
// @Scenario: Success
test('[TC-001] should login successfully', async ({ page }) => {
  // test implementation
});

// ❌ WRONG - Missing tags
test('[TC-001] should login successfully', async ({ page }) => {
  // Missing @Feature, @Important, @Scenario tags
});

// ❌ WRONG - Invalid tag values
// @Feature: Login
// @Important: VeryImportant  // Should be: Critical, High, Medium, or Low
// @Scenario: Success
```

### 9. 📸 Screenshot Strategy
**MANDATORY**: Capture screenshots for critical steps:
```typescript
test('[TC-001] should login with valid credentials', async ({ page }) => {
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
```

### 10. 🚫 Obsoleted Test Case Handling
**When test case becomes obsolete:**
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

### 11. 📦 Package.json Scripts Format
**MANDATORY Format**: `[type]:[environment]:[feature]:[mode]`
- **type**: `ui` | `api`
- **environment**: `local` | `sit` | `uat`
- **feature**: `sprint1` | `sprint2` | `feature1` | `all` | etc.
- **mode**: `cliMode` | `guiMode`

**Example**:
```json
{
  "scripts": {
    "ui:local:all:cliMode": "cross-env ENV=local playwright test tests-web --config=playwright.config.ts",
    "ui:local:all:guiMode": "cross-env ENV=local playwright test tests-web --config=playwright.config.ts --ui",
    "ui:sit:all:cliMode": "cross-env ENV=sit playwright test tests-web --config=playwright.config.ts",
    "ui:sit:all:guiMode": "cross-env ENV=sit playwright test tests-web --config=playwright.config.ts --ui",
    "ui:uat:all:cliMode": "cross-env ENV=uat playwright test tests-web --config=playwright.config.ts",
    "ui:uat:all:guiMode": "cross-env ENV=uat playwright test tests-web --config=playwright.config.ts --ui",
    "ui:sit:feature1:cliMode": "cross-env ENV=sit playwright test tests-web/feature-1 --config=playwright.config.ts",
    "ui:sit:feature1:guiMode": "cross-env ENV=sit playwright test tests-web/feature-1 --config=playwright.config.ts --ui"
  }
}
```

**Notes:**
- Use `cross-env` for Windows compatibility
- Default environment is `sit` (SIT)
- Config file: `playwright.config.ts`
- Test directory: `tests-web/`
```

---

## 🏷️ Test Naming Conventions

### 🔑 Testcase ID Requirements
**MANDATORY: Every test MUST include [TC-xxxx] in title**
**ID Format: [TC-xxxx] where xxxx = ID from AXONS Test Scenario v2 in Azure DevOps Board**

#### Single Testcase ID
```typescript
// ✅ CORRECT - Single testcase ID (xxxx = AXONS Test Scenario v2 ID)
test('[TC-XXXX] should login with valid credentials', async ({ page }) => {
  // test implementation
});

test('[TC-123456] should display error for invalid email format', async ({ page }) => {
  // test implementation
});
```

#### Multiple Testcase IDs
```typescript
// ✅ CORRECT - Multiple testcase IDs (xxxx, yyyy = AXONS Test Scenario v2 IDs)
test('[TC-XXXX][TC-YYYY] should complete user registration flow', async ({ page }) => {
  // test implementation covering multiple test cases
});

test('[TC-123456][TC-123457][TC-123458] should handle complete checkout process', async ({ page }) => {
  // test implementation
});
```

#### Default Testcase ID Format
**When no specific testcase number is available, use [TC-XXXX] as placeholder**

```typescript
// ✅ CORRECT - Placeholder format (replace XXXX with actual AXONS Test Scenario v2 ID)
test('[TC-XXXX] should login with valid credentials', async ({ page }) => {
  // test implementation
});

test('[TC-XXXX] should display validation error for empty fields', async ({ page }) => {
  // test implementation
});
```

#### 📝 Naming Format Rules
```typescript
// Format: [TC-xxxx] or [TC-xxxx][TC-yyyy]... + descriptive title
// xxxx = AXONS Test Scenario v2 ID from Azure DevOps Board

// ✅ CORRECT Examples
test('[TC-XXXX] should create user with valid data');
test('[TC-YYYY] should return error for invalid email format');
test('[TC-XXXX][TC-YYYY] should update and delete user');
test('[TC-123456] should perform specific test scenario');

// ❌ WRONG Examples - Missing testcase ID or wrong format
test('should create user');              // Missing ID
test('[TC001] should create user');      // Missing hyphen
test('[TCXXXXX] should create user');    // Wrong format
test('user test');                       // Missing ID
```

### 🏷️ Test Describe Naming Conventions

**MANDATORY: Every test.describe MUST include [PBI-xxxx] prefix**

#### Single PBI ID
```typescript
// ✅ CORRECT - Single PBI ID
test.describe('[PBI-1234] User Login Feature', () => {
  // test implementations
});
```

#### Multiple PBI IDs
```typescript
// ✅ CORRECT - Multiple PBI IDs
test.describe('[PBI-1234][PBI-1235] User Registration Flow', () => {
  // test implementations covering multiple PBIs
});
```

#### 📝 Describe Format Rules
```typescript
// Format: [PBI-xxxx] or [PBI-xxxx][PBI-yyyy]... + descriptive title

// ✅ CORRECT Examples
test.describe('[PBI-1234] User Authentication');
test.describe('[PBI-1235] Form Validation');
test.describe('[PBI-1236][PBI-1237] Complete Checkout Process');

// ❌ WRONG Examples - Missing PBI ID
test.describe('User Login Feature');        // Missing PBI ID
test.describe('Login tests');               // Missing PBI ID
test.describe('Authentication module');     // Missing PBI ID
```

## 🔄 Test Generation Workflow

### MANDATORY CONFIRMATION STEPS
**Before generating any test code, MUST follow these steps:**

#### 1️⃣ Requirements Confirmation
```
📋 ยืนยันความต้องการ:
- Feature: [ชื่อ feature]
- Test Type: Web UI Testing
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
tests-web/
├── feature-login/
│   ├── login_success.spec.ts
│   ├── login_failure.spec.ts
│   └── password_reset.spec.ts
└── fixtures/
    └── login-testdata.sit.json
```

#### 4️⃣ Implementation Plan
```
🎯 แผนการทำงาน:
1. สร้างโฟลเดอร์ feature-login/
2. สร้างไฟล์ test 3 ไฟล์
3. เพิ่ม tags: @Feature:Login, @Important:Critical, @Scenario:Success/Alternative
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
- Always use async/await for UI actions
- **MANDATORY: Add @Feature, @Important and @Scenario tags to EVERY test**
- Use Test Case ID format: `[TC-XXXX]`
- Take screenshots for critical steps
- Use specific locators (priority: getByTestId > getByRole > getByText > CSS > XPath)
- Wait for elements properly
- Follow AAA pattern (Arrange, Act, Assert)
- Ask before modifying files
- Skip obsoleted tests with comments

### ❌ DON'Ts
- Write code without confirmation
- Translate CSV content
- Use generic locators
- Skip element waiting
- Forget testcase IDs format `[TC-XXXX]`
- **NEVER skip @Feature, @Important and @Scenario tags**
- Use unclear variable names
- Click without waiting for elements

---

## ✍️ How to Write UI Tests

### 🏗️ Basic UI Test Structure
```typescript
// @Important: Critical | High | Medium | Low
// @Scenario: Success | Alternative
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/login');
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC001] should perform specific UI action', async ({ page }) => {
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

### 🖥️ UI Test Template with Screenshots
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

### 🎭 UI Interaction Patterns
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

### 🔍 UI Verification Patterns
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

---

## 🏷️ Code Generation Tags

### 📝 Tag Requirements
**MANDATORY: All generated code MUST include both Important and Scenario tags**

#### Tag Format
```typescript
// @Important: Critical | High | Medium | Low
// @Scenario: Success | Alternative
```

#### 📊 Important Levels
- **Critical**: Core UI functionality (login, navigation, forms)
- **High**: Important UI features (validation, error handling, responsive)
- **Medium**: Nice-to-have UI features (animations, tooltips)
- **Low**: Optional UI features (themes, preferences)

#### 🎯 Scenario Types
- **Success**: Happy path UI flows, expected behavior
- **Alternative**: Error cases, edge cases, validation failures

### 📝 UI Test Examples with Tags
```typescript
// @Important: Critical
// @Scenario: Success
test('[TC001] should login with valid credentials', async ({ page }) => {
  // Critical UI functionality - login form is essential
  await page.goto('/login');
  await page.fill('#email', 'user@test.com');
  await page.fill('#password', 'password123');
  await page.click('#login-btn');
  await expect(page).toHaveURL('/dashboard');
});

// @Important: High  
// @Scenario: Alternative
test('[TC002] should display validation error for empty fields', async ({ page }) => {
  // Important UI validation testing
  await page.goto('/login');
  await page.click('#login-btn');
  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toHaveText('Email is required');
});
```

---

## 🚀 UI Test Generation Workflow

### 🚨 MANDATORY CONFIRMATION STEPS - ห้ามข้าม

#### **STEP 1: Requirements Confirmation**
```
📋 ยืนยันความต้องการ:
- Feature: [ระบุ feature]
- Test Type: UI
- Source: [ระบุไฟล์ CSV/MCP Server Name]
```

#### **STEP 1.5: Testcase List (MCP Only)**
**เฉพาะเมื่อใช้ MCP Tool เท่านั้น**
```
🔍 ลิสต์เทสเคสจาก Azure DevOps:
[แสดงรายการ child work items พร้อม ID และ Title]

📊 สรุปจำนวน:
- UI Tests: [จำนวน] cases
- รวม: [จำนวนทั้งหมด] test cases

✅ ยืนยันเทสเคส? (Y/N)
```

#### **STEP 2: Folder Structure Preview**
```
📁 โครงสร้างที่จะสร้าง testcase:
tests-web/
└── [feature]/
    └── [test-file].spec.ts

📁 โครงสร้างที่จะสร้าง data:
fixtures/
├── testdata.sit.json
├── testdata.local.json
└── testdata.uat.json
```

#### **STEP 3: Implementation Plan**
```
🎯 แผนการสร้าง UI Tests:
1. สร้างไฟล์ test spec ใน tests-web/[feature]/
2. สร้าง Page Objects ใน pages/ (ถ้าจำเป็น)
3. สร้างไฟล์ test data ใน fixtures/
4. อัพเดท package.json scripts

🏷️ Tags ที่จะใช้:
- @Important: [Critical/High/Medium/Low]
- @Scenario: [Success/Alternative]

✅ ยืนยันแผน? (Y/N)
```

### 🚦 ABSOLUTE RESTRICTIONS

1. **🚫 NO CODE WITHOUT CONFIRMATION** - ห้ามเขียนโค้ดก่อนได้รับการยืนยัน
2. **⏳ WAIT FOR USER APPROVAL** - รอ "Y" หรือ "ยืนยัน" จากผู้ใช้
3. **❓ ASK IF UNCLEAR** - ถ้าไม่แน่ใจ ต้องถาม
4. **📄 FOLLOW CSV ORDER** - ต้องเรียงตาม CSV เสมอ
5. **🌍 PRESERVE LANGUAGE** - ห้ามแปลภาษาใน CSV

---

## 📦 Package.json Scripts for UI Tests

### 🎯 UI Script Format Standard
```
ui:[environment]:[feature]:[mode]
```

### ✅ UI Script Examples
```json
{
  "scripts": {
    "ui:local:feature1:cliMode": "cross-env ENV=local playwright test tests-web/feature-1 --config=playwright.config.ts",
    "ui:local:feature1:guiMode": "cross-env ENV=local playwright test tests-web/feature-1 --config=playwright.config.ts --ui",
    "ui:sit:feature1:cliMode": "cross-env ENV=sit playwright test tests-web/feature-1 --config=playwright.config.ts",
    "ui:sit:feature1:guiMode": "cross-env ENV=sit playwright test tests-web/feature-1 --config=playwright.config.ts --ui",
    "ui:uat:feature1:cliMode": "cross-env ENV=uat playwright test tests-web/feature-1 --config=playwright.config.ts",
    "ui:uat:feature1:guiMode": "cross-env ENV=uat playwright test tests-web/feature-1 --config=playwright.config.ts --ui"
  }
}
```

---

## 📚 Quick Reference

### ✅ DO's
- Always use async/await for UI actions
- Include [testcase id] in test names
- **MANDATORY: Add @Important and @Scenario tags to EVERY test**
- Take screenshots for critical steps
- Use specific locators
- Wait for elements properly
- Follow AAA pattern (Arrange, Act, Assert)
- Ask before modifying files

### ❌ DON'Ts
- Write code without confirmation
- Translate CSV content
- Use generic locators
- Skip element waiting
- Forget testcase IDs
- **NEVER skip @Important and @Scenario tags**
- Use unclear variable names
- Click without waiting for elements

### 🎯 UI Testing Best Practices
- **Locator Strategy**: Use data-testid > id > class > text
- **Wait Strategy**: Always wait for elements before interaction
- **Screenshot Strategy**: Capture before/after critical actions
- **Assertion Strategy**: Verify both visibility and content
- **Error Handling**: Test both success and failure scenarios

### 📞 Emergency Contacts
- **File Issues**: Always ask before modifying
- **Language Issues**: Never translate without approval
- **CSV Issues**: Preserve original order and content
- **Unclear Requirements**: Ask for clarification
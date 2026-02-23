# AI Instructions

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
ฉันจะแก้ไขไฟล์ package.json เพื่อเพิ่ม script ใหม่สำหรับรัน tests
คุณต้องการให้ฉันดำเนินการไหม?
```

---

## 📁 Project Structure

```
api-testing/
├── 📂 tests-api/                   # Test files organized by features
│   ├── feature-1/                  # Feature 1: User & Post APIs
│   ├── feature-2/                  # Feature 2: Schema validation
│   ├── feature-3/                  # Feature 3: Comments & Env-specific
│   └── tagged-tests.spec.ts        # Smoke & Regression tests
├── 📂 helpers/                     # API helpers and utilities
│   ├── api.helper.ts               # API request wrapper
│   ├── schema.validator.ts         # JSON schema validator
│   ├── env.helper.ts               # Environment config loader
│   └── databaseHelper.ts           # Database operations
├── 📂 schemas/                     # JSON schema definitions
│   └── api.schema.ts               # API response schemas
├── 📂 fixtures/                    # Test data per environment
│   ├── test-data.ts                # SIT test data (default)
│   ├── test-data.local.ts          # Local test data
│   └── test-data.uat.ts            # UAT test data
├── 📂 postman/                     # Postman collection integration
│   ├── collection.json             # Postman collection
│   ├── environment.sit.json        # SIT environment
│   └── environment.uat.json        # UAT environment
├── 📂 db-scripts/                  # Database setup scripts
│   ├── setup.local.sql             # Local data setup
│   ├── setup.sit.sql               # SIT data setup
│   ├── setup.uat.sql               # UAT data setup
│   └── cleanup.sql                 # Cleanup script
├── 📂 pipelines/                   # CI/CD pipeline configs
│   └── api-pipeline.yaml           # Azure DevOps pipeline
├── 📂 playwright-report/           # Test execution reports
│   └── index.html                  # Latest test report
├── 📂 test-results/                # Test artifacts & logs
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
test('[TC-XXXX] should get user successfully', async ({ request }) => {
  const response = await request.get('/api/users/1');
  expect(response.status()).toBe(200);
});

// ❌ WRONG - Missing async/await
test('[TC-XXXX] should get user', ({ request }) => {
  request.get('/api/users/1'); // Will fail!
});
```

### 2. 🏷️ Naming Conventions
```typescript
// ✅ CORRECT - Descriptive names
const apiEndpoint = '/api/users';
const userEmail = 'test@example.com';
const requestBody = { name: 'John', email: userEmail };

// ❌ WRONG - Unclear names
const url = '/api/users';
const email = 'test@example.com';
const data = { name: 'John', email: email };
```

### 3. 📁 File and Folder Naming
**File Names**: lowerCamelCase (e.g., `userApi.spec.ts`)
**Folder Names**: Keep existing format (e.g., `feature-1/`, `feature-2/`)

```typescript
// ✅ CORRECT - lowerCamelCase for file names
userApi.spec.ts
apiAuthentication.spec.ts
testDataValidation.spec.ts
schemaValidation.spec.ts

// ✅ CORRECT - Folder names (keep existing format)
feature-1/
feature-2/
feature-3/
user-management/
api-endpoints/

// ❌ WRONG - File naming conventions
UserApi.spec.ts            // PascalCase
user_api.spec.ts           // snake_case
user-api.spec.ts           // kebab-case
User Api.spec.ts           // spaces
```

### 4. 🏗️ Test Structure (AAA Pattern)
```typescript
test('[TC-XXXX] should return error for invalid user', async ({ request }) => {
  // 📝 Arrange - Setup test data
  const invalidUserId = 99999;
  
  // 🎬 Act - Perform API call
  const response = await request.get(`/api/users/${invalidUserId}`);
  
  // ✅ Assert - Verify results
  expect(response.status()).toBe(404);
  const responseBody = await response.json();
  expect(responseBody.error).toBe('User not found');
});
```

### 5. 🔍 Assertions Best Practices
```typescript
// ✅ CORRECT - Specific assertions
expect(response.status()).toBe(200);
expect(responseBody.email).toBe('test@example.com');
expect(responseBody).toHaveProperty('id');

// ❌ WRONG - Generic assertions
expect(response.ok()).toBeTruthy();
expect(responseBody).toBeDefined();
```

### 6. 📦 Import Organization
```typescript
// ✅ CORRECT - Organized imports
import { test, expect } from '@playwright/test';
import { apiHelper } from '../helpers/api.helper';
import { validateSchema } from '../helpers/schema.validator';
import userData from '../fixtures/test-data';
```

---

## 🏷️ Test Naming Conventions

### 🔑 Testcase ID Requirements
**MANDATORY: Every test MUST include [testcase id] in title**
**ID Format: [TC-XXXX] where XXXX = ID from AXONS Test Scenario v2 in Azure DevOps Board**

#### Single Testcase ID
```typescript
// ✅ CORRECT - Single testcase ID (XXXX = Azure DevOps Test Scenario ID)
test('[TC-XXXX] should get user by id successfully', async ({ request }) => {
  // test implementation
});

test('[TC-123456] should return error for invalid user id', async ({ request }) => {
  // test implementation
});
```

#### Multiple Testcase IDs
```typescript
// ✅ CORRECT - Multiple testcase IDs (XXXX, YYYY = Azure DevOps Test Scenario IDs)
test('[TC-XXXX][TC-YYYY] should create and verify user', async ({ request }) => {
  // test implementation covering multiple test cases
});

test('[TC-123456][TC-123457][TC-123458] should handle complete user lifecycle', async ({ request }) => {
  // test implementation
});
```

#### Default Testcase ID Format
**When no specific testcase number is available, use [TC-XXXX] as placeholder**

```typescript
// ✅ CORRECT - Placeholder format (replace XXXX with actual Azure DevOps ID)
test('[TC-XXXX] should get all users successfully', async ({ request }) => {
  // test implementation
});

test('[TC-XXXX] should validate response schema', async ({ request }) => {
  // test implementation
});
```

#### 📝 Naming Format Rules
```typescript
// Format: [TC-XXXX] or [TC-XXXX][TC-YYYY]... + descriptive title
// XXXX = AXONS Test Scenario v2 ID from Azure DevOps Board

// ✅ CORRECT Examples
test('[TC-XXXX] should create user with valid data');
test('[TC-YYYY] should return 400 for invalid email format');
test('[TC-XXXX][TC-YYYY] should update and delete user');
test('[TC-123456] should perform specific test scenario');

// ❌ WRONG Examples - Missing testcase ID or wrong format
test('should create user');              // Missing ID
test('[TC001] should create user');      // Missing hyphen
test('[TCXXXXX] should create user');    // Wrong format
test('user api test');                   // Missing ID
```

### 🏷️ Test Describe Naming Conventions

**MANDATORY: Every test.describe MUST include [PBI-xxxx] prefix**

#### Single PBI ID
```typescript
// ✅ CORRECT - Single PBI ID
test.describe('[PBI-1234] User API', () => {
  // test implementations
});
```

#### Multiple PBI IDs
```typescript
// ✅ CORRECT - Multiple PBI IDs
test.describe('[PBI-1234][PBI-1235] User Management API', () => {
  // test implementations covering multiple PBIs
});
```

#### 📝 Describe Format Rules
```typescript
// Format: [PBI-xxxx] or [PBI-xxxx][PBI-yyyy]... + descriptive title

// ✅ CORRECT Examples
test.describe('[PBI-1234] User API Endpoints');
test.describe('[PBI-1235] Authentication API');
test.describe('[PBI-1236][PBI-1237] Payment API Flow');

// ❌ WRONG Examples - Missing PBI ID
test.describe('User API');                  // Missing PBI ID
test.describe('API tests');                 // Missing PBI ID
test.describe('Authentication endpoints');  // Missing PBI ID
```

---

## ✍️ How to Write API Tests

### 🔌 API Test Template with Request/Response Logging

**MANDATORY: All API tests MUST log request and response messages**

#### 📝 Standard API Test Template
```typescript
test.describe('[PBI-1234] User API', () => {
  // @Important: Critical
  // @Scenario: Success
  test('[TC-XXXX] should create user successfully', async ({ request }) => {
    // 📝 Arrange
    const url = '/api/users';
    const headers = { 'Content-Type': 'application/json' };
    const requestBody = { name: 'John Doe', email: 'john@example.com' };
    
    // 📝 MANDATORY: Log Request
    console.log('=== REQUEST LOG ===');
    console.log('Method:', 'POST');
    console.log('URL:', url);
    console.log('Headers:', headers);
    console.log('Body:', requestBody);
    
    // 🎬 Act
    const response = await request.post(url, { 
      headers: headers,
      data: requestBody 
    });
    
    // 📝 MANDATORY: Log Response
    const responseBody = await response.json();
    console.log('=== RESPONSE LOG ===');
    console.log('Status:', response.status());
    console.log('Body:', responseBody);
    
    // ✅ Assert
    expect(response.status()).toBe(201);
    expect(responseBody.name).toBe(requestBody.name);
  });
});
```

#### 📊 Complete API Logging Template (All HTTP Methods)

**POST Request:**
```typescript
// @Important: Critical
// @Scenario: Success
test('[TC-XXXX] POST request with logging', async ({ request }) => {
  // Log Request
  console.log('=== REQUEST LOG ===');
  console.log('Method:', 'POST');
  console.log('URL:', url);
  console.log('Headers:', headers);
  console.log('Body:', requestBody);
  
  // Make API call
  const response = await request.post(url, { data: requestBody });
  
  // Log Response
  const responseBody = await response.json();
  console.log('=== RESPONSE LOG ===');
  console.log('Status:', response.status());
  console.log('Body:', responseBody);
  
  // Assertions
  expect(response.status()).toBe(201);
});
```

**GET Request:**
```typescript
// @Important: High
// @Scenario: Success
test('[TC-YYYY] GET request with logging', async ({ request }) => {
  // Log Request
  console.log('=== REQUEST LOG ===');
  console.log('Method:', 'GET');
  console.log('URL:', url);
  console.log('Headers:', headers);
  
  // Make API call
  const response = await request.get(url);
  
  // Log Response
  const responseBody = await response.json();
  console.log('=== RESPONSE LOG ===');
  console.log('Status:', response.status());
  console.log('Body:', responseBody);
  
  // Assertions
  expect(response.status()).toBe(200);
});
```

**PUT Request:**
```typescript
// @Important: High
// @Scenario: Success
test('[TC-ZZZZ] PUT request with logging', async ({ request }) => {
  // Log Request
  console.log('=== REQUEST LOG ===');
  console.log('Method:', 'PUT');
  console.log('URL:', url);
  console.log('Headers:', headers);
  console.log('Body:', requestBody);
  
  // Make API call
  const response = await request.put(url, { data: requestBody });
  
  // Log Response
  const responseBody = await response.json();
  console.log('=== RESPONSE LOG ===');
  console.log('Status:', response.status());
  console.log('Body:', responseBody);
  
  // Assertions
  expect(response.status()).toBe(200);
});
```

**DELETE Request:**
```typescript
// @Important: High
// @Scenario: Success
test('[TC-AAAA] DELETE request with logging', async ({ request }) => {
  // Log Request
  console.log('=== REQUEST LOG ===');
  console.log('Method:', 'DELETE');
  console.log('URL:', url);
  console.log('Headers:', headers);
  
  // Make API call
  const response = await request.delete(url);
  
  // Log Response
  console.log('=== RESPONSE LOG ===');
  console.log('Status:', response.status());
  
  // Assertions
  expect(response.status()).toBe(204);
});
```

#### 🎯 Logging Best Practices

**1. Always log BEFORE making the request:**
```typescript
// ✅ CORRECT
console.log('=== REQUEST LOG ===');
console.log('Method:', 'POST');
const response = await request.post(url, { data });

// ❌ WRONG - Logging after request
const response = await request.post(url, { data });
console.log('=== REQUEST LOG ===');
```

**2. Always log response body:**
```typescript
// ✅ CORRECT - Parse and log response
const responseBody = await response.json();
console.log('Body:', responseBody);

// ❌ WRONG - Not logging response body
console.log('Status:', response.status());
```

**3. Include all relevant information:**
```typescript
// ✅ CORRECT - Complete logging
console.log('=== REQUEST LOG ===');
console.log('Method:', 'POST');
console.log('URL:', url);
console.log('Headers:', headers);
console.log('Body:', requestBody);

// ❌ WRONG - Incomplete logging
console.log('Making request...');
```

---

## 🏷️ Code Generation Tags

### 📝 Tag Requirements
**MANDATORY: All generated code MUST include both Important level and Scenario tags**

#### Tag Format
```typescript
// @Important: Critical | High | Medium | Low
// @Scenario: Success | Alternative
```

#### 📊 Important Levels
- **Critical**: Core functionality (login, payment, security)
- **High**: Important features (validation, error handling)
- **Medium**: Nice-to-have features (preferences, UI enhancements)
- **Low**: Optional features (cosmetic, convenience)

#### 🎯 Scenario Types
- **Success**: Happy path, expected behavior
- **Alternative**: Error cases, edge cases, validation

### 📝 Test Examples with Tags
```typescript
// @Important: Critical
// @Scenario: Success
test('[TC-XXXX] should login with valid credentials', async ({ page }) => {
  // Critical functionality - login is essential
  await page.goto('/login');
  await page.fill('#email', 'user@test.com');
  await page.click('#login-btn');
  await expect(page).toHaveURL('/dashboard');
});

// @Important: High  
// @Scenario: Alternative
test('[TC-YYYY] should display validation error for empty fields', async ({ page }) => {
  // Important validation testing
  await page.goto('/login');
  await page.click('#login-btn');
  await expect(page.locator('.error')).toBeVisible();
});
```

---

## 🚀 Test Generation Workflow

### 🚨 MANDATORY CONFIRMATION STEPS - ห้ามข้าม

#### **STEP 1: Requirements Confirmation**
```
📋 ยืนยันความต้องการ:
- Feature: [ระบุ feature]
- Test Type: [API/UI/E2E]
- Source: [ระบุไฟล์ CSV/MCP Server Name]
```

#### **STEP 1.5: Testcase List (MCP Only)**
**เฉพาะเมื่อใช้ MCP Tool เท่านั้น**
```
🔍 ลิสต์เทสเคสจาก Azure DevOps:
[แสดงรายการ child work items พร้อม ID และ Title]

📊 สรุปจำนวน:
- UI Tests: [จำนวน] cases
- API Tests: [จำนวน] cases  
- รวม: [จำนวนทั้งหมด] test cases

✅ ยืนยันเทสเคส? (Y/N)
```

#### **STEP 2: Folder Structure Preview**
```
📁 โครงสร้างที่จะสร้าง testcase:
[แสดงโครงสร้างโฟลเดอร์และไฟล์]
📁 โครงสร้างที่จะสร้าง data:
[แสดงโครงสร้างโฟลเดอร์และไฟล์]
```

#### **STEP 3: Implementation Plan**
```
🎯 แผนการสร้าง:
1. [ขั้นตอนที่ 1]
2. [ขั้นตอนที่ 2] 
3. [ขั้นตอนที่ 3]

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

## 📦 Package.json Scripts Generation Instructions

### 🎯 Script Format Standard
**MANDATORY: All generated scripts MUST follow this exact format:**

```
api:[environment]:[feature]:[mode]
```

#### 📝 Format Components
1. **type**: `api` (fixed)
2. **environment**: `local` | `sit` | `uat`
3. **feature**: `sprint1` | `sprint2` | `sprint3` | `feature1` | `feature2` | etc.
4. **mode**: `cliMode` | `guiMode`

### ✅ Correct Script Examples
```json
{
  "scripts": {
    "api:local:sprint1:cliMode": "ENV=local playwright test tests-api/sprint_1 --config=playwright.config.ts",
    "api:local:sprint1:guiMode": "ENV=local playwright test tests-api/sprint_1 --config=playwright.config.ts --ui",
    "api:sit:sprint1:cliMode": "ENV=sit playwright test tests-api/sprint_1 --config=playwright.config.ts",
    "api:sit:sprint1:guiMode": "ENV=sit playwright test tests-api/sprint_1 --config=playwright.config.ts --ui",
    "api:uat:sprint2:cliMode": "ENV=uat playwright test tests-api/sprint_2 --config=playwright.config.ts",
    "api:uat:sprint2:guiMode": "ENV=uat playwright test tests-api/sprint_2 --config=playwright.config.ts --ui"
  }
}
```

### 🏗️ Script Generation Rules

#### **1. Configuration File**
```bash
# API Tests - Always use this config
--config=playwright.config.ts
```

#### **2. Environment Variables**
```bash
# Local Environment
ENV=local

# SIT Environment (default)
ENV=sit

# UAT Environment
ENV=uat
```

#### **3. Test Directory Mapping**
```bash
# API Tests
tests-api/[feature]/
```

#### **4. Mode Options**
```bash
# CLI Mode (default)
playwright test [options]

# GUI Mode (interactive)
playwright test [options] --ui
```

### 📋 Generation Template

**When generating scripts, use this template:**

```json
"api:[env]:[feature]:[mode]": "ENV=[env] playwright test tests-api/[feature] --config=playwright.config.ts[--ui]"
```

**Template Variables:**
- `[env]` → `local` or `sit` or `uat`
- `[feature]` → `sprint_1`, `sprint_2`, `sprint_3`, etc.
- `[mode]` → `cliMode` or `guiMode`
- `[--ui]` → add `--ui` only for guiMode

### 🚨 Generation Rules

#### **MANDATORY Requirements:**
1. **Always generate ALL environments** (local + sit + uat)
2. **Always generate BOTH modes** (cliMode + guiMode)
3. **Follow exact naming format** - no variations
4. **Use correct config file**: `playwright.config.ts`
5. **Include ENV variable** in every script

#### **Example Complete Generation:**
```json
{
  "api:local:sprint1:cliMode": "ENV=local playwright test tests-api/sprint_1 --config=playwright.config.ts",
  "api:local:sprint1:guiMode": "ENV=local playwright test tests-api/sprint_1 --config=playwright.config.ts --ui",
  "api:sit:sprint1:cliMode": "ENV=sit playwright test tests-api/sprint_1 --config=playwright.config.ts",
  "api:sit:sprint1:guiMode": "ENV=sit playwright test tests-api/sprint_1 --config=playwright.config.ts --ui",
  "api:uat:sprint1:cliMode": "ENV=uat playwright test tests-api/sprint_1 --config=playwright.config.ts",
  "api:uat:sprint1:guiMode": "ENV=uat playwright test tests-api/sprint_1 --config=playwright.config.ts --ui"
}
```

### ❌ Common Mistakes to Avoid

```json
// ❌ WRONG - Missing environment
"api:sprint1:cliMode": "playwright test..."

// ❌ WRONG - Wrong separator
"api_sit_sprint1_cliMode": "ENV=sit..."

// ❌ WRONG - Missing ENV variable
"api:sit:sprint1:cliMode": "playwright test..."

// ❌ WRONG - Wrong config file
"api:sit:sprint1:cliMode": "ENV=sit playwright test --config=playwright.config.api.ts"
```

### 🎯 Usage Examples

```bash
# Run API tests in Local environment (CLI mode)
npm run api:local:sprint_1:cliMode

# Run API tests in SIT environment (CLI mode)
npm run api:sit:sprint_1:cliMode

# Run API tests in UAT environment (GUI mode)
npm run api:uat:sprint_2:guiMode

# Run specific feature tests
npm run api:local:feature1:cliMode
npm run api:sit:feature1:cliMode
npm run api:uat:feature2:guiMode
```

---

## 📚 Quick Reference

### ✅ DO's
- Always use async/await with `request` fixture
- Include [testcase id] in test names
- **MANDATORY: Add @Important and @Scenario tags to EVERY test**
- **MANDATORY: Log API requests/responses**
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive variable names for API endpoints and data
- Validate response status codes and body
- Ask before modifying files

### ❌ DON'Ts
- Write code without confirmation
- Translate CSV content
- Use generic assertions
- **NEVER skip request/response logging**
- Forget testcase IDs
- **NEVER skip @Important and @Scenario tags**
- Use `page` fixture (that's for UI testing)
- Skip schema validation for critical APIs

### 📞 Emergency Contacts
- **File Issues**: Always ask before modifying
- **Language Issues**: Never translate without approval
- **CSV Issues**: Preserve original order and content
- **Unclear Requirements**: Ask for clarification
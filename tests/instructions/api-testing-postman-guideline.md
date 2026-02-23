# AI Instructions - Postman API Testing (v2.1)

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
ฉันจะสร้างไฟล์ Postman collection และ environment สำหรับ API testing
คุณต้องการให้ฉันดำเนินการไหม?
```

---

## 📁 Project Structure

```
api-testing/
└── 📂 postman/                     # ⚠️ Postman collections ONLY
    ├── feature-1/                  # Feature 1 collections
    │   ├── collection.json          # Main API collection
    │   ├── sit_environment.json     # SIT environment variables
    │   └── uat_environment.json     # UAT environment variables
    ├── feature-2/                  # Feature 2 collections
    │   ├── collection.json
    │   ├── sit_environment.json
    │   └── uat_environment.json
    └── feature-3/                  # Feature 3 collections
        ├── collection.json
        ├── sit_environment.json
        └── uat_environment.json
```

**⚠️ IMPORTANT NOTE:**
- **This guideline is for Postman API Testing ONLY**
- **Postman collections are stored in `api-testing/postman/` folder**
- **Each feature has its own folder with collection and environment files**
- **For Playwright API testing, refer to `playwright-api-testing-guideline.md`**

---

## 📝 Postman Standards (API Testing Standard Guideline)

### 1. 🌍 Environment Naming Convention
**MANDATORY: Use environment variables for different environments**

#### Environment Naming Format:
```
ProjectName-ENV-Env
```

#### Examples:
- `ProjectName-LOCAL-Env`
- `ProjectName-SIT-Env` 
- `ProjectName-UAT-Env`

### 2. 🏗️ Collection & Folder Structure
**MANDATORY: Follow hierarchical structure for organization**

#### Structure Levels:
1. **Collection**: Product Name + Azure Number + Product Description
2. **Folder Level 1**: Feature + Azure Number + Feature Description
3. **Folder Level 2**: Azure Number + TestCase/TestScenario Description
4. **Request**: StepNumber + Request Name

#### Example Structure:
```json
{
  "info": {
    "name": "ProductName-12345-Product Description",
    "description": "API Collection for ProductName",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Feature1-67890-User Authentication",
      "item": [
        {
          "name": "TC-001-Login Test Scenario",
          "item": [
            {
              "name": "Step1-User Login Request",
              "request": {
                "method": "POST",
                "header": [
                  {
                    "key": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "body": {
                  "mode": "raw",
                  "raw": "{\n  \"email\": \"{{user_email}}\",\n  \"password\": \"{{user_password}}\"\n}",
                  "options": {
                    "raw": {
                      "language": "json"
                    }
                  }
                },
                "url": {
                  "raw": "{{base_url}}/api/auth/login",
                  "host": ["{{base_url}}"],
                  "path": ["api", "auth", "login"]
                }
              },
              "event": [
                {
                  "listen": "test",
                  "script": {
                    "type": "text/javascript",
                    "exec": [
                      "pm.test('Status code is 200', function () {",
                      "    pm.response.to.have.status(200);",
                      "});"
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### 3. 🌍 Environment Structure
```json
{
  "name": "ProjectName-SIT-Env",
  "values": [
    {
      "key": "base_url",
      "value": "https://api-sit.example.com",
      "enabled": true
    },
    {
      "key": "user_email",
      "value": "test@sit.com",
      "enabled": true
    },
    {
      "key": "user_password",
      "value": "password123",
      "enabled": true
    },
    {
      "key": "access_token",
      "value": "",
      "enabled": true
    }
  ]
}
```

### 4. 🏷️ Request Naming Conventions
**MANDATORY: Every request MUST include [TC-xxxx] in name**
**ID Format: [TC-xxxx] where xxxx = ID from AXONS Test Scenario v2 in Azure DevOps Board**

```json
// ✅ CORRECT - Include testcase ID from AXONS Test Scenario v2
{
  "name": "[TC-123456] User Login - Valid Credentials"
}
{
  "name": "[TC-123457] User Login - Invalid Email Format"
}
{
  "name": "[TC-123458][TC-123459] Complete Registration Flow"
}

// ❌ WRONG - Missing testcase ID
{
  "name": "User Login"
}
{
  "name": "Login Test"
}
```

---

## 🏷️ Test Naming Conventions

### 🔑 Testcase ID Requirements
**MANDATORY: Every request MUST include [TC-xxxx] in name**
**ID Format: [TC-xxxx] where xxxx = ID from AXONS Test Scenario v2 in Azure DevOps Board**

#### Single Testcase ID
```json
{
  "name": "[TC-123456] should login with valid credentials"
}
```

#### Multiple Testcase IDs
```json
{
  "name": "[TC-123456][TC-123457] should complete user registration flow"
}
```

---

## ✍️ How to Generate Collections

### 🏗️ Basic Collection Template
```json
{
  "info": {
    "name": "{{collection_name}}",
    "description": "{{collection_description}}",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [],
  "event": [
    {
      "listen": "prerequest",
      "script": {
        "type": "text/javascript",
        "exec": [
          "// Pre-request script for all requests"
        ]
      }
    },
    {
      "listen": "test",
      "script": {
        "type": "text/javascript",
        "exec": [
          "// Test script for all requests",
          "pm.test('Status code is 200', function () {",
          "    pm.response.to.have.status(200);",
          "});"
        ]
      }
    }
  ]
}
```

### 🔌 API Request Template with Mandatory Tests
```json
{
  "name": "Step{{step_number}}-{{request_name}}",
  "request": {
    "method": "{{http_method}}",
    "header": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{access_token}}"
      }
    ],
    "body": {
      "mode": "raw",
      "raw": "{{request_body}}",
      "options": {
        "raw": {
          "language": "json"
        }
      }
    },
    "url": {
      "raw": "{{base_url}}/{{endpoint}}",
      "host": ["{{base_url}}"],
      "path": ["{{endpoint_path}}"]
    }
  },
  "event": [
    {
      "listen": "test",
      "script": {
        "type": "text/javascript",
        "exec": [
          "// MANDATORY: Status code validation",
          "pm.test('Status code is {{expected_status}}', function () {",
          "    pm.response.to.have.status({{expected_status}});",
          "});",
          "",
          "// OPTIONAL: Response schema validation",
          "pm.test('Response has required fields', function () {",
          "    const responseJson = pm.response.json();",
          "    pm.expect(responseJson).to.have.property('{{required_field}}');",
          "});"
        ]
      }
    }
  ]
}
```

### 5. 🧪 Mandatory Test Scripts
**CRITICAL: MUST write tests to check response status codes**

#### Status Code Test Examples:
```javascript
// Success responses
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

// Error responses
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});
```

### 6. 📋 Response Schema Validation (Nice to Have)
```javascript
// Schema validation example
pm.test("Response schema is valid", function () {
    const schema = {
        "type": "object",
        "properties": {
            "id": { "type": "number" },
            "name": { "type": "string" },
            "email": { "type": "string" }
        },
        "required": ["id", "name", "email"]
    };
    
    pm.response.to.have.jsonSchema(schema);
});
```

---

## 🏷️ Code Generation Tags

### 📝 Tag Requirements
**MANDATORY: All generated collections MUST include Important and scenario metadata**

#### Collection Metadata
```json
{
  "info": {
    "name": "Feature 1 API Collection",
    "description": "API tests for Feature 1",
    "_postman_meta": {
      "Important": "Critical",
      "scenario": "Success",
      "environment": ["SIT", "UAT"]
    }
  }
}
```

#### 📊 Important Levels
- **Critical**: Core functionality (login, payment, security)
- **High**: Important features (validation, error handling)
- **Medium**: Nice-to-have features (preferences, enhancements)
- **Low**: Optional features (cosmetic, convenience)

#### 🎯 Scenario Types
- **Success**: Happy path, expected behavior
- **Alternative**: Error cases, edge cases, validation

---

## 🚀 Collection Generation Workflow

### 🚨 MANDATORY CONFIRMATION STEPS - ห้ามข้าม

#### **STEP 1: Requirements Confirmation**
```
📋 ยืนยันความต้องการ:
- Feature: [ระบุ feature]
- Collection Type: Postman API Collection
- Source: [ระบุไฟล์ CSV/MCP Server Name]
- Environments: [SIT, UAT]
```

#### **STEP 1.5: Testcase List (MCP Only)**
**เฉพาะเมื่อใช้ MCP Tool เท่านั้น**
```
🔍 ลิสต์เทสเคสจาก Azure DevOps:
[แสดงรายการ child work items พร้อม ID และ Title]

📊 สรุปจำนวน:
- API Requests: [จำนวน] requests
- รวม: [จำนวนทั้งหมด] test cases

✅ ยืนยันเทสเคส? (Y/N)
```

#### **STEP 2: Collection Structure Preview**
```
📁 โครงสร้างที่จะสร้าง:
api-testing/
└── postman/                      # ⚠️ Postman files ONLY in this folder
    └── [feature]/
        ├── collection.json
        ├── sit_environment.json
        └── uat_environment.json

✅ ยืนยันโครงสร้าง? (Y/N)
```

#### **STEP 3: Implementation Plan**
```
🎯 แผนการสร้าง:
1. สร้าง Postman collection จาก testcase
2. สร้าง SIT environment variables
3. สร้าง UAT environment variables
4. เพิ่ม test scripts และ assertions

✅ ยืนยันแผน? (Y/N)
```

### 🚦 ABSOLUTE RESTRICTIONS

1. **🚫 NO FILES WITHOUT CONFIRMATION** - ห้ามสร้างไฟล์ก่อนได้รับการยืนยัน
2. **⏳ WAIT FOR USER APPROVAL** - รอ "Y" หรือ "ยืนยัน" จากผู้ใช้
3. **❓ ASK IF UNCLEAR** - ถ้าไม่แน่ใจ ต้องถาม
4. **📄 FOLLOW CSV ORDER** - ต้องเรียงตาม CSV เสมอ
5. **🌍 PRESERVE LANGUAGE** - ห้ามแปลภาษาใน CSV

---

## 📦 Environment Variables Standard

### 🎯 Environment Format Standard
**MANDATORY: All environments MUST follow this structure:**

#### SIT Environment Template
```json
{
  "name": "ProjectName-SIT-Env",
  "values": [
    {
      "key": "base_url",
      "value": "https://api-sit.example.com",
      "enabled": true
    },
    {
      "key": "auth_url",
      "value": "https://auth-sit.example.com",
      "enabled": true
    },
    {
      "key": "user_email",
      "value": "test@sit.com",
      "enabled": true
    },
    {
      "key": "user_password",
      "value": "sit_password123",
      "enabled": true
    },
    {
      "key": "access_token",
      "value": "",
      "enabled": true
    }
  ]
}
```

#### UAT Environment Template
```json
{
  "name": "ProjectName-UAT-Env",
  "values": [
    {
      "key": "base_url",
      "value": "https://api-uat.example.com",
      "enabled": true
    },
    {
      "key": "auth_url",
      "value": "https://auth-uat.example.com",
      "enabled": true
    },
    {
      "key": "user_email",
      "value": "test@uat.com",
      "enabled": true
    },
    {
      "key": "user_password",
      "value": "uat_password123",
      "enabled": true
    },
    {
      "key": "access_token",
      "value": "",
      "enabled": true
    }
  ]
}
```

---

## 📚 Quick Reference

### ✅ DO's
- Follow API Testing Standard Guideline structure
- Use ProjectName-ENV-Env naming for environments
- Create hierarchical folder structure (Collection > Sprint > TestCase > Request)
- Name requests as StepNumber + Request Name
- **MANDATORY: Include [TC-xxxx] from AXONS Test Scenario v2**
- MUST write status code validation tests (200, 201, 400, 404)
- Use environment variables for all dynamic values
- Add response schema validation (nice to have)
- Ask before creating files
- Follow JSON schema v2.1.0 standards

### ❌ DON'Ts
- Create files without confirmation
- Translate CSV content
- Use hardcoded values instead of variables
- Skip mandatory status code tests
- Use flat structure without proper folders
- Ignore environment naming convention
- Use unclear request names without step numbers
- **Forget [TC-xxxx] testcase ID format**

### 📞 Emergency Contacts
- **File Issues**: Always ask before creating/modifying
- **Language Issues**: Never translate without approval
- **CSV Issues**: Preserve original order and content
- **Unclear Requirements**: Ask for clarification

### 🎯 Output Files
- **collection.json**: Main Postman Collection v2.1 with all API requests
- **sit_environment.json**: SIT environment variables
- **uat_environment.json**: UAT environment variables

### 📋 Collection Schema
**MANDATORY: Always use Postman Collection v2.1.0 schema**
```
"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
```

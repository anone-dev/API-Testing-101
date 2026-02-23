สร้าง Test Scenario and Test Cases สำหรับ User Story หรือ Requirement ที่กำหนด โดยใช้ CSV Template ในรูปแบบตารางที่มีคอลัมน์ดังต่อไปนี้:

*   **Work Item Type:** ระบุ "AXONS Test Scenario v2" สำหรับทุก Test Case
*   **Title:** คำอธิบายโดยสรุปเกี่ยวกับ Test Case ตามรูปแบบ Naming Convention (ดูรายละเอียดด้านล่าง)
*   **Brief description:** ระบุเงื่อนไขเฉพาะเจาะจงที่ Test Case นี้มุ่งเน้นการทดสอบอย่างชัดเจน อ้างอิงจาก Requirement หรือ Flow การทำงานที่ได้รับมาอย่างละเอียด ตัวอย่าง:
    *   ตรวจสอบการแสดงตารางรายการ Role ทั้งหมดในระบบ
    *   ตรวจสอบความถูกต้องของข้อมูลที่แสดงในแต่ละคอลัมน์
    *   ตรวจสอบการป้องกันการเข้าถึงสำหรับ User ที่ไม่มีสิทธิ์
*   **Pre_conditions:** ระบุสิ่งที่ต้องเตรียมการทั้งหมดอย่างละเอียดก่อนเริ่มดำเนินการทดสอบ เช่น ข้อมูลตั้งต้น, สิทธิ์การเข้าถึง, สถานะของระบบ ตัวอย่าง:
    *   ระบบต้องมีข้อมูล Role อย่างน้อย 3 รายการในฐานข้อมูล
    *   User ต้องมีสิทธิ์ Super Admin หรือ Admin
    *   User ต้องล็อกอินเข้าสู่ระบบแล้ว
*   **Test Steps with test data:** ระบุขั้นตอนการทดสอบแบบทีละขั้น (step-by-step) ที่ชัดเจน พร้อมระบุข้อมูลที่ใช้ในการทดสอบสำหรับแต่ละขั้นตอน
*   **Expected test result:** ระบุผลลัพธ์ที่คาดหวังจากการทำตาม Test Steps อย่างละเอียดและแม่นยำ อิงตาม Design หรือเอกสารอ้างอิงอื่นๆ
*   **Actual test result:** เว้นว่างไว้ (จะกรอกหลังรันเทส)
*   **Priority level:** ระบุระดับความสำคัญ (Critical, High, Medium, Low) โดยใช้ Severity × Urgency matrix (ดูรายละเอียดด้านล่าง)
*   **Test_type:** ระบุประเภทของการทดสอบ (API, Mobile UI, Web UI, WindowsApp UI, Other)
*   **Automation test status:** ระบุสถานะ (Automatable, Automated, Cannot automate) ตามกฎของ Test_type (ดูรายละเอียดด้านล่าง)
*   **Cannot automate reason:** ระบุเหตุผลหากไม่สามารถ automate ได้ (เว้นว่างถ้า Automatable)
*   **Test result:** ระบุผลการทดสอบ (Not start, Passed, Failed, Invalid case)
*   **Effort:** ระบุเวลาที่ใช้ในการทดสอบ (ชั่วโมง) ตาม Effort Guidelines (ดูรายละเอียดด้านล่าง)
*   **Assigned to:** ระบุ email ของผู้รับผิดชอบการทดสอบ (ถามผู้ใช้ว่าจะระบุ email อะไรในช่องนี้)

---

## Title Naming Convention

Title ต้องเขียนตามรูปแบบ: **`[Platform][Module][Function] {{scenario}}`**

### รูปแบบ:
- **[Platform]:** API, WEB, MOBILE, WINDOWSAPP, OTHER
- **[Module]:** ชื่อโมดูลหรือส่วนของระบบ (เช่น User, Role, Login)
- **[Function]:** ฟังก์ชันที่ทดสอบ (เช่น Create, Update, Delete, Display)
- **{{scenario}}:** สถานการณ์การทดสอบ (เช่น Success, Validation Error, Unauthorized)

### ตัวอย่าง:
**Positive Cases (Happy Path):**
- `[API][Login][Authenticate] Login success with valid credentials`
- `[WEB][User][Create] Create user with all required fields`
- `[API][Role][Display] Display role list successfully`

**Negative Cases (Error Handling):**
- `[API][Login][Authenticate] Login fails with invalid password`
- `[WEB][User][Create] Create user fails with missing required field`
- `[API][Role][Access] Access denied for unauthorized user`

**Boundary Cases:**
- `[API][User][Create] Create user with username at minimum length (3 chars)`
- `[API][User][Create] Create user fails with username below minimum (2 chars)`

---

## Priority Levels

อ้างอิงจาก [Atlassian Jira Service Management Priority Levels](https://support.atlassian.com/jira-service-management-cloud/docs/what-are-priority-levels-in-jira-service-management/)

### Priority Level Values:
- **Critical**
- **High**
- **Medium**
- **Low**

### Priority Descriptions:

#### Critical – The problem will block progress
**คำอธิบาย:** เมื่อ Test scenario นี้ไม่ผ่านต้องแก้ไข "ทันที" เพราะ QA ไม่สามารถทดสอบต่อได้

**ตัวอย่าง:**
- Login/Authentication
- Payment Gateway
- Submit Order
- Upload file สำคัญ เช่น สัญญา Vendor

#### High – Serious problem that could block progress
**คำอธิบาย:** เมื่อ Test scenario นี้ไม่ผ่านเพราะฟังก์ชันที่ทดสอบทำงานผิดพลาดต้องแก้ไขใน "Sprint นี้" QA ยังทดสอบต่อได้แต่ยุ่งยาก
- ข้อผิดพลาดเกี่ยวกับ Branding จะอยู่ใน Priority นี้

**ตัวอย่าง:**
- Edit Order
- Approve/Reject workflow
- Export report
- Notification email

#### Medium – Has the potential to affect progress
**คำอธิบาย:** เมื่อ Test scenario นี้ไม่ผ่าน ควรแก้ไขถ้ามีเวลาเหลือใน Sprint หรือจัดลงใน Sprint ถัดไป แต่ต้องแก้ไขก่อนขึ้น Production และ QA ยังทดสอบต่อได้

**ตัวอย่าง:**
- Manage Profile
- Change password
- Filter / Search
- UI validation (field required)

#### Low – Minor problem or easily worked around
**คำอธิบาย:** เมื่อ Test scenario นี้ไม่ผ่าน การวางแผนแก้ไขจะขึ้นอยู่กับทีมงาน แต่ต้องแก้ไขก่อนขึ้น Production
- ปัญหา Cosmetic issues จะอยู่ใน Priority นี้

**ตัวอย่าง:**
- Visual, UI
- สีปุ่มไม่ตรงแบบ
- Alignment
- Typo, spelling

---

## Test Type Values

### ค่าที่เป็นไปได้สำหรับ Test_type:
- **API** - API Testing
- **Mobile UI** - Mobile Application Testing
- **Web UI** - Web Application Testing
- **WindowsApp UI** - Windows Desktop Application Testing
- **Other** - การทดสอบประเภทอื่นๆ เช่น Application log, Database, Performance

---

## Automation Status Rules

### กฎการกำหนด Automation Status ตาม Test_type:

- **API:** Default = **"Automatable"**
- **Web UI:** 
  - Priority = Critical หรือ High → **"Automatable"**
  - Priority = Medium หรือ Low → **"Cannot automate"**
- **Mobile UI:** 
  - Priority = Critical หรือ High → **"Automatable"**
  - Priority = Medium หรือ Low → **"Cannot automate"**
- **WindowsApp UI:**
  - Priority = Critical หรือ High → **"Automatable"**
  - Priority = Medium หรือ Low → **"Cannot automate"**
- **Other:** Default = **"Cannot automate"** (ระบุเหตุผลใน Cannot automate reason)
- **Automated:** Script already exists (สคริปต์มีอยู่แล้ว)

### ตัวอย่าง:
| Test_type | Priority | Automation Status |
|-----------|----------|-------------------|
| API | High | Automatable |
| Web UI | Critical | Automatable |
| Web UI | Medium | Cannot automate |
| Mobile UI | High | Automatable |
| Mobile UI | Low | Cannot automate |
| WindowsApp UI | High | Automatable |
| Other | High | Cannot automate |

---

## Test Result Values

### ค่าที่เป็นไปได้สำหรับ Test result:
- **Not start** - (Default) ยังไม่ได้เริ่มทดสอบ
- **Passed** - ทดสอบผ่าน ผลลัพธ์ตรงตาม Expected result
- **Failed** - ทดสอบไม่ผ่าน ผลลัพธ์ไม่ตรงตาม Expected result
- **Invalid case** - Test case ไม่ถูกต้องหรือไม่สามารถทดสอบได้

---

## Effort Guidelines

### การกำหนด Effort (ชั่วโมง):
- เริ่มต้นที่ **0.5** สำหรับ test case ง่าย
- เพิ่มทีละ **0.5** ตามความซับซ้อน
- ตัวอย่าง: 0.5, 1.0, 1.5, 2.0
- หน่วย = ชั่วโมง (hour)

### ตัวอย่างการประเมิน Effort:
| ความซับซ้อน | Effort | คำอธิบาย |
|-------------|--------|----------|
| Simple | 0.5 | API เดียว, UI 1-2 steps |
| Medium | 1.0 | API หลายตัว, UI 3-5 steps |
| Complex | 1.5 | Multiple APIs, UI 6-8 steps, Data validation |
| Very Complex | 2.0 | E2E flow, Multiple modules, Complex validation |

---

**Condition:**
*   **Test Steps Format:** ใช้หมายเลข 1. 2. 3. ต่อเนื่องกัน หากต้องการขึ้นบรรทัดใหม่ ให้ใช้ `<br>` แทนการกด Enter
*   **Default Values:**
    *   Work Item Type: "AXONS Test Scenario v2"
    *   Automation test status: "Automatable" (ถ้าไม่ระบุ)
    *   Test result: "Not start" (ถ้าไม่ระบุ)
*   **API Test Steps Example:**
        1.  เรียก API GET /roles หรือ endpoint ที่เกี่ยวข้อง
        2.  ส่ง Authentication Token ที่ถูกต้อง
        3.  ตรวจสอบ Response
*   **Web UI Test Steps Example:**
        1.  เข้าสู่ระบบด้วยสิทธิ์ Super Admin
        2.  คลิกที่เมนู Admin ใน Header
        3.  เลือกเมนู "จัดการ Role"
        4.  ตรวจสอบการแสดงผลตาราง
*   **Tasks ที่ต้องทำของ API Automation Script & Execution**  
    - [ ] API Success and Alternative E2E  
    - [ ] ตรวจสอบ Status Code (เช่น 200, 400, 401)  
    - [ ] ตรวจสอบ JSON Schema ของ Response  
    - [ ] ตรวจสอบข้อมูลใน Required Fields  
    - [ ] สคริปต์สามารถรันซ้ำได้โดยไม่เกิดข้อผิดพลาด
    
Export ออกมาเป็น .csv ถ้าแสดง TestCase ออกมาในรูปแบบภาษาไทย ให้เพิ่ม utf8 ของไฟล์ให้ด้วยเพื่อรองรับเรื่องภาษาไทย

**กรณีที่มีข้อมูลเป็นข้อหลายบรรทัดให้เติม `<br>` ต่อท้ายเสมอ และใส่ quotes รอบทั้งข้อความ** เช่น
```
"1. ระบบต้องมีข้อมูล Role อย่างน้อย 3 รายการในฐานข้อมูล<br>2. User ต้องมีสิทธิ์ Super Admin หรือ Admin<br>3. User ต้องล็อกอินเข้าสู่ระบบแล้ว<br>4. Browser รองรับการแสดงผลตาราง"
```

**ตัวอย่าง CSV Format ที่ถูกต้อง:**
```csv
Work Item Type,Title,Brief description,Pre_conditions,Test Steps with test data,Expected test result,Actual test result,Priority level,Test_type,Automation test status,Cannot automate reason,Test result,Effort,Assigned to
AXONS Test Scenario v2,"ตรวจสอบการแสดงตารางรายการ Role (Success Case)","ตรวจสอบการแสดงตารางรายการ Role ทั้งหมดในระบบ","1. ระบบต้องมีข้อมูล Role อย่างน้อย 3 รายการในฐานข้อมูล<br>2. User ต้องมีสิทธิ์ Super Admin หรือ Admin<br>3. User ต้องล็อกอินเข้าสู่ระบบแล้ว","1. เข้าสู่ระบบด้วยสิทธิ์ Super Admin<br>2. คลิกที่เมนู Admin<br>3. เลือกเมนู ""จัดการ Role""<br>4. ตรวจสอบการแสดงผล","1. ระบบแสดงตารางรายการ Role ทั้งหมด<br>2. ตารางมี Column ครบถ้วน<br>3. ข้อมูลเรียงลำดับถูกต้อง",,High,Web UI,Automatable,,Not start,1.0,tester@company.com
```

#KEY SPECIFICATIONS FOR GENERATING CSV OUTPUT - STRICT IMPLEMENTATION REQUIRED

**CRITICAL CSV FORMATTING CHECKLIST:**
- [ ] ใช้ UTF-8 with BOM encoding (\ufeff ที่จุดเริ่มต้นไฟล์)
- [ ] ใส่ quotes รอบฟิลด์ที่มี comma, quotes (""), หรือ <br>
- [ ] ตรวจสอบว่ามี 14 คอลัมน์ตรงตาม header (เพิ่ม Effort และ Assigned to)
- [ ] ใช้ `<br>` สำหรับการขึ้นบรรทัดใหม่ในเซลล์
- [ ] ใช้ """" (4 quotes) สำหรับ quotes ภายในข้อความที่มี quotes รอบนอก
- [ ] ทดสอบเปิดไฟล์ใน Excel/Google Sheets ก่อนส่งมอบ

## FORMAT RULES (MANDATORY):
1.  DELIMITER: Use comma (,) as column delimiter
2.  QUOTES USAGE: Use quotes ("") around fields that contain:
    - Commas (,)
    - Double quotes (")
    - Line breaks (`<br>`)
    - Leading/trailing spaces
    - Special characters that might affect CSV parsing
3.  NESTED QUOTES: Use """" (4 quotes) for quotes inside quoted fields (e.g., "เลือกเมนู ""จัดการ Role""")
4.  LINE BREAKS: For line breaks within cells, use `<br>` character ONLY
5.  EMPTY FIELDS: Leave empty fields as blank (e.g., field1,,field3)
6.  ENCODING: Always use UTF-8 with BOM (\ufeff) for Thai language support
7.  COLUMN COUNT: Ensure exactly 14 columns match the header structure (including Effort and Assigned to)

## CELL CONTENT FORMATTING:
*   SINGLE LINE: All cell content must be in a single line in the CSV file
*   TEXT WITH COMMA/QUOTES: Must be enclosed in quotes ("")
*   MULTI-LINE TEXT: Use `<br>` for line breaks within cells, NEVER use '\n'
*   NESTED QUOTES: Use """" (escape quotes) inside quoted fields
*   EMPTY FIELDS: Leave as blank between commas (,,)

## COMMON FIELDS REQUIRING QUOTES:
*   Title (may contain colons/parentheses): "ตรวจสอบการแสดงตารางรายการ Role (Success Case)"
*   Brief description (long text with punctuation)
*   Pre_conditions (multi-line with `<br>`)
*   Test Steps with test data (multi-line with `<br>` and nested quotes)
*   Expected test result (multi-line with `<br>`)

## VALIDATION REQUIREMENTS:
*   Before submission, verify CSV opens correctly in standard spreadsheet applications
*   Confirm all columns align properly with headers (should be exactly 14 columns)
*   Ensure nested quotes use """" (4 quotes) format correctly
*   Test with Excel/Google Sheets to ensure proper column separation
*   Verify UTF-8 encoding displays Thai characters correctly
*   Check that `<br>` appears correctly for multi-line content
*   Ask user for email addresses to populate "Assigned to" column before generating CSV

## TROUBLESHOOTING COMMON ISSUES:
*   If data appears in wrong columns: Check for unquoted commas or incorrect nested quotes
*   If Thai characters display incorrectly: Ensure UTF-8 with BOM encoding
*   If line breaks don't work: Verify using `<br>` instead of actual line breaks
*   If quotes appear incorrectly: Use """" (4 quotes) for nested quotes inside quoted fields
*   If columns misalign: Verify exactly 14 columns in header and all rows

---

## Assigned to Guidelines

### การกำหนด Assigned to:
- **ถามผู้ใช้ก่อนสร้าง CSV:** "คุณต้องการระบุ email ของผู้รับผิดชอบในช่อง Assigned to หรือไม่? (ถ้าไม่ระบุจะเว้นว่างไว้)"
- **รูปแบบ email:** ใช้รูปแบบ email ที่ถูกต้อง เช่น user@example.com
- **หลายคน:** สามารถระบุได้คนเดียวต่อ test case
- **เว้นว่าง:** หากยังไม่มีผู้รับผิดชอบ ให้เว้นว่างไว้

### ตัวอย่าง:
| Test Case | Assigned to |
|-----------|-------------|
| TC-001 | tester1@company.com |
| TC-002 | tester2@company.com |
| TC-003 | (เว้นว่าง) |
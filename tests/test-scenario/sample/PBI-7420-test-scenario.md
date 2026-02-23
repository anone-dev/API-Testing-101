# PBI-7420 Test Scenarios

## Test Case 1: ตรวจสอบการแสดงตารางรายการ Role (Success Case)

**Brief Description:** ตรวจสอบการแสดงตารางรายการ Role ทั้งหมดในระบบ

**Priority:** High  
**Test Type:** Web UI  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ระบบต้องมีข้อมูล Role อย่างน้อย 3 รายการในฐานข้อมูล
2. User ต้องมีสิทธิ์ Super Admin หรือ Admin
3. User ต้องล็อกอินเข้าสู่ระบบ CMS-Admin Site แล้ว
4. Browser รองรับการแสดงผลตาราง

### Test Steps
1. เข้าสู่ระบบ CMS-Admin Site ด้วยสิทธิ์ Super Admin
2. คลิกที่เมนู Admin ใน Header
3. เลือกเมนู "จัดการ Role"
4. ตรวจสอบการแสดงผลตาราง

### Expected Result
1. ระบบแสดงตารางรายการ Role ทั้งหมด
2. ตารางมี Column: Role ID, ชื่อ Role, จำนวนผู้ใช้งาน, สร้างรายการโดย, วันที่สร้างรายการ, อัปเดตรายการโดย, วันที่อัปเดตรายการ, การจัดการ
3. ข้อมูลเรียงลำดับตาม Role ID
4. แสดงปุ่ม "ดูรายละเอียด" ในคอลัมน์การจัดการ

---

## Test Case 2: ตรวจสอบการแสดงข้อมูลในแต่ละ Column ของตาราง

**Brief Description:** ตรวจสอบความถูกต้องของข้อมูลที่แสดงในแต่ละคอลัมน์ของตาราง

**Priority:** High  
**Test Type:** Web UI  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ระบบมีข้อมูล Role ที่มี User ใช้งานอยู่
2. User ล็อกอินด้วยสิทธิ์ Super Admin
3. อยู่ในหน้าจัดการ Role

### Test Steps
1. เข้าหน้าจัดการ Role
2. ตรวจสอบข้อมูลในคอลัมน์ Role ID
3. ตรวจสอบข้อมูลในคอลัมน์ชื่อ Role
4. ตรวจสอบข้อมูลในคอลัมน์จำนวนผู้ใช้งาน
5. ตรวจสอบข้อมูลในคอลัมน์สร้างรายการโดย
6. ตรวจสอบข้อมูลในคอลัมน์วันที่สร้าง
7. ตรวจสอบข้อมูลในคอลัมน์อัปเดตโดย
8. ตรวจสอบข้อมูลในคอลัมน์วันที่อัปเดต

### Expected Result
1. Role ID แสดงเป็นตัวเลขที่ไม่ซ้ำกัน
2. ชื่อ Role แสดงชื่อที่ถูกต้อง
3. จำนวนผู้ใช้งานแสดงตัวเลขจำนวน User ที่มีสิทธิใน Role นั้น
4. สร้างรายการโดยแสดงชื่อผู้สร้าง
5. วันที่สร้างแสดงรูปแบบ DateTime ที่ถูกต้อง
6. อัปเดตโดยแสดงชื่อผู้อัปเดตล่าสุด
7. วันที่อัปเดตแสดงรูปแบบ DateTime ที่ถูกต้อง

---

## Test Case 3: ตรวจสอบการเรียงลำดับข้อมูลตาม Role ID

**Brief Description:** ตรวจสอบการ Sort ข้อมูลตาม Role ID ตามที่กำหนดใน Requirement

**Priority:** Medium  
**Test Type:** Web UI  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ระบบมีข้อมูล Role หลายรายการ
2. User ล็อกอินด้วยสิทธิ์ Super Admin
3. อยู่ในหน้าจัดการ Role

### Test Steps
1. เข้าหน้าจัดการ Role
2. ตรวจสอบลำดับการแสดงข้อมูลในตาราง
3. เปรียบเทียบ Role ID ในแถวแรกกับแถวถัดไป
4. ตรวจสอบทุกแถวในตาราง

### Expected Result
1. ข้อมูลในตารางเรียงลำดับตาม Role ID จากน้อยไปมาก
2. Role ID ในแถวแรกมีค่าน้อยกว่าแถวถัดไป
3. การเรียงลำดับสอดคล้องกับ Requirement

---

## Test Case 4: ตรวจสอบการทำงานของปุ่มดูรายละเอียด

**Brief Description:** ตรวจสอบการทำงานของปุ่มดูรายละเอียดในคอลัมน์การจัดการ

**Priority:** Medium  
**Test Type:** Web UI  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ระบบมีข้อมูล Role อย่างน้อย 1 รายการ
2. User ล็อกอินด้วยสิทธิ์ Super Admin
3. อยู่ในหน้าจัดการ Role

### Test Steps
1. เข้าหน้าจัดการ Role
2. ระบุ Role ที่ต้องการดูรายละเอียด
3. คลิกปุ่ม "ดูรายละเอียด" ในคอลัมน์การจัดการ
4. ตรวจสอบการตอบสนองของระบบ

### Expected Result
1. ปุ่มดูรายละเอียดสามารถคลิกได้
2. ระบบตอบสนองเมื่อคลิกปุ่ม
3. การทำงานเป็นไปตาม Design ที่กำหนด

---

## Test Case 5: ตรวจสอบการเข้าถึงหน้าจัดการ Role โดยไม่มีสิทธิ์

**Brief Description:** ตรวจสอบการป้องกันการเข้าถึงหน้าจัดการ Role สำหรับ User ที่ไม่มีสิทธิ์

**Priority:** High  
**Test Type:** Web UI  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ระบบมี User ที่ไม่มีสิทธิ์ Super Admin หรือ Admin
2. User ล็อกอินเข้าสู่ระบบแล้ว

### Test Steps
1. ล็อกอินด้วย User ที่ไม่มีสิทธิ์ Super Admin หรือ Admin
2. พยายามเข้าถึงเมนู Admin
3. พยายามเข้าถึงหน้าจัดการ Role โดยตรง

### Expected Result
1. ระบบไม่แสดงเมนู Admin หรือเมนูจัดการ Role
2. หากพยายามเข้าถึงโดยตรง ระบบแสดงข้อความแจ้งเตือนการไม่มีสิทธิ์
3. ระบบป้องกันการเข้าถึงข้อมูล Role

---

## Test Case 6: ตรวจสอบการแสดงตารางเมื่อไม่มีข้อมูล Role

**Brief Description:** ตรวจสอบการแสดงผลเมื่อระบบไม่มีข้อมูล Role

**Priority:** Medium  
**Test Type:** Web UI  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ฐานข้อมูลไม่มีข้อมูล Role
2. User ล็อกอินด้วยสิทธิ์ Super Admin
3. ระบบพร้อมใช้งาน

### Test Steps
1. เข้าสู่ระบบด้วยสิทธิ์ Super Admin
2. เข้าหน้าจัดการ Role
3. ตรวจสอบการแสดงผลของตาราง

### Expected Result
1. ระบบแสดงตารางพร้อม Header ทั้งหมด
2. แสดงข้อความแจ้งว่าไม่มีข้อมูล Role
3. ไม่เกิด Error หรือหน้าจอเสีย

---

## Test Case 7: ตรวจสอบการแสดงตารางเมื่อมีข้อมูล Role จำนวนมาก

**Brief Description:** ตรวจสอบ Performance และการแสดงผลเมื่อมีข้อมูล Role จำนวนมาก

**Priority:** Medium  
**Test Type:** Web UI  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ฐานข้อมูลมีข้อมูล Role มากกว่า 100 รายการ
2. User ล็อกอินด้วยสิทธิ์ Super Admin
3. ระบบพร้อมใช้งาน

### Test Steps
1. เข้าสู่ระบบด้วยสิทธิ์ Super Admin
2. เข้าหน้าจัดการ Role
3. รอให้ระบบโหลดข้อมูลเสร็จสิ้น
4. ตรวจสอบการแสดงผลและ Performance

### Expected Result
1. ระบบแสดงข้อมูล Role ทั้งหมดในตาราง
2. ไม่มี Pagination ตาม Requirement
3. การโหลดข้อมูลเสร็จสิ้นภายในเวลาที่เหมาะสม
4. ตารางแสดงผลได้อย่างถูกต้อง

---

## Test Case 8: ตรวจสอบ API การดึงข้อมูล Role (Success Case)

**Brief Description:** ตรวจสอบ API ที่ใช้ดึงข้อมูล Role สำหรับแสดงในตาราง

**Priority:** High  
**Test Type:** API  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ระบบมีข้อมูล Role ในฐานข้อมูล
2. API Endpoint พร้อมใช้งาน
3. มี Authentication Token ที่ถูกต้อง

### Test Steps
1. เรียก API GET /roles หรือ endpoint ที่เกี่ยวข้อง
2. ส่ง Authentication Token ที่ถูกต้อง
3. ตรวจสอบ Response

### Expected Result
1. ได้รับ Status Code 200
2. Response มีข้อมูล Role ทั้งหมด
3. JSON Schema ถูกต้องตาม Specification
4. ข้อมูลครบถ้วนตาม Required Fields

---

## Test Case 9: ตรวจสอบ API การดึงข้อมูล Role โดยไม่มี Authentication

**Brief Description:** ตรวจสอบการป้องกัน API เมื่อไม่มี Authentication Token

**Priority:** High  
**Test Type:** API  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. API Endpoint พร้อมใช้งาน
2. ไม่มี Authentication Token หรือ Token ไม่ถูกต้อง

### Test Steps
1. เรียก API GET /roles โดยไม่ส่ง Authentication Token
2. ตรวจสอบ Response
3. ทดสอบด้วย Invalid Token

### Expected Result
1. ได้รับ Status Code 401 Unauthorized
2. Response มีข้อความแจ้งเตือนการไม่มีสิทธิ์
3. ไม่ได้รับข้อมูล Role
4. JSON Schema ของ Error Response ถูกต้อง

---

## Test Case 10: ตรวจสอบ API การดึงข้อมูล Role เมื่อไม่มีข้อมูล

**Brief Description:** ตรวจสอบ API Response เมื่อฐานข้อมูลไม่มีข้อมูล Role

**Priority:** Medium  
**Test Type:** API  
**Automation Status:** Automatable  
**Test Result:** Not start

### Pre-conditions
1. ฐานข้อมูลไม่มีข้อมูล Role
2. API Endpoint พร้อมใช้งาน
3. มี Authentication Token ที่ถูกต้อง

### Test Steps
1. เรียก API GET /roles
2. ส่ง Authentication Token ที่ถูกต้อง
3. ตรวจสอบ Response

### Expected Result
1. ได้รับ Status Code 200
2. Response เป็น Empty Array หรือ Object ที่แสดงไม่มีข้อมูล
3. JSON Schema ถูกต้อง
4. ไม่เกิด Error

---

## Test Case 11: ตรวจสอบ Responsive Design ของตารางแสดง Role

**Brief Description:** ตรวจสอบการแสดงผลของตารางในหน้าจอขนาดต่างๆ

**Priority:** Low  
**Test Type:** Web UI  
**Automation Status:** Cannot automate  
**Test Result:** Not start

### Pre-conditions
1. User ล็อกอินด้วยสิทธิ์ Super Admin
2. ระบบมีข้อมูล Role
3. Browser รองรับ Responsive Design

### Test Steps
1. เข้าหน้าจัดการ Role ในหน้าจอ Desktop
2. ปรับขนาดหน้าจอเป็น Tablet
3. ปรับขนาดหน้าจอเป็น Mobile
4. ตรวจสอบการแสดงผลในแต่ละขนาด

### Expected Result
1. ตารางแสดงผลได้ถูกต้องในทุกขนาดหน้าจอ
2. ข้อมูลไม่หายหรือซ้อนทับกัน
3. ปุ่มและ UI Elements ยังใช้งานได้
4. การเลื่อนหน้าจอทำงานได้ปกติ

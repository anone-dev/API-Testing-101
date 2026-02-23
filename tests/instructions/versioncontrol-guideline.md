# Git Version Control Guide
## คู่มือการใช้งาน Git สำหรับการอัพเดต Source Code จาก Local ไปยัง Remote

---
## 🔀 Workflow Options - เลือกวิธีการ Commit

โปรเจคนี้รองรับ 2 วิธีการ commit:

### 📌 Option 1: Direct Commit to Main (แบบไม่ต้องทำ PR)
- ✅ เหมาะสำหรับ: การแก้ไขเล็กน้อย, hotfix, ทำงานคนเดียว
- ✅ รวดเร็ว ไม่ต้องรอ review
- ⚠️ ข้อควรระวัง: ไม่มี code review, ต้องระมัดระวังเป็นพิเศษ
- 📝 Commit format: `[AB#xxxxx,AB#yyyyy] Description` (ไม่มี [PR])
  - **AB#xxxxx** = Test Scenario ID บน Azure Board
  - ตัวอย่าง: AB#107778, AB#107779

### 📌 Option 2: Pull Request Workflow (แบบต้องทำ PR)
- ✅ เหมาะสำหรับ: Feature ใหม่, การแก้ไขใหญ่, ทำงานหลายคน
- ✅ มี code review, ปลอดภัยกว่า
- ⚠️ ข้อควรระวัง: ใช้เวลานานกว่า ต้องรอ approval
- 📝 Commit format: `[PR][AB#xxxxx,AB#yyyyy] Description` (มี [PR])
  - **AB#xxxxx** = Test Scenario ID บน Azure Board
  - ตัวอย่าง: AB#107778, AB#107779

**💡 คำแนะนำ:** ถามผู้ใช้ก่อนเริ่มว่าต้องการใช้วิธีไหน

---
## 🛡️ Safety Guidelines - นโยบายความปลอดภัย

### ⚠️ Confirmation Policy
**ก่อนรัน Git Commands ที่มีผลกระทบ ต้องถามยืนยันจากผู้ใช้เสมอ**

#### Commands ที่ต้องถามยืนยัน:
- `git branch -d` (ลบ branch)
- `git branch -D` (บังคับลบ branch)
- `git push` (push ขึ้น remote)
- `git push -f` (force push)
- `git rebase` (rebase branch)
- `git reset --hard` (reset แบบถาวร)
- `git clean -fd` (ลบไฟล์ untracked)

#### Confirmation Pattern:
1. **แสดงคำสั่งที่จะรัน** พร้อมอธิบายผลกระทบ
2. **ถามยืนยัน**: "ต้องการให้รันคำสั่งนี้หรือไม่? (ใช่/ไม่)"
3. **รอคำตอบ** จากผู้ใช้
4. **Execute เมื่อได้รับยืนยัน** เท่านั้น

---
## 📋 Quick Guide - ขั้นตอนทั้งหมดพร้อมตัวอย่างคำสั่ง

---
# 🔵 OPTION 1: Direct Commit to Main (ไม่ต้องทำ PR)

## 1. ดึง code ล่าสุดจาก Remote ลงมาที่ Local

```bash
git checkout main
git pull origin main
```

## 2. แก้ไข code และ Commit

### 2.1 ตรวจสอบและเพิ่มไฟล์
```bash
git status
git add .
```

### 2.2 ค้นหา Work Items (Optional)
- ถามผู้ใช้: "ต้องการค้นหา Work Items หรือไม่?"
- Format: `{keyword} และ {tags}` เช่น `F3S1 และ 2024SP24`
- กรองเฉพาะ "AXONS Test Scenario v2" ที่มีคำว่า "Automate" ใน Title

### 2.3 Commit โดยตรงบน main
```bash
# Format: [AB#xxxxx,AB#yyyyy] Description (ไม่มี [PR])
# AB#xxxxx = Test Scenario ID บน Azure Board
git commit -m "[AB#107778,AB#107779] Add test script F3S1, F3S2"
```

**Commit Message Format (Direct):**
- `[AB#107778,AB#107779] Add test script F3S1, F3S2`
- `[AB#107780] Update test data for F3S1`
- `[AB#107781] Fix API endpoint configuration`

## 3. Push ขึ้น Remote

```bash
git push origin main
```

✅ **เสร็จสิ้น!** Code ถูก push ขึ้น main โดยตรง

---
# 🟢 OPTION 2: Pull Request Workflow (ต้องทำ PR)

## 1. ดึง code ล่าสุดจาก Remote ลงมาที่ Local ใหม่เสมอ

### 1.1 Switch ไปที่ Main Branch และ Pull Code ล่าสุดจาก Remote
```bash
git checkout main
git pull origin main
```

---

## 2. ทำความสะอาด Local Branch ที่ merge แล้ว

### 2.1 ตรวจสอบ Branch ที่ merge เข้า main แล้ว
```bash
# ตรวจสอบ branch ที่ merge เข้า main แล้ว
git branch --merged main
```

### 2.2 ลบ Local Branch ที่ merge แล้ว
```bash
# ลบ branch ที่ merge แล้ว (ปลอดภัย)
git branch -d branch-name

# ตัวอย่าง
git branch -d refolder
```

---

## 3. สร้าง Feature Branch ใหม่

### 3.1 ตั้งชื่อ Branch ตามมาตรฐาน
```bash
# รูปแบบ: feature/feature-code-name
git checkout -b automated-files/2025SP20
```

---

## 4. แก้ไขและอัพเดต code และ Commit พร้อม Work Items

### 4.1 ตรวจสอบไฟล์ที่แก้ไข
```bash
git status
```

### 4.2 เพิ่มไฟล์เข้า Staging
```bash
# ดูรายการไฟล์ที่แก้ไข
git status

# เลือกเพิ่มไฟล์ทีละไฟล์
git add path/to/file1.js
git add path/to/file2.json

# หรือเพิ่มหลายไฟล์พร้อมกัน
git add file1.js file2.json file3.py

# หรือเพิ่มไฟล์ทั้งหมดในโฟลเดอร์เฉพาะ
git add src/

# หรือเพิ่มไฟล์ทั้งหมด (ใช้เมื่อแน่ใจว่าต้องการทุกไฟล์)
git add .

# ตรวจสอบไฟล์ที่เพิ่มเข้า staging แล้ว
git status
```

### 4.3 ค้นหา Work Items ที่เกี่ยวข้อง (Optional)
```bash
# ระบุ keyword และ tags เพื่อค้นหา Work Items
# Format: {keyword} และ {tags}
# ตัวอย่าง: F3S1 และ 2024SP24
```

**ขั้นตอนการค้นหา:**
1. ถามผู้ใช้: "ต้องการค้นหา Work Items ที่เกี่ยวข้องหรือไม่?"
2. ถาม keyword และ tags: "กรุณาระบุ keyword และ tags"
   - Format: `{keyword} และ {tags}`
   - ตัวอย่าง: `F3S1 และ 2024SP24`
3. ค้นหา Work Items ด้วย Azure DevOps Search API
4. **กรอง Work Items ที่มีคำว่า "Automate" ใน Title เท่านั้น** (case-insensitive)
5. แสดงผลลัพธ์และให้เลือก Work Items (เฉพาะ Axons Test Scenario ที่ผ่านการกรอง)
6. สร้าง Work Items string: `AB#107778,AB#107779`

**Work Item Types ที่ค้นหา:**
- **AXONS Test Scenario v2** (เท่านั้น)
- **Title Filter**: ต้องมีคำว่า "Automate" ใน Title (case-insensitive)
  - รองรับ: "Automated", "automate", "AUTOMATE", "Automation"
  - ใช้ partial match (contains) แทน exact match

**การจัดการผลลัพธ์:**
- หากไม่พบ Work Items ที่ตรงเงื่อนไข: แจ้งผู้ใช้และให้เลือก skip
- หากพบผลลัพธ์: แสดงรายการพร้อม ID และ Title

**การเลือก Work Items:**
- พิมพ์หมายเลข (คั่นด้วย comma): `1,2,3`
- พิมพ์ `all` เพื่อเลือกทั้งหมด
- พิมพ์ `skip` เพื่อไม่เลือก (commit โดยไม่มี Work Items)

### 4.4 Commit พร้อม Message และ Work Items
```bash
# รูปแบบ: [PR][AB#xxxxx,AB#yyyyy] Description (มี [PR])
# AB#xxxxx = Test Scenario ID บน Azure Board
git commit -m "[PR][AB#107778,AB#107779] Add test script F3S1, F3S2"
```

**Commit Message Format (PR Workflow):**
- `[PR][AB#xxxxx,AB#yyyyy] Add test script F3S1, F3S2`
- `[PR][AB#xxxxx,AB#yyyyy] Update test script F3S1`
- `[PR][AB#xxxxx,AB#yyyyy] Fix test scripts`
- `[PR][AB#xxxxx] Refactor test data structure`


---

## 5. [OPTIONAL] Sync กับ Remote ก่อน Push (สามารถ skip ได้หากไม่ได้ทำงานพร้อมกันหลายคนใน repo)

### 5.1 Update Main Branch
```bash
git checkout main
git pull origin main
```

### 5.2 กลับไปที่ Feature Branch
```bash
git checkout automated-files/2025SP20
```

### 5.3 Rebase เพื่อ sync code ล่าสุดอีกครั้ง เข้ามาใน Feature Branch (กัน conflict ก่อนนำขึ้น remote)
```bash
git rebase main
```

## 5.4 แก้ไข Conflict (ถ้ามี)

### 5.4.1 ตรวจสอบไฟล์ที่ Conflict
```bash
git status
# Unmerged paths:
#   both modified:   file.py
```

### 5.4.2 เปิดไฟล์และแก้ไข Conflict

### 5.4.3 Mark Resolved และ Continue

#### ถ้าใช้ Rebase:
```bash
git add file.py
git rebase --continue
```

#### ถ้าใช้ Merge:
```bash
git add file.py
git commit
```

### 5.4 ยกเลิก Rebase/Merge (ถ้าต้องการ)
```bash
# ยกเลิก rebase
git rebase --abort

# ยกเลิก merge
git merge --abort
```

---

## 6. Push Loca Branch ขึ้น Remote

### 6.1 Push Feature Branch ครั้งแรก
```bash
git push -u origin automated-files/2025SP20
```

### 6.2 Push การแก้ไขเพิ่มเติม (ไม่ใช่ครั้งแรก)
```bash
git push
```

---

## 7. สร้าง Pull Request เพื่อ Merge เข้า main

### 7.1 ไปที่ Azure DevOps
1. เข้าไปที่ Repository
2. เลือก Source Branch ที่เพิ่ง Push ขึ้นไป
3. คลิก "Create a pull request"

### 7.2 กรอกข้อมูล PR (Auto-filled จาก Commit Message)

**Title และ Description จะถูกดึงจาก Commit Message อัตโนมัติ:**

**ถ้ามี 1 commit:**
- Title: `[PR][AB#107778,AB#107779] Add test script F3S1, F3S2`
- Description: ใช้ commit message เดียวกัน

**ถ้ามีหลาย commits:**
- Title: ใช้ branch name (ต้องกรอกเอง)
- Description: แสดง commit messages ทั้งหมด
- **แนะนำ:** Squash commits ก่อน push เพื่อให้ title auto-fill

**Work Items:**
- Work Items จะถูก link อัตโนมัติจาก commit message `AB#xxxxx`
- ตรวจสอบว่า Work Items ถูก link ครบถ้วน

**Reviewers:**
- เพิ่ม Reviewers ตามความเหมาะสม

### 7.3 Merge PR to main
- รอ reviewer approve
- แก้ไข comments (ถ้ามี)
- Complete Pull Request เพื่อ Merge เข้า main

---

## 9. Commit Message Best Practices

### Format Standards

**Direct Commit (Option 1):**
```
[AB#xxxxx,AB#yyyyy] Description
```
- **AB#xxxxx** = Test Scenario ID บน Azure Board (Work Item ID)
- **xxxxx** = เลข ID ของ Test Scenario
- ตัวอย่าง: AB#107778, AB#107779

**Pull Request (Option 2):**
```
[PR][AB#xxxxx,AB#yyyyy] Description
```
- **AB#xxxxx** = Test Scenario ID บน Azure Board (Work Item ID)
- **xxxxx** = เลข ID ของ Test Scenario
- ตัวอย่าง: AB#107778, AB#107779

### Description Guidelines
- ใช้ภาษาอังกฤษ
- เริ่มด้วย verb (Add, Update, Fix, Remove)
- ระบุ feature/story ที่เกี่ยวข้อง (F3S1, F3S2)
- กระชับและชัดเจน

### ตัวอย่าง Good Commit Messages

**Direct Commit:**
```bash
[AB#107778,AB#107779] Add test script F3S1, F3S2
[AB#107780] Add automated test files for F3S1
[AB#107781] Fix login API test data
[AB#107782] Update test script F3S1
```

**Pull Request:**
```bash
[PR][AB#107778,AB#107779] Add test script F3S1, F3S2
[PR][AB#107780] Add automated test files for F3S1
[PR][AB#107781] Fix login API test data
[PR][AB#107782] Update test script F3S1
```

### ตัวอย่าง Bad Commit Messages
```bash
# ❌ ไม่มี Work Items
Add test files

# ❌ Description ไม่ชัดเจน
[AB#107778] Update

# ❌ Format ไม่ถูกต้อง
AB#107778 Add test files  # ขาด brackets
```

---

## 10. Quick Reference - คู่มือสรุป

### 🔵 Direct Commit (ไม่ต้อง PR)
```bash
# 1. Pull latest
git checkout main
git pull origin main

# 2. Make changes & commit
git add .
git commit -m "[AB#xxxxx,AB#yyyyy] Description"

# 3. Push to main
git push origin main
```

### 🟢 Pull Request Workflow (ต้องทำ PR)
```bash
# 1. Pull latest
git checkout main
git pull origin main

# 2. Clean merged branches
git branch --merged main
git branch -d {old-branch}

# 3. Create feature branch
git checkout -b automated-files/xxxx

# 4. Make changes & commit
git add .
git commit -m "[PR][AB#xxxxx,AB#yyyyy] Description"

# 5. [Optional] Sync with remote
git checkout main && git pull origin main
git checkout automated-files/xxxx
git rebase main

# 6. Push feature branch
git push -u origin automated-files/xxxx

# 7. Create PR on Azure DevOps
```

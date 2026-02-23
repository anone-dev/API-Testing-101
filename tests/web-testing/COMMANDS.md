# คำสั่งที่ใช้บ่อย (Quick Commands)

## รัน Test ทั้งหมด
npm test                    # รัน test ทั้งหมดบน SIT (default)
npm run test:sit            # รัน test ทั้งหมดบน SIT
npm run test:uat            # รัน test ทั้งหมดบน UAT

## รัน Test แยกตาม Feature
npm run test:feature1       # รัน Feature 1 บน SIT
npm run test:feature2       # รัน Feature 2 บน SIT
npm run test:feature3       # รัน Feature 3 บน SIT

## รัน Test แยกตาม Feature + Environment
npm run test:feature1:uat   # รัน Feature 1 บน UAT
npm run test:feature2:uat   # รัน Feature 2 บน UAT
npm run test:feature3:uat   # รัน Feature 3 บน UAT

## รัน Test แบบ Headed Mode
npm run test:headed         # เห็น browser ขณะรัน test

## รัน Test แบบ UI Mode (Interactive)
npm run test:ui             # รัน test ในโหมด UI (แนะนำสำหรับ debug)

## ดู Report
npm run report              # เปิด HTML report

## รัน Test เฉพาะไฟล์
npx playwright test tests_ui/feature-1/login.spec.ts

## รัน Test เฉพาะ Browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

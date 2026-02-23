# Web UI E2E Testing with Playwright

## Overview
End-to-end testing สำหรับ Simple Books API Web UI (`http://localhost:8000/ui.html`) ใช้ Playwright + Page Object Model รองรับ multi-environment และมี global auth setup

## Prerequisites

1. Start Mock Server ก่อน:
```cmd
cd books-local
start.bat
```

2. Install dependencies:
```cmd
cd tests/web-testing
npm install
npx playwright install
mkdir test-results
```

## Running Tests

```cmd
cd tests/web-testing

# FR-06 Web UI (CLI)
npm run ui:sit:FR06:cliMode

# FR-06 Web UI (GUI / interactive)
npm run ui:sit:FR06:guiMode

# ทั้งหมด
npm run ui:sit:all:cliMode

# ดู HTML report
npm run report
```

## Project Structure

```
tests/web-testing/
├── globalSetup.ts            # Login ครั้งเดียว → บันทึก auth state
├── playwright.config.ts      # Playwright configuration
├── package.json
├── .env                      # SIT (default): BASE_URL=http://localhost:5000
│
├── pages/                    # Page Object Model
│   ├── BasePage.ts           # goto(), waitForPageLoad()
│   └── BooksAppPage.ts       # locators + actions สำหรับ ui.html
│
└── tests-web/
    └── FR06-webUI/
        ├── webAuth.spec.ts       # TC-12595, TC-12596 (login flow)
        ├── webBooks.spec.ts      # TC-12597 (books list + filter)
        ├── webOrders.spec.ts     # TC-12598 (create order)
        └── webStockTheme.spec.ts # TC-12599, TC-12600 (reset stock, themes)
```

## Test Cases

| File | TC ID | Description |
|------|-------|-------------|
| webAuth.spec.ts | TC-12595 | Password protection success |
| webAuth.spec.ts | TC-12596 | Wrong password shows error |
| webBooks.spec.ts | TC-12597 | Books list with filter |
| webOrders.spec.ts | TC-12598 | Create order via Web UI |
| webStockTheme.spec.ts | TC-12599 | Reset stock button works |
| webStockTheme.spec.ts | TC-12600 | 6 color themes supported |

## Auth Strategy

- `globalSetup.ts` — login ด้วย password `qacoe` ครั้งเดียว บันทึก `localStorage` ลง `test-results/.auth.json`
- ทุก test โหลด auth state อัตโนมัติ ยกเว้น `webAuth.spec.ts` ที่ต้อง clear ก่อนเพื่อทดสอบ login flow

## Page Objects

### BooksAppPage
```typescript
import { BooksAppPage } from '../../pages/BooksAppPage';

const app = new BooksAppPage(page);
await app.goto('/ui.html');
await app.login('qacoe');
await app.register('email@example.com', 'Name');
await app.filterBooks('fiction', '5');
await app.createOrder('1', 'Customer Name');
```

## Reports

- HTML: `playwright-report/index.html`
- JSON: `test-results/results.json`
- JUnit: `test-results/junit.xml`
- Screenshots: `test-results/web-*.png`

# Web UI E2E Testing with Playwright

## Overview
End-to-end testing framework using Playwright for Simple Books API Web UI with Page Object Model, multi-environment support, and global auth setup.

## Environment Configuration

| Environment | Config File | Description |
|-------------|-------------|-------------|
| `local` | `.env.local` | Local development (`http://localhost:8000`) |
| `sit` | `.env.sit` | System Integration Testing (default) |
| `uat` | `.env.uat` | User Acceptance Testing |

### Environment Variables
- `BASE_URL`: Base URL for Web UI
- `ENV`: Environment name (`local` / `sit` / `uat`)

## Prerequisites

**Start Mock Server first:**
```bash
cd books-local
start.bat          # Windows
./start.sh         # macOS/Linux
```

## Installation

```bash
cd tests/web-testing
npm install
npx playwright install
```

## Running Tests

**Script format:** `ui:[env]:[suite]:[mode]`

```bash
# Run all tests
npm run ui:local:all:cliMode
npm run ui:local:all:guiMode
npm run ui:sit:all:cliMode
npm run ui:uat:all:cliMode

# Run FR06 Web UI suite (replace [env] with local / sit / uat)
npm run ui:local:FR06:cliMode       # TC-12595–12600 (CLI mode)
npm run ui:local:FR06:guiMode       # TC-12595–12600 (GUI mode)
npm run ui:sit:FR06:cliMode
npm run ui:uat:FR06:cliMode

# View HTML report
npm run report
```

### Run Specific Test by TC ID

```bash
npx playwright test -g "[TC-12595]"
```

### Run Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run in Headed Mode

```bash
npx playwright test --headed
```

## Project Structure

```
tests/web-testing/
├── .env.sit                  # SIT environment config (default)
├── .env.local                # Local environment config
├── .env.uat                  # UAT environment config
├── globalSetup.ts            # Global auth setup (login once)
├── playwright.config.ts      # Playwright configuration
├── package.json              # Dependencies & scripts
│
├── helpers/
│   ├── testDataLoader.ts     # Test data loader
│   └── databaseHelper.ts     # Database operations
│
├── fixtures/
│   ├── testdata.sit.json     # SIT test data
│   ├── testdata.local.json   # Local test data
│   └── testdata.uat.json     # UAT test data
│
├── pages/                    # Page Object Model
│   ├── BasePage.ts           # Base page with common methods
│   └── BooksAppPage.ts       # Books app page object
│
├── pipelines/
│   └── web-pipeline.yaml     # Azure DevOps pipeline
│
└── tests-web/
    └── FR06-webUI/
        ├── webAuth.spec.ts       # TC-12595, TC-12596
        ├── webBooks.spec.ts      # TC-12597
        ├── webOrders.spec.ts     # TC-12598
        └── webStockTheme.spec.ts # TC-12599, TC-12600
```

## Test Coverage

| Suite | PBI | TC IDs | Tests | Description |
|-------|-----|--------|-------|-------------|
| FR06-webUI | PBI-12561 | 12595–12600 | 6 | Web UI authentication, books, orders, stock, themes |

### Test Cases Detail

| File | TC ID | Description |
|------|-------|-------------|
| webAuth.spec.ts | TC-12595 | Password protection success |
| webAuth.spec.ts | TC-12596 | Wrong password shows error |
| webBooks.spec.ts | TC-12597 | Books list with filter |
| webOrders.spec.ts | TC-12598 | Create order via Web UI |
| webStockTheme.spec.ts | TC-12599 | Reset stock button works |
| webStockTheme.spec.ts | TC-12600 | 6 color themes supported |

## Auth Strategy

- **Global Setup**: `globalSetup.ts` performs login with password `qacoe` once and saves `localStorage` to `test-results/.auth.json`
- **Auto Auth**: All tests automatically load auth state except `webAuth.spec.ts` which clears it to test login flow

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

## Dependencies

- `@playwright/test` - Testing framework
- `dotenv` - Environment variable management
- `cross-env` - Cross-platform environment variables

## Reports

- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/junit.xml`
- **Screenshots**: `test-results/web-*.png`

# API Testing with Playwright

## Overview
API testing framework using Playwright for Simple Books API with multi-environment support and JSON schema validation.

## Environment Configuration

| Environment | Config File | Description |
|-------------|-------------|-------------|
| `local` | `.env.local` | Local mock server (`http://localhost:5000`) |
| `sit` | `.env.sit` | System Integration Testing (default) |
| `uat` | `.env.uat` | User Acceptance Testing |

### Environment Variables
- `API_BASE_URL`: Base URL for API
- `ENV`: Environment name (`local` / `sit` / `uat`)

## Installation

```bash
cd tests/api-testing
npm install
npx playwright install
```

## Running Tests

**Script format:** `api:[env]:[suite]:[mode]`

```bash
# Run all tests
npm run api:local:all:cliMode
npm run api:local:all:guiMode
npm run api:sit:all:cliMode
npm run api:uat:all:cliMode

# Run by suite (replace [env] with local / sit / uat)
npm run api:local:SRS01-healthCheck:cliMode       # TC-12569–12570
npm run api:local:SRS01-authentication:cliMode    # TC-12571–12574
npm run api:local:SRS01-books:cliMode             # TC-12575–12581
npm run api:local:SRS01-orders:cliMode            # TC-12582–12591
npm run api:local:SRS01-stockAndBug:cliMode       # TC-12592–12593
npm run api:local:SRS03:cliMode                   # TC-12623–12640
npm run api:local:SRS04-successFlows:cliMode      # TC-12641–12645
npm run api:local:SRS04-failureFlows:cliMode      # TC-12646–12652

# View HTML report
npm run report
```

### Run Specific Test by TC ID

```bash
npx playwright test -g "[TC-12569]"
```

## Project Structure

```
tests/api-testing/
├── .env.sit                  # SIT environment config (default)
├── .env.local                # Local environment config
├── .env.uat                  # UAT environment config
├── playwright.config.ts      # Playwright configuration
├── package.json              # Dependencies & scripts
│
├── helpers/
│   ├── api.helper.ts         # API request wrapper
│   ├── env.helper.ts         # Environment loader
│   └── schema.validator.ts   # AJV JSON schema validator
│
├── fixtures/
│   ├── testdata.sit.ts       # SIT test data
│   ├── testdata.local.ts     # Local test data
│   └── testdata.uat.ts       # UAT test data
│
├── schemas/
│   └── api.schema.ts         # API response schemas
│
├── postman/                  # Postman collection & environments
│
├── pipelines/
│   └── api-pipeline.yaml     # Azure DevOps pipeline
│
└── tests-api/
    ├── SRS01-healthCheck/         # TC-12569–12570
    ├── SRS01-authentication/      # TC-12571–12574
    ├── SRS01-books/               # TC-12575–12581
    ├── SRS01-orders/              # TC-12582–12591
    ├── SRS01-stockAndBug/         # TC-12592–12593
    ├── SRS03-schemaValidation/    # TC-12623–12640
    ├── SRS04-successFlows/        # TC-12641–12645
    └── SRS04-failureFlows/        # TC-12646–12652
```

## Test Coverage

| Suite | PBI | TC IDs | Tests | Description |
|-------|-----|--------|-------|-------------|
| SRS01-healthCheck | PBI-12555 | 12569–12570 | 2 | GET /status — response & cache headers |
| SRS01-authentication | PBI-12556 | 12571–12574 | 4 | Register, duplicate email, missing/invalid token |
| SRS01-books | PBI-12557 | 12575–12581 | 7 | List, filter by type/limit, detail, not found |
| SRS01-orders | PBI-12558 | 12582–12591 | 10 | Create, list, detail, update, delete (CRUD) |
| SRS01-stockAndBug | PBI-12559 | 12592–12593 | 2 | Stock reset, BUG-01 (bookId=3 bypasses check) |
| SRS03-schemaValidation | PBI-12555–12559 | 12623–12640 | 18 | JSON schema validation for all endpoints |
| SRS04-successFlows | PBI-12567 | 12641–12645 | 5 | S1 order, S2 update, S3 delete, state transition |
| SRS04-failureFlows | PBI-12568 | 12646–12652 | 7 | F1 out-of-stock, F2/F3 deleted order, F4 auth |
| **Total** | | **12569–12652** | **55** | |

## Known Bug

**BUG-01** (TC-12593): `bookId=3` bypasses stock check — POST /orders returns `201` even when `current-stock=0`. Test documents actual (buggy) behavior.

## Dependencies

- `@playwright/test` - Testing framework
- `ajv` & `ajv-formats` - JSON schema validation
- `dotenv` - Environment variable management
- `cross-env` - Cross-platform environment variables

## Reports

- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/junit.xml`

# Web UI E2E Testing with Playwright

## Overview
End-to-end testing framework using Playwright with Page Object Model, multi-environment support (SIT/UAT), database integration, and organized test structure with comprehensive reporting and CI/CD pipeline support.

## Environment Configuration

### Available Environments
- **LOCAL**: `.env.local` - Development environment
- **SIT** (default): `.env` - System Integration Testing
- **UAT**: `.env.uat` - User Acceptance Testing

### Environment Variables
- `BASE_URL`: Base URL for web application
- `ENV`: Environment name (sit/uat)
- `BROWSER`: Browser to use (chromium/firefox/webkit)
- `HEADLESS`: Run in headless mode (true/false)
- `TIMEOUT`: Default timeout for actions (ms)
- `VIEWPORT_WIDTH`: Browser viewport width
- `VIEWPORT_HEIGHT`: Browser viewport height

## Running Tests

**Prerequisites:** Navigate to the project directory first
```bash
cd tests/web-testing
```

### Test Commands

```bash
# Default (SIT)
npm test

# Local Environment
npm run test:local

# UAT Environment
npm run test:uat

# Smoke tests
npm run test:smoke              # SIT
npm run test:smoke:local        # Local
npm run test:smoke:uat          # UAT

# Regression tests
npm run test:regression         # SIT
npm run test:regression:local   # Local
npm run test:regression:uat     # UAT

# Feature tests
npm run test:feature-1          # SIT
npm run test:feature-1:local    # Local
npm run test:feature-1:uat      # UAT

# Debug mode
npm run test:debug

# UI mode (interactive)
npm run test:ui

# With headed browser
npm run test:headed

# View HTML report
npm run report
```

### Run Specific Test Files

```bash
# Run single test file
npx playwright test login

# Run with full path
npx playwright test tests-web/feature-1/login.spec.ts

# Run specific test by name
npx playwright test -g "should login successfully"

# Run on UAT with specific file
npm run test:uat -- feature-1/login
```

## Test Tags
- `@smoke` - Critical tests for quick validation
- `@regression` - Full regression test suite
- `@critical` - Business critical functionality
- `@integration` - Integration tests
- `@performance` - Performance related tests
- `@accessibility` - Accessibility compliance tests

## Project Structure

```
tests/web-testing/
├── .env                      # SIT environment config (default)
├── .env.local                # Local environment config
├── .env.uat                  # UAT environment config
├── playwright.config.ts      # Playwright configuration
├── package.json              # Dependencies & scripts
│
├── pipelines/                # CI/CD pipeline configurations
│   └── web-pipeline.yaml     # Azure DevOps pipeline
│
├── pages/                    # Page Object Model
│   ├── BasePage.ts           # Base page with common methods
│   ├── LoginPage.ts          # Login page objects
│   └── DashboardPage.ts      # Dashboard page objects
│
├── fixtures/                 # Test data per environment
│   ├── testdata.sit.json     # SIT test data (default)
│   ├── testdata.local.json   # Local test data
│   └── testdata.uat.json     # UAT test data
│
├── db-scripts/               # Database setup scripts
│   ├── setup.sit.sql         # SIT database setup
│   ├── setup.local.sql       # Local database setup
│   ├── setup.uat.sql         # UAT database setup
│   ├── cleanup.sql           # Cleanup script
│   └── README.md             # DB scripts documentation
│
├── helpers/                  # Utility functions
│   ├── testDataLoader.ts     # Test data loader
│   └── databaseHelper.ts     # Database helper
│
└── tests-web/                 # Test files organized by features
    ├── feature-1/            # Feature 1 tests (Login, Auth)
    │   └── login.spec.ts
    ├── feature-2/            # Feature 2 tests (User Management)
    │   └── user-management.spec.ts
    ├── feature-3/            # Feature 3 tests (Dashboard)
    │   └── dashboard.spec.ts
    └── tagged-tests.spec.ts  # Smoke & regression tests
```

## Features

### 1. Page Object Model (POM)
- Separation of test logic and page elements
- Reusable page objects
- Easy maintenance
- BasePage with common methods

### 2. Multi-Environment Support
- Three environments: LOCAL, SIT (default), UAT
- Separate configuration files per environment
- Environment-specific test data
- Easy switching via npm scripts

### 3. Test Organization
- Tests grouped by features
- Tagged tests for selective execution
- Smoke tests for quick validation
- Regression suite for comprehensive testing

### 4. Enhanced Reporting
- HTML report with screenshots
- JSON report for CI/CD integration
- Console output for real-time feedback
- Screenshots on failure
- Video recording on failure

### 6. CI/CD Integration
- Azure DevOps pipeline configuration
- Automated test execution on PR/merge
- Test result publishing
- Artifact management
- Slack/Teams notifications

### 7. Performance & Accessibility
- Performance metrics collection
- Accessibility testing with axe-core
- Lighthouse integration
- Core Web Vitals monitoring

## Using Page Objects

### Example Test with POM

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { getTestData } from '../../helpers/testDataLoader';

test.describe('Login Feature', () => {
  test('should login successfully', async ({ page }) => {
    const testData = getTestData();
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    await loginPage.goto('/login');
    await loginPage.login(
      testData.users.user.username,
      testData.users.user.password
    );
    
    expect(await dashboardPage.isWelcomeMessageVisible()).toBeTruthy();
  });
});
```

### Creating New Page Objects

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class YourPage extends BasePage {
  private element: Locator;

  constructor(page: Page) {
    super(page);
    this.element = page.locator('#element-id');
  }

  async yourMethod() {
    await this.element.click();
  }
}
```

## Dependencies

- `@playwright/test` - Testing framework
- `@axe-core/playwright` - Accessibility testing
- `dotenv` - Environment variable management
- `cross-env` - Cross-platform environment variables
- `lighthouse` - Performance auditing

## Reports

- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/junit.xml`
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Traces**: Available for failed tests
- **Performance Reports**: Lighthouse audits
- **Accessibility Reports**: axe-core results

## Best Practices

1. **Use Page Objects** - Keep selectors and actions in page objects
2. **Use Test Data Files** - Store test data in fixtures
3. **Tag Your Tests** - Use @smoke, @regression, @critical tags
4. **Group by Features** - Organize tests in feature folders
5. **Use Descriptive Names** - Clear test and method names
6. **Wait Properly** - Use Playwright's auto-waiting features
7. **Database Setup** - Use db-scripts for test data preparation
8. **Accessibility First** - Include accessibility tests in your suite
9. **Performance Monitoring** - Monitor Core Web Vitals
10. **CI/CD Integration** - Automate test execution in pipelines

## CI/CD Pipeline

The project includes Azure DevOps pipeline configuration:

```yaml
# pipelines/web-pipeline.yaml
trigger:
  branches:
    include:
      - main
      - develop
  paths:
    include:
      - tests/web-testing/**

stages:
  - stage: Test
    jobs:
      - job: WebUITests
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '18.x'
          - script: npm ci
            workingDirectory: tests/web-testing
          - script: npx playwright install
            workingDirectory: tests/web-testing
          - script: npm run test:smoke
            workingDirectory: tests/web-testing
          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'test-results/results.xml'
```

## Database Setup

SQL scripts are located in `db-scripts/` folder:

```typescript
import { DatabaseHelper } from '../helpers/databaseHelper';

test.beforeAll(async () => {
  const db = new DatabaseHelper();
  await db.setupDatabase('sit'); // or 'local' or 'uat'
});

test.afterAll(async () => {
  const db = new DatabaseHelper();
  await db.cleanupDatabase();
});
```

See [db-scripts/README.md](db-scripts/README.md) for more details.

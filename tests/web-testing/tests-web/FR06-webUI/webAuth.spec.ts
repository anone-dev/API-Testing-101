import { test, expect } from '@playwright/test';
import { BooksAppPage } from '../../pages/BooksAppPage';
import { getTestData } from '../../helpers/testDataLoader';

// @Feature: WebUI Authentication
test.describe('[PBI-12560] FR-06: Web UI', () => {
  let app: BooksAppPage;
  const td = getTestData();

  test.beforeEach(async ({ page, context }) => {
    // Clear auth to test login flow from scratch
    app = new BooksAppPage(page);
    await app.goto('/ui.html');
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-12595] Web UI password protection success', async ({ page }) => {
    // 📝 Arrange
    await page.screenshot({ path: 'test-results/web-auth-before.png' });

    // ✅ Assert - password modal visible
    await expect(app.passwordModal).toBeVisible();
    await expect(app.passwordInput).toBeVisible();
    await expect(app.passwordSubmit).toBeVisible();

    // 🎬 Act
    await app.login(td.webUI.password);

    // ✅ Assert - main UI accessible
    await expect(app.passwordModal).toBeHidden();
    await expect(app.booksTab).toBeVisible();

    await page.screenshot({ path: 'test-results/web-auth-success.png' });
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12596] Web UI wrong password shows error', async ({ page }) => {
    // 🎬 Act
    await app.login(td.webUI.wrongPassword);

    // ✅ Assert - error shown, modal still visible
    await expect(app.passwordError).toBeVisible();
    await expect(app.passwordModal).toBeVisible();

    await page.screenshot({ path: 'test-results/web-auth-error.png' });
  });
});

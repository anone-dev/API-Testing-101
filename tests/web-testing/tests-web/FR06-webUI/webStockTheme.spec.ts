import { test, expect } from '@playwright/test';
import { BooksAppPage } from '../../pages/BooksAppPage';
import { getTestData } from '../../helpers/testDataLoader';

// @Feature: WebUI Stock & Theme
test.describe('[PBI-12560] FR-06: Web UI', () => {
  let app: BooksAppPage;
  const td = getTestData();

  test.beforeEach(async ({ page }) => {
    app = new BooksAppPage(page);
    await app.goto('/ui.html');
  });

  // @Important: Medium
  // @Scenario: Success
  test('[TC-12599] Reset stock button works', async ({ page }) => {
    // 📝 Arrange - register to get token
    const email = `${td.stockReset.emailPrefix}_${Date.now()}@example.com`;
    await app.register(email, td.stockReset.name);
    await expect(app.tokenDisplay).toBeVisible();

    await page.screenshot({ path: 'test-results/web-stock-before.png' });

    // 🎬 Act - click reset stock
    await app.resetStockButton.click();

    // ✅ Assert - success alert and books reload
    await expect(app.alertSuccess()).toBeVisible();
    await page.waitForTimeout(500);
    await expect(app.bookCard(1)).toBeVisible();
    await expect(app.bookStatusBadge(1)).toContainText('Available');

    await page.screenshot({ path: 'test-results/web-stock-reset.png' });
  });

  // @Important: Low
  // @Scenario: Success
  test('[TC-12600] Web UI supports 6 color themes', async ({ page }) => {
    // ✅ Assert - 6 theme options exist
    await expect(app.colorTheme).toBeVisible();
    await expect(app.colorTheme.locator('option')).toHaveCount(6);

    // 🎬 Act & Assert - cycle through all 6 themes
    for (const value of ['1', '2', '3', '4', '5', '6']) {
      await app.colorTheme.selectOption(value);
      await expect(app.colorTheme).toHaveValue(value);
    }

    await page.screenshot({ path: 'test-results/web-theme.png' });
  });
});

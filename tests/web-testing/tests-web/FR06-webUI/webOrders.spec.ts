import { test, expect } from '@playwright/test';
import { BooksAppPage } from '../../pages/BooksAppPage';
import { getTestData } from '../../helpers/testDataLoader';

// @Feature: WebUI Orders
test.describe('[PBI-12560] FR-06: Web UI', () => {
  let app: BooksAppPage;
  const td = getTestData();

  test.beforeEach(async ({ page }) => {
    app = new BooksAppPage(page);
    await app.goto('/ui.html');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12598] Create order via Web UI', async ({ page }) => {
    // 📝 Arrange - register to get token
    const email = `${td.register.emailPrefix}_${Date.now()}@example.com`;
    await app.register(email, td.register.name);
    await expect(app.tokenDisplay).toBeVisible();

    // 🎬 Act - navigate to orders tab
    await app.ordersTab.click();
    await expect(app.orderBookId).toBeVisible();

    await page.screenshot({ path: 'test-results/web-orders-before.png' });

    // 🎬 Act - create order
    await app.createOrder(String(td.order.bookId), td.order.customerName);

    // ✅ Assert - success alert shown
    await expect(app.alertSuccess()).toBeVisible();

    // ✅ Assert - order appears in list
    await page.waitForTimeout(500);
    await expect(app.allOrderItems().first()).toBeVisible();

    await page.screenshot({ path: 'test-results/web-orders-created.png' });
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12654] Create order reduces book stock in Web UI', async ({ page }) => {
    // 📝 Arrange - register and reset stock for clean state
    const email = `${td.register.emailPrefix}_stock_${Date.now()}@example.com`;
    await app.register(email, td.register.name);
    await expect(app.tokenDisplay).toBeVisible();
    await app.resetStockButton.click();
    await expect(app.alertSuccess()).toBeVisible();

    // 📝 Arrange - get stock before order via book detail
    await app.bookCard(td.order.bookId).click();
    const stockBefore = await page.getByTestId('detail-value-stock').textContent();
    await page.getByTestId('modal-close').click();

    await page.screenshot({ path: 'test-results/web-stock-before-order.png' });

    // 🎬 Act - create order
    await app.ordersTab.click();
    await app.createOrder(String(td.order.bookId), td.order.customerName);
    await expect(app.alertSuccess()).toBeVisible();

    // ✅ Assert - stock reduced
    await app.booksTab.click();
    await app.bookCard(td.order.bookId).click();
    const stockDetail = page.getByTestId('detail-value-stock');
    await expect(stockDetail).not.toHaveText(stockBefore!);
    const stockAfter = await stockDetail.textContent();

    const before = parseInt(stockBefore!);
    const after = parseInt(stockAfter!);
    expect(after).toBe(before - 1);

    await page.screenshot({ path: 'test-results/web-stock-after-order.png' });
  });

  // @Important: High
  // @Scenario: Alternative
  test('[TC-12655] Order out-of-stock book shows error in Web UI', async ({ page }) => {
    // 📝 Arrange - register to get token (bookId=2 has stock=0 by default)
    const email = `${td.register.emailPrefix}_oos_${Date.now()}@example.com`;
    await app.register(email, td.register.name);
    await expect(app.tokenDisplay).toBeVisible();

    // 🎬 Act - navigate to orders tab and order out-of-stock book
    await app.ordersTab.click();
    await app.createOrder(String(td.outOfStockBookId), td.order.customerName);

    await page.screenshot({ path: 'test-results/web-orders-oos.png' });

    // ✅ Assert - error alert shown
    await expect(page.locator('[data-testid="alert-error"]')).toBeVisible();

    // ✅ Assert - no order created in list
    await page.waitForTimeout(500);
    await expect(app.allOrderItems()).toHaveCount(0);
  });
});

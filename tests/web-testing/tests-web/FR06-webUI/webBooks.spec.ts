import { test, expect } from '@playwright/test';
import { BooksAppPage } from '../../pages/BooksAppPage';

// @Feature: WebUI Books
test.describe('[PBI-12560] FR-06: Web UI', () => {
  let app: BooksAppPage;

  test.beforeEach(async ({ page }) => {
    app = new BooksAppPage(page);
    await app.goto('/ui.html');
  });

  // @Important: High
  // @Scenario: Success
  test('[TC-12597] Books tab shows book list with filter', async ({ page }) => {
    // 📝 Arrange - already on books tab by default
    await page.screenshot({ path: 'test-results/web-books-before.png' });

    // ✅ Assert - books loaded
    await expect(app.booksList).toBeVisible();
    await expect(app.bookCard(1)).toBeVisible();

    // 🎬 Act - filter by fiction
    await app.filterBooks('fiction');
    await page.waitForTimeout(500);

    // ✅ Assert - only fiction books shown
    const typeBadges = app.allBookTypeBadges();
    const count = await typeBadges.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(typeBadges.nth(i)).toHaveText('fiction');
    }

    // 🎬 Act - filter by limit=3
    await app.filterBooks('', '3');
    await page.waitForTimeout(500);

    // ✅ Assert - max 3 books shown
    await expect(app.allBookCards()).toHaveCount(3);

    await page.screenshot({ path: 'test-results/web-books-filtered.png' });
  });
});

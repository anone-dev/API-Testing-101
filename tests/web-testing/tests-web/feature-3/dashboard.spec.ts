import { test, expect } from '@playwright/test';
import { getTestData } from '../../helpers/testDataLoader';

test.describe('Feature 3 - Dashboard', () => {
  test('should display dashboard', async ({ page }) => {
    const testData = getTestData();
    
    await page.goto('/dashboard');
    // Add your test steps here
  });
});

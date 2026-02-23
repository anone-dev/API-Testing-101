import { test, expect } from '@playwright/test';
import { getTestData } from '../../helpers/testDataLoader';

test.describe('Feature 2 - User Management', () => {
  test('should create user', async ({ page }) => {
    const testData = getTestData();
    
    await page.goto('/users');
    // Add your test steps here
  });
});

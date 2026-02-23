import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { getTestData } from '../../helpers/testDataLoader';

// @Feature: Login
test.describe('[PBI-001] Feature 1 - User Login', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
  });

  // @Important: Critical
  // @Scenario: Success
  test('[TC-001] should login successfully with valid credentials', async ({ page }) => {
    // 📝 Arrange - Setup test data
    const testData = getTestData();
    const validUser = testData.users.validUser;
    
    // 📸 Screenshot - Before action
    await page.screenshot({ path: 'test-results/login-before.png' });
    
    // 🎬 Act - Perform login action
    await loginPage.login(validUser.username, validUser.password);
    
    // ✅ Assert - Verify successful login
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('.welcome-message')).toBeVisible();
    
    // 📸 Screenshot - After action
    await page.screenshot({ path: 'test-results/login-after.png' });
  });

  // @Important: High
  // @Scenario: Error
  test('[TC-002] should display error message with invalid credentials', async ({ page }) => {
    // 📝 Arrange - Setup test data
    const testData = getTestData();
    const invalidUser = testData.users.invalidUser;
    
    // 🎬 Act - Perform login with invalid credentials
    await loginPage.login(invalidUser.username, invalidUser.password);
    
    // ✅ Assert - Verify error message is displayed
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
  });

  // @Important: Medium
  // @Scenario: Alternative
  test('[TC-003] should display validation error for empty fields', async ({ page }) => {
    // 📝 Arrange - No test data needed
    
    // 🎬 Act - Click login without entering credentials
    await page.click('button[type="submit"]');
    
    // ✅ Assert - Verify validation errors
    await expect(page.locator('.validation-error')).toBeVisible();
    await expect(page.locator('#username-error')).toHaveText('Username is required');
    await expect(page.locator('#password-error')).toHaveText('Password is required');
  });
});

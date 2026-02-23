import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Smoke Tests @smoke', () => {
  test('Verify login page loads', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await test.step('Navigate to login page', async () => {
      await loginPage.goto('/login');
    });
    
    await test.step('Verify login button is visible', async () => {
      expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
    });
  });

  test('Verify successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    await test.step('Navigate to login page', async () => {
      await loginPage.goto('/login');
    });
    
    await test.step('Login with valid credentials', async () => {
      await loginPage.login('testuser', 'password123');
    });
    
    await test.step('Verify welcome message is displayed', async () => {
      expect(await dashboardPage.isWelcomeMessageVisible()).toBeTruthy();
    });
  });
});

test.describe('Regression Tests @regression', () => {
  test('Complete login flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    await test.step('Navigate to login page', async () => {
      await loginPage.goto('/login');
    });
    
    await test.step('Login with credentials', async () => {
      await loginPage.login('testuser', 'password123');
    });
    
    await test.step('Wait for dashboard to load', async () => {
      await dashboardPage.waitForPageLoad();
    });
    
    await test.step('Verify welcome message contains "Welcome"', async () => {
      const message = await dashboardPage.getWelcomeMessage();
      expect(message).toContain('Welcome');
    });
  });

  test('Logout functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    await test.step('Navigate to login page', async () => {
      await loginPage.goto('/login');
    });
    
    await test.step('Login to application', async () => {
      await loginPage.login('testuser', 'password123');
    });
    
    await test.step('Click logout button', async () => {
      await dashboardPage.logout();
    });
    
    await test.step('Verify redirected to login page', async () => {
      expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
    });
  });
});

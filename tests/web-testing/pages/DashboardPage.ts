import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private welcomeMessage: Locator;
  private logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.locator('.welcome-message');
    this.logoutButton = page.locator('button:has-text("Logout")');
  }

  async getWelcomeMessage() {
    return await this.welcomeMessage.textContent();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async isWelcomeMessageVisible() {
    return await this.welcomeMessage.isVisible();
  }
}

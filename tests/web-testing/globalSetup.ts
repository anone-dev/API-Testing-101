import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseURL = process.env.BASE_URL || 'http://localhost:8000';
  await page.goto(`${baseURL}/ui.html`);
  await page.getByTestId('password-input').fill('qacoe');
  await page.getByTestId('password-submit').click();
  await page.getByTestId('password-modal').waitFor({ state: 'hidden' });

  await context.storageState({ path: 'test-results/.auth.json' });
  await browser.close();
}

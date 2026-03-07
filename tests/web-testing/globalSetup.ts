import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.ENV || 'sit';
const envFile = `.env.${env.toLowerCase()}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseURL = process.env.BASE_URL || 'http://localhost:8000';
  const password = process.env.PASSWORD || 'qacoe';
  
  await page.goto(`${baseURL}/ui.html`);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('password-submit').click();
  await page.getByTestId('password-modal').waitFor({ state: 'hidden' });

  await context.storageState({ path: 'test-results/.auth.json' });
  await browser.close();
}

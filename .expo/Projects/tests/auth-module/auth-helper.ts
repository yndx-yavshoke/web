import { Page } from '@playwright/test';
// import path from 'path';

export class AuthHelper {
  static async loginAndSaveState(
    page: Page,
    credentials: { email: string; password: string },
    statePath = 'auth-state.json'
  ): Promise<void> {
    await page.goto('https://yavshok.ru/login');
    await page.getByTestId('login-email-input').fill(credentials.email);
    await page.getByTestId('login-password-input').fill(credentials.password);
    await page.getByTestId("login-submit-button").click();
    await page.waitForURL('/');
    await page.context().storageState({ path: statePath });
  }
}
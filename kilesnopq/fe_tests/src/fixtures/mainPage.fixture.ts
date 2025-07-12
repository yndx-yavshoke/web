import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{ mainPage: LoginPage }>({
  mainPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://yavshok.ru/');
    await use(loginPage);
  },
});

export { expect } from '@playwright/test'; 
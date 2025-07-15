import { test as base } from '@playwright/test';
import { ShokMainPage } from './ShokMainPage';
import { ShokRegisterPage } from './ShokRegisterPage';
import { ShokLoginPage } from './ShokLoginPage';

export const test = base.extend<{
  mainPage: ShokMainPage;
  registerPage: ShokRegisterPage;
  loginPage: ShokLoginPage;
}>({
  mainPage: async ({ page }, use) => {
    await use(new ShokMainPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new ShokRegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new ShokLoginPage(page));
  },
});
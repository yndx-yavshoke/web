import { test as base } from '@playwright/test';
import { personalPage } from './personalPage';
import { editNamePage } from './editNamePage';
import { loginPage } from './loginPage';

export const test = base.extend<{
  personalPage: personalPage;
  editNamePage: editNamePage;
  //   loginPage: ShokLoginPage;
}>({
  personalPage: async ({ page }, use) => {
    await use(new personalPage(page));
  },

  editNamePage: async ({ page }, use) => {
    await use(new editNamePage(page));
  },

  //   loginPage: async ({ page }, use) => {
  //     await use(new ShokLoginPage(page));
  //   },
});
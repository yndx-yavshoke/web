import { test as base } from '@playwright/test';
import { ShokPersonalPage } from './ShokPersonalPage';
import { ShokEditNamePage } from './ShokEditNamePage';
import { ShokLoginPage } from './ShokLoginPage';

export const test = base.extend<{
  personalPage: ShokPersonalPage;
  editNamePage: ShokEditNamePage;
  //   loginPage: ShokLoginPage;
}>({
  personalPage: async ({ page }, use) => {
    await use(new ShokPersonalPage(page));
  },

  editNamePage: async ({ page }, use) => {
    await use(new ShokEditNamePage(page));
  },

  //   loginPage: async ({ page }, use) => {
  //     await use(new ShokLoginPage(page));
  //   },
});

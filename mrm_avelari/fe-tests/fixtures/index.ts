import { ShokMainPage } from './pages/ShokMainPage';
import { ShokAuthPage } from './pages/ShokAuthPage';
import { ShokProfilePage } from './pages/ShokProfilePage';
import { ShokEditProfilePage } from './pages/ShokEditProfilePage';
import { ShockRegisterPage } from './pages/ShokRegisterPage';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from '../constants/env';
import { test as base } from '@playwright/test';

type ShokFixtures = {
  mainPage: ShokMainPage;
  authPage: ShokAuthPage;
  profilePage: ShokProfilePage;
  editProfilePage: ShokEditProfilePage;
  registerPage: ShockRegisterPage;
  testEmail: string;
  testPassword: string;
};

export const test = base.extend<ShokFixtures>({
  mainPage: async ({ page, storageState }, use) => {
    const mainPage = new ShokMainPage(page);
    await mainPage.clearAuth();
    await use(mainPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new ShockRegisterPage(page);
    await use(registerPage);
  },

  authPage: async ({ page }, use) => {
    const authPage = new ShokAuthPage(page);

    await use(authPage);
  },

  profilePage: async ({ page }, use) => {
    await use(new ShokProfilePage(page));
  },

  editProfilePage: async ({ page }, use) => {
    await use(new ShokEditProfilePage(page));
  },

  testEmail: async ({}, use) => {
    await use(TEST_USER_EMAIL);
  },

  testPassword: async ({}, use) => {
    await use(TEST_USER_PASSWORD);
  },
});

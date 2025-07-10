import { ShokMainPage } from './ShokMainPage';
import { ShokLoginPage } from './ShokLoginPage';
import { ShokRegistrPage } from './ShokRegistrPage';
import { ShokProfilePage } from './ShokProfilePage';
import { test as base } from '@playwright/test';

type ShokFixtures = {
  mainPage: ShokMainPage;
  loginPage: ShokLoginPage;
  registrPage: ShokRegistrPage;
  profilePage: ShokProfilePage;
};

export const test = base.extend<ShokFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new ShokMainPage(page);

    use(mainPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new ShokLoginPage(page);

    use(loginPage);
  },

  registrPage: async ({ page }, use) => {
    const registrPage = new ShokRegistrPage(page);

    use(registrPage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ShokProfilePage(page);

    use(profilePage);
  },
});

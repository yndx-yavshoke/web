import { ShokMainPage } from "./ShokMainPage";
import { ShokProfilePage } from "./ShokProfilePage";
import { test as base } from "@playwright/test";

type ShokFixtures = {
    mainPage: ShokMainPage;
    profilePage: ShokProfilePage;
}

export const test = base.extend<ShokFixtures>({
    mainPage: async ({ page }, use) => {
        await use(new ShokMainPage(page));
  },
    profilePage: async ({ page }, use) => {
    await use(new ShokProfilePage(page));
  }
});

export { expect } from '@playwright/test';
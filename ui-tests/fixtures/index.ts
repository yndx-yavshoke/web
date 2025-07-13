import { test as base, expect } from "@playwright/test";
import { MainPage } from "./MainPage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { UserProfilePage } from "./UserProfilePage";

type ShokFixtures = {
  mainPage: MainPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  userProfilePage: UserProfilePage;
};

export const test = base.extend<ShokFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  userProfilePage: async ({ page }, use) => {
    const userProfilePage = new UserProfilePage(page);
    await use(userProfilePage);
  },
});

export { expect };

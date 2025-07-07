import { test as base } from '@playwright/test';
import { ShockMainPage } from "./ShockMainPage";
import { ShockLoginPage } from "./ShockLoginPage";
import { ShockRegisterPage } from "./ShockRegisterPage";
import { ShockProfilePage } from "./ShockProfilePage";
import { ShockEditPage } from "./ShockEditPage";
type ShockFixtures ={
    mainPage: ShockMainPage;
    loginPage: ShockLoginPage;
    registerPage: ShockRegisterPage;
    profilePage: ShockProfilePage;
    editPage: ShockEditPage;
};

export const test = base.extend<ShockFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new ShockMainPage(page);
        use(mainPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new ShockLoginPage(page);
        use(loginPage);
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new ShockRegisterPage(page);
        use(registerPage);
    },
    profilePage: async ({ page }, use) => {
        const profilePage = new ShockProfilePage(page);
        use(profilePage);
    },
    editPage: async ({ page }, use) => {
        const editPage = new ShockEditPage(page);
        use(editPage);
    }
});

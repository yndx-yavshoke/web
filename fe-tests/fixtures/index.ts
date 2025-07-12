import { test as base } from '@playwright/test';
import { ShokEditPage } from "./ShokEditPage";
import { ShokLoginPage } from "./ShokLoginPage";
import { ShokMainPage } from "./ShokMainPage";
import { ShokProfilePage } from "./ShokProfilePage";
import { ShokRegistrationPage } from "./ShokRegistrationPage";
type ShokFixtures ={
    editPage: ShokEditPage;
    loginPage: ShokLoginPage;
    mainPage: ShokMainPage;
    profilePage: ShokProfilePage;
    registrationPage: ShokRegistrationPage;
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
    registrationPage: async ({ page }, use) => {
        const registrationPage = new ShokRegistrationPage(page);
        use(registrationPage);
    },
    profilePage: async ({ page }, use) => {
        const profilePage = new ShokProfilePage(page);
        use(profilePage);
    },
    editPage: async ({ page }, use) => {
        const editPage = new ShokEditPage(page);
        use(editPage);
    }
});
import { ShokMainPage } from "./ShokMainPage";
import { ShokLoginPage } from "./ShokLoginPage";
import { ShokRegisterPage } from "./ShokRegisterPage";
import { ShokUserProfilePage } from "./ShokUserProfilePage";
import { ShokEditPage } from "./ShokEditPage";
import { test as base } from "@playwright/test";

type ShokFixtures = {
    mainPage: ShokMainPage;
    loginPage: ShokLoginPage;
    registerPage: ShokRegisterPage;
    userProfilePage: ShokUserProfilePage;
    editPage: ShokEditPage;
};

export const test = base.extend<ShokFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new ShokMainPage(page);

        await use(mainPage);
    },


    loginPage: async ({ page }, use) => {
        const loginPage = new ShokLoginPage(page);

        await use(loginPage);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new ShokRegisterPage(page);

        await use(registerPage);
    },

    userProfilePage: async ({ page }, use) => {
        const userProfilePage = new ShokUserProfilePage(page);

        await use(userProfilePage);
    },

    editPage: async ({ page }, use) => {
        const editPage = new ShokEditPage(page);

        await use(editPage);
    }

})

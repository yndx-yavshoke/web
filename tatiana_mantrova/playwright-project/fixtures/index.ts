import { ShokMainPage } from "./ShokMainPage";
import { ShokLoginPage } from "./ShokLoginPage";
import { ShokRegistrationPage } from "./ShokRegistrationPage";
import { ShokUserPage } from "./ShokUserPage";
import { ShokEditProfilePage } from "./ShokEditProfilePage";
import { test as base } from "@playwright/test";

type ShokFixtures = {
    mainPage: ShokMainPage;
    loginPage: ShokLoginPage;
    registrationPage: ShokRegistrationPage;
    userPage: ShokUserPage;
    editProfilePage: ShokEditProfilePage;
};

export const test = base.extend<ShokFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new ShokMainPage(page);

        await use(mainPage)
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new ShokLoginPage(page);

        await use(loginPage)
    },

    registrationPage: async ({ page }, use) => {
        const registrationPage = new ShokRegistrationPage(page);

        await use(registrationPage)
    },

    userPage: async ({ page }, use) => {
        const userPage = new ShokUserPage(page);

        await use(userPage)
    },

    editProfilePage: async ({ page }, use) => {
        const editProfilePage = new ShokEditProfilePage(page);

        await use(editProfilePage)
    },
});
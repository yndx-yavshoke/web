import { unescape } from "querystring";
import { ShockMainPage } from "./MainPage";
import { ShockProfilePage } from "./ProfilePage";
import { ShockChangeNamePage } from "./ChangeNamePage";
import { ShockRegPage } from "./RegPage";
import { test as base } from "@playwright/test";
import { ShockLoginPage } from "./LoginPage";

type ShockFixtures = {
    mainPage: ShockMainPage;
    loginPage: ShockLoginPage;
    profilePage: ShockProfilePage;
    changeNamePage: ShockChangeNamePage;
    regPage: ShockRegPage;
}

export const test = base.extend<ShockFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new ShockMainPage(page);
        await mainPage.open();
        await use(mainPage);
    },

    profilePage: async ({ page }, use) => {
        const profilePage = new ShockProfilePage(page);
        await use(profilePage);
    },

    regPage: async ({ page }, use) => {
        const regPage = new ShockRegPage(page);
        await use(regPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new ShockLoginPage(page);
        await use(loginPage);
    },

    changeNamePage: async ({ page }, use) => {
        const changeNamePage = new ShockChangeNamePage(page);
        await use(changeNamePage);
    },

});


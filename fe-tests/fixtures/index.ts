import {ShokMainPage} from "./ShokMainPage";
import {ShokLoginPage} from "./ShokLoginPage";
import {test as base} from '@playwright/test'
import { ShokRegistPage } from "./ShokRegistPage";
import { ShokProfilePage } from "./ShokProfilePage";
import { ShokEditPage } from "./ShokEditPage";

type ShokFixtures = {
    mainPage: ShokMainPage;
    loginPage: ShokLoginPage;
    registPage: ShokRegistPage;
    profilePage: ShokProfilePage;
    editPage: ShokEditPage;
}

export const test = base.extend<ShokFixtures>({
    mainPage: async ({page}, use) =>{
        const mainPage = new ShokMainPage(page);

        use (mainPage)
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new ShokLoginPage(page);
        await use(loginPage);
    },

    registPage: async ({ page }, use) => {
        const registPage = new ShokRegistPage(page);
        await use(registPage);
    },

    profilePage: async ({ page }, use) => {
        const profilePage = new ShokProfilePage(page);
        await use(profilePage);
    },

    editPage: async ({ page }, use) => {
        const editPage = new ShokEditPage(page);
        await use(editPage);
    },
})
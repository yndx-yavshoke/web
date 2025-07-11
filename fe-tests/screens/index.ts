import { ShokMainPage } from "./ShokMainPage";
import { ShokAutorizePage } from "./ShokAutorizePage";
import { ShokRegistrationPage } from "./ShokRegistrationPage";
import { ShokUserPage } from "./ShokUserPage";
import { test as base } from "@playwright/test";
import { ShokEditPage } from "./ShokEditPage";

type ShokFixtures = {
    mainPage: ShokMainPage,
    autorizePage: ShokAutorizePage,
    registrationPage: ShokRegistrationPage,
    userPage: ShokUserPage,
    editPage: ShokEditPage
}

export const test = base.extend<ShokFixtures>({
    mainPage: async ({page}, use) => {
        const mainPage = new ShokMainPage(page);
        //mainPage.open();
        use (mainPage);
    },
    autorizePage: async ({page}, use) => {
        const autorizePage = new ShokAutorizePage(page);
        use (autorizePage);
    },
    registrationPage: async ({page}, use) => {
        const registrationPage = new ShokRegistrationPage(page);
        use (registrationPage);
    },
    userPage: async ({page}, use) => {
        const userPage = new ShokUserPage(page);
        use (userPage);
    },
    editPage: async ({page}, use) => {
        const editPage = new ShokEditPage(page);
        use (editPage);
    }
})
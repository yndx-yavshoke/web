import { ShokMainPage } from "./ShokMainPage";
import { ShokProfilePage } from "./ShokProfilePage";
import { CheckShokPage } from "./CheckShokPage";
import { ShokLoginPage } from "./ShokLoginPage";
import { test as base } from "@playwright/test"

type ShokFixtures = {
    mainPage: ShokMainPage;
    profilePage: ShokProfilePage;
    checkPage: CheckShokPage;
    loginPage: ShokLoginPage;
}

export const test = base.extend<ShokFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new ShokMainPage(page);

        use (mainPage)
    },
    profilePage: async ({ page }, use) => {
        const profilePage = new ShokProfilePage(page);

        use (profilePage)
    },
    checkPage: async ({ page }, use) => {
        const checkPage = new CheckShokPage(page);

        use (checkPage)
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new ShokLoginPage (page);

        use (loginPage)
    }

})
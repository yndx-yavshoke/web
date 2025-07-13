import { ShockMainPage } from "./ShockMainPage";
import { ShockLoginPage } from "./ShockLoginPage";
import { ChangeNamePage } from "./ChangeNamePage";
import { RegisterPage } from "./RegisterPage";
import { test as base } from "@playwright/test";

type ShockFixtures = {
    mainPage: ShockMainPage;
    loginPage: ShockLoginPage;
    changeNamePage: ChangeNamePage;
    registerPage: RegisterPage;
}

export const test = base.extend<ShockFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new ShockMainPage(page);

        use(mainPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new ShockLoginPage(page);

        use(loginPage);
    },

    changeNamePage: async ({ page }, use) => {
        const changeNamePage = new ChangeNamePage(page);

        use(changeNamePage);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);

        use(registerPage);
    }
})

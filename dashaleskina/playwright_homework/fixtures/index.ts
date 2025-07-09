import { ShokMainPage } from "./ShokMainPage";
import { ShokLoginPage } from "./ShokLoginPage";
import { ShokUserAccountPage } from "./ShokUserAccountPage";
import { ShokRegisterPage } from "./ShokRegisterPage";
import { ShokEditProfilePage } from "./ShokEditProfilePage";
import { test as base } from "@playwright/test"


type ShokFixtures = {
    mainPage: ShokMainPage
    loginPage: ShokLoginPage
    userPage: ShokUserAccountPage
    registerPage: ShokRegisterPage
    editProfilePage: ShokEditProfilePage
}

export const test = base.extend<ShokFixtures>({
    mainPage: async({ page }, use) => {
        const mainPage = new ShokMainPage(page);
        await use(mainPage)
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new ShokLoginPage(page);
        await use(loginPage)
    },
    userPage: async ({ page }, use) => {
        const userPage = new ShokUserAccountPage(page);
        await use(userPage)
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new ShokRegisterPage(page);
        await use(registerPage)
    },
    editProfilePage: async ({ page }, use) => {
        const editProfilePage = new ShokEditProfilePage(page);
        await use(editProfilePage)
    },
})
import { ShockMainPage } from "./shockMainPage";
import { test as base } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { ProfilePage } from "./profilePage";
import { RegisterPage } from "./registerPage";
import { NameEditor } from "./nameEditor";

type ShockFixtures = {
    mainPage: ShockMainPage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    profilePage: ProfilePage;
    nameEditor: NameEditor;
}

export const test = base.extend<ShockFixtures>({
    mainPage: async ({ page }, use) => {
        await use(new ShockMainPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    nameEditor: async ({ page }, use) => {
        await use(new NameEditor(page));
    },
})

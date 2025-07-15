import { ShockMainPage } from "./shockMainPage";
import { test as base, Page } from "@playwright/test";
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
    mainPage: async ({ page }: { page: Page }, use: (fixture: ShockMainPage) => void) => {
        await use(new ShockMainPage(page));
    },
    loginPage: async ({ page }: { page: Page }, use: (fixture: LoginPage) => void) => {
        await use(new LoginPage(page));
    },
    profilePage: async ({ page }: { page: Page }, use: (fixture: ProfilePage) => void) => {
        await use(new ProfilePage(page));
    },
    registerPage: async ({ page }: { page: Page }, use: (fixture: RegisterPage) => void) => {
        await use(new RegisterPage(page));
    },
    nameEditor: async ({ page }: { page: Page }, use: (fixture: NameEditor) => void) => {
        await use(new NameEditor(page));
    },
})
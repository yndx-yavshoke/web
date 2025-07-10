import { test as base } from '@playwright/test';
import { MainPage } from "../Pages/MainPage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { GetProfilePage } from "./profilePage";
import { EditName } from "./EditPage";

type ShockFixtures ={
    checking: MainPage;
    logging : LoginPage;
    creating: RegisterPage;
    getProfile: GetProfilePage;
    editing: EditName;
};

export const test = base.extend<ShockFixtures>({
    checking: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    logging : async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    creating: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    getProfile: async ({ page }, use) => {
        await use(new GetProfilePage(page));
    },
    editing: async ({ page }, use) => {
        await use(new EditName(page));
    }
});
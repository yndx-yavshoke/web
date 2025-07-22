import { ShokMainPage } from "./ShokMainPage";
import { UserExistingPage } from "./UserExistingPage";
import { UserNameUpdatePage } from "./UserNameUpdatePage";
import { UserProfilePage } from "./UserProfilePage";
import { UserLoginPage } from "./UserLoginPage";
import { UserRegisterPage } from "./UserRegisterPage";
import { test as base } from "@playwright/test";

type ShokFixtures = {   
    shokMainPage: ShokMainPage;
    userExistingPage: UserExistingPage;
    userNameUpdatePage: UserNameUpdatePage;
    userProfilePage: UserProfilePage;
    userLoginPage: UserLoginPage;
    userRegisterPage: UserRegisterPage;
}

export const test = base.extend<ShokFixtures>({
    shokMainPage: async ({ page }, use) => {
        await use(new ShokMainPage(page));
    },
    userExistingPage: async ({ page }, use) => {
        await use(new UserExistingPage(page));
    },
    userNameUpdatePage: async ({ page }, use) => {
        await use(new UserNameUpdatePage(page));
    },
    userProfilePage: async ({ page }, use) => {
        await use(new UserProfilePage(page));
    },
    userLoginPage: async ({ page }, use) => {
        await use(new UserLoginPage(page));
    },
    userRegisterPage: async ({ page }, use) => {
        await use(new UserRegisterPage(page));
    },
});



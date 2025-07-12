import {test as base} from '@playwright/test';
import {MainPage} from "./MainPage";
import {LoginPage} from "./LoginPage";
import {RegisterPage} from "./RegisterPage";
import {ProfilePage} from "./ProfilePage";
import {EditPage} from "./EditPage";

export type ShockFixtures = {
    mainPage: MainPage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    profilePage: ProfilePage;
    editPage: EditPage;
};

export const test = base.extend<ShockFixtures>({
    mainPage: async ({page}, use) => {
        const mainPage = new MainPage(page);
        use(mainPage);
    },
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        use(loginPage);
    },
    registerPage: async ({page}, use) => {
        const registerPage = new RegisterPage(page);
        use(registerPage);
    },
    profilePage: async ({page}, use) => {
        const profilePage = new ProfilePage(page);
        use(profilePage);
    },
    editPage: async ({page}, use) => {
        const editPage = new EditPage(page);
        use(editPage);
    }
});
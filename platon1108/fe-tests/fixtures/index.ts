import { EditProfilePage } from "./editProfilePage";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./profilePage";
import { RegisterPage } from "./RegisterPage";
import { ShokMainPage } from "./ShokMainPage";
import { test as base } from "@playwright/test";

type ShokFixtures = {
    mainPage: ShokMainPage;
    loginPage: LoginPage;
    profilePage: ProfilePage;
    editProfilePage: EditProfilePage;
    registerPage: RegisterPage;
}

export const test = base.extend<ShokFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new ShokMainPage(page);

        use (mainPage)
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        use (loginPage)
    },
    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page);

        use (profilePage)
    },
    editProfilePage: async ({ page }, use) => {
        const editProfilePage = new EditProfilePage(page);

        use (editProfilePage)
    },
    registerPage: async ({ page }, use) => {
        const editProfilePage = new RegisterPage(page);

        use (editProfilePage)
    },              
})
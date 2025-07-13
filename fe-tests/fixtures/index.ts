import { ShokMainPage} from "./ShokMainPage";
import { LoginPage } from "./LoginPage";
import { RegistrationPage } from "./RegistrationPage";
import { NameChangingPage } from "./NameChangingPage";
import { ProfilePage } from "./ProfilePage";
import { test as base } from "@playwright/test";

type ShokFixtures = {
    mainPage: ShokMainPage;
    loginPage: LoginPage;
    registerPage: RegistrationPage;
    namePage : NameChangingPage;
    profilePage: ProfilePage;
}

export const test = base.extend<ShokFixtures>({
    mainPage : async ({page}, use) =>
    {
        const mainPage = new ShokMainPage(page);
        use(mainPage);
    },
    loginPage : async ({page}, use) =>
    {
        const loginPage = new LoginPage(page);
        use(loginPage);
    },
    registerPage : async ({page}, use) =>
    {
        const registerPage = new RegistrationPage(page);
        use(registerPage);
    },
    namePage : async ({page}, use) =>
    {
        const namePage = new NameChangingPage(page);
        use(namePage);
    },
    profilePage : async ({page}, use) =>
    {
        const profilePage = new ProfilePage(page);
        use(profilePage);
    }
})
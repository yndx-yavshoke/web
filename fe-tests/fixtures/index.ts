import { ShokMainPage} from "./ShokMainPage";
import { ShokLoginPage } from "./ShokLoginPage";
import { ShokRegPage } from "./ShokRegPage";
import { ShokProfilePage } from "./ShokProfilePage";
import { ShokEditPage } from "./ShokEditPage";
import {test as base } from "@playwright/test";


type ShokFixtures = {
    mainPage: ShokMainPage;
    loginPage: ShokLoginPage;
    regPage: ShokRegPage;
    profilePage: ShokProfilePage;
    editPage: ShokEditPage;
}

export const test = base.extend<ShokFixtures>({
    mainPage: async ({ page}, use) => {
        const mainPage = new ShokMainPage(page);

        mainPage.open();

        use (mainPage)
    },
    loginPage: async ({ page}, use) => {
        const loginPage = new ShokLoginPage(page);

        loginPage.open();
        use(loginPage)
    },
    regPage: async ({ page }, use) => {
        const regPage = new ShokRegPage(page);

        regPage.open();

        use (regPage)
    },
    profilePage: async ({page}, use ) => {
        const profilePage = new ShokProfilePage(page);

        profilePage.open();
        
        use(profilePage)
    },
    editPage: async ({page},use) => {
        const editPage = new ShokEditPage(page);

        use(editPage)
    }
    
    
})



import { ShokAuthPage } from "./Shok-Auth-Page";
import { ShokMainPage } from "./Shok-Main-Page";
import {test as base, BrowserContext} from "@playwright/test";
import { ShokRegisterPage } from "./Shok-Register-Page";
import { ShokEditUserPage } from "./Shok-Edit-User-Page";
import { ShokUserPage } from "./Shok-User-Page";

type ShokFixtures = {
    mainPage: ShokMainPage,
    authPage: ShokAuthPage,
    registerPage: ShokRegisterPage,
    editPage: ShokEditUserPage,
    userPage: ShokUserPage
    context: BrowserContext,
}

export const test = base.extend<ShokFixtures>({
    mainPage: async ({page}, use) => {
        const mainPage = new ShokMainPage(page);

        use(mainPage);
    },
    authPage: async ({page}, use) => {
        const authPage = new ShokAuthPage(page);

        use(authPage);
    },
    registerPage: async ({page}, use) => {
        const registerPage = new ShokRegisterPage(page);

        use(registerPage);
    },
    editPage: async ({page}, use) => {
        const editPage = new ShokEditUserPage(page);

        use(editPage);
    },
    userPage: async ({page}, use) => {
        const userPage = new ShokUserPage(page);

        use(userPage);
    }
})
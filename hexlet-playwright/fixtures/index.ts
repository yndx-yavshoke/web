
import { MainPage } from "./MainPage";
import { LoginPage } from "./LoginPage";
import { RenamePage } from "./RenamePage";
import { CabinetPage } from "./CabinetPage";
import { RegistrationPage } from "./RegistrationPage";
import {test as base } from "@playwright/test";

type Fixtures = {
    mainPage: MainPage;
    loginPage: LoginPage;
    renamePage: RenamePage;
    cabinetPage: CabinetPage;
    registrationPage: RegistrationPage;

}

export const test = base.extend<Fixtures>({

    mainPage: async({ page }, use) => {
        const mainPage = new MainPage(page);

       use (mainPage)

    },


    loginPage: async({ page }, use) => {
        const loginPage = new LoginPage(page);

       use (loginPage)

    },

    renamePage: async({ page }, use) => {
        const renamePage = new RenamePage(page);

       use (renamePage)

    },

    cabinetPage: async({ page }, use) => {
        const cabinetPage = new CabinetPage(page);

       use (cabinetPage)

    },

    registrationPage: async({ page }, use) => {
        const registrationPage = new RegistrationPage(page);

       use (registrationPage)

    }

})
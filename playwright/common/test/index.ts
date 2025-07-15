import { test as base } from "@playwright/test";

import { dotenv } from '@common/dotenv';
import {
    ShockChangeNamePage,
    ShockLoginPage,
    ShockMainPage,
    ShockRegisterPage,
    ShockProfilePage,
} from '@common/pages';

import { TestFixturesType } from './types';

export const test = base.extend<TestFixturesType>({
    env: async ({ }, use) => {
        dotenv.init();

        await use(dotenv.var);
    },

    mainPage: async ({ page }, use) => {
        await use(
            new ShockMainPage(page)
        );
    },

    profilePage: async ({ page }, use) => {
        await use(
            new ShockProfilePage(page)
        );
    },

    loginPage: async ({ page }, use) => {
        await use(
            new ShockLoginPage(page)
        );
    },

    changeNamePage: async ({ page }, use) => {
        await use(
            new ShockChangeNamePage(page)
        );
    },

    registerPage: async ({ page }, use) => {
        await use(
            new ShockRegisterPage(page)
        );
    }
});

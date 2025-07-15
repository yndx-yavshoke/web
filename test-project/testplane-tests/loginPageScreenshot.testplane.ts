import { createPages } from './helpers/testHelpers';
import { getTestUserEmail } from '../utils/env';
import { generateRandomPassword } from '../utils/dataGenerator';
import { it } from '@faker-js/faker/.';
import { describe, beforeEach } from 'node:test';

describe("Страница авторизации", () => {
    let pages: ReturnType<typeof createPages>;

    beforeEach(async ({ browser }) => {
        pages = createPages(browser);
        await browser.execute(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await browser.deleteCookies();
    });

    it("Проверка cтраницы авторизации", async ({ browser }) => {
        await pages.loginPage.open();
        await browser.assertView('full-page', 'body');
    });

    it("Проверка ошибок пустой строки на странице авторизации", async ({ browser }) => {
        await pages.loginPage.open();
        await pages.loginPage.login('', '');
        await browser.assertView('full-page', 'body');
    });

    it("Проверка ошибки авторизации", async ({ browser }) => {
        await pages.loginPage.open();
        await pages.loginPage.login(getTestUserEmail(), generateRandomPassword());
        await browser.assertView('full-page', 'body');
    });
});
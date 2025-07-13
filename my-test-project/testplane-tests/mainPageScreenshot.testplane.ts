import { createPages } from './helpers/testHelpers';
import { getTestUserEmail } from '../utils/env';
import { generateRandomEmail } from '../utils/data-generator';

describe("Главная страница", () => {
    let pages: ReturnType<typeof createPages>;

    beforeEach(async ({ browser }) => {
        pages = createPages(browser);
        await browser.execute(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await browser.deleteCookies();
    });

    it("Проверка главной страницы с пустым полем ввода", async ({ browser }) => {
        await pages.mainPage.open();
        await browser.assertView('full-page', 'body');
    });

    it("Проверка кнопки ввода в двух состояниях", async ({ browser }) => {
        await pages.mainPage.open();
        await browser.$('[data-testid="main-check-button"]').assertView("notClickable");
        await pages.mainPage.fillEmail(getTestUserEmail());
        await browser.$('[data-testid="main-check-button"]').assertView("clickable");
    });

    it("Проверка ответа \"Ты не в ШОКе\"", async ({ browser }) => {
        await pages.mainPage.open();
        await pages.mainPage.exist(generateRandomEmail());
        await browser.$('//*[contains(text(), "Ты еще не в ШОКе")]').assertView("notInShock");
    });

    it("Проверка ответа \"Ты в ШОКе\"", async ({ browser }) => {
        await pages.mainPage.open();
        await pages.mainPage.exist(getTestUserEmail());
        await browser.$('//*[contains(text(), "Ты уже в ШОКе")]').assertView("inShock");
    });
});
import { createPages } from './helpers/test_Helpers';
import { getUserEmail } from './utils/env';
import { generateEmail } from './utils/data-faker';

describe("Cтраница проверки шоковости", () => {
    let pages: ReturnType<typeof createPages>;

    beforeEach(async ({ browser }) => {
        pages = createPages(browser);
        await browser.execute(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await browser.deleteCookies();
    });

    it("Проверка отображения страницы шоковости", async ({ browser }) => {
        await pages.mainPage.open();
        await browser.assertView('full-page', 'body');
    });

    it("Проверка отображения кнопки 'Я в ШОКе?' задизайбленного/активного вида", async ({ browser }) => {
        await pages.mainPage.open();
        await browser.$('[data-testid="main-check-button"]').assertView("notClickable");
        await pages.mainPage.fillEmail(getUserEmail());
        await browser.$('[data-testid="main-check-button"]').assertView("clickable");
    });

    it("Проверка отображения сообщения 'Ты в ШОКе'", async ({ browser }) => {
        await pages.mainPage.open();
        await pages.mainPage.exist(getUserEmail());
        await browser.$('//*[contains(text(), "Ты уже в ШОКе")]').assertView("inShock");
    });

    it("Проверка отображения сообщения 'Ты не в ШОКе'", async ({ browser }) => {
        await pages.mainPage.open();
        await pages.mainPage.exist(generateEmail());
        await browser.$('//*[contains(text(), "Ты еще не в ШОКе")]').assertView("notInShock");
    });
});
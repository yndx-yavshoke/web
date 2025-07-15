import { createPages } from './helpers/test_Helpers';
import { getUserEmail } from './utils/env';
import { generatePassword } from './utils/data-faker';

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

    it("Проверка отображения cтраницы авторизации", async ({ browser }) => {
        await pages.loginPage.open();
        await browser.assertView('full-page', 'body');
    });

    it("Проверка отображения ошибки при попытке Войти под незарегистрированным юзером", async ({ browser }) => {
        await pages.loginPage.open();
        await pages.loginPage.login(getUserEmail(), generatePassword());
        await browser.assertView('full-page', 'body');
    });

    it("Проверка отображения ошибок при нажатии 'В шок' при отсутствии ввода кредитсов юзера", async ({ browser }) => {
        await pages.loginPage.open();
        await pages.loginPage.login('', '');
        await browser.assertView('full-page', 'body');
    });
});
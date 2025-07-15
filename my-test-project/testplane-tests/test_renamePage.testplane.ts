import { createPages } from './helpers/test_Helpers';
import { getUserEmail, getUserPassword } from './utils/env';

describe("Страница смены имени юзера", () => {
    let pages: ReturnType<typeof createPages>;

    beforeEach(async ({ browser }) => {
        pages = createPages(browser);
        await pages.loginPage.open();
        await pages.loginPage.login(getUserEmail(), getUserPassword());
        await pages.renamePage.open();
    });

    it("Проверка отображения страницы переименования юзера", async ({ browser }) => {
        await pages.renamePage.fillName('');
        await browser.assertView('full-page', 'body');
    });
});
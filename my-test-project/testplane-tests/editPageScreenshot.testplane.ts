import { createPages } from './helpers/testHelpers';
import { getTestUserEmail, getTestUserPassword } from '../utils/env';

describe("Страница редактирования профиля", () => {
    let pages: ReturnType<typeof createPages>;

    beforeEach(async ({ browser }) => {
        pages = createPages(browser);
        await pages.loginPage.open();
        await pages.loginPage.login(getTestUserEmail(), getTestUserPassword());
        await pages.editPage.open();
    });

    it("Проверка страницы редактирования профиля", async ({ browser }) => {
        await pages.editPage.fillName('');
        await browser.assertView('full-page', 'body');
    });
});
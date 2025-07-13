import { createPages } from './helpers/testHelpers';
import { getTestUserEmail, getTestUserPassword } from '../utils/env';

describe("Страница профиля", () => {
    let pages: ReturnType<typeof createPages>;

    beforeEach(async ({ browser }) => {
        pages = createPages(browser);
        await pages.loginPage.open();
        await pages.loginPage.login(getTestUserEmail(), getTestUserPassword());
    });

    it("Проверка первой половины cтраницы профиля", async ({ browser }) => {
        await browser.assertView(
            'header',
            '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]',
            {
                ignoreElements: [
                    '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[1]',
                    '[data-testid="user-avatar"]'
                ]
            });
    });

    it("Проверка кнопки Logout", async ({ browser }) => {
        await browser.$('[data-testid="user-logout-button"]').assertView("logout");
    });

    it("Проверка фото котов на странице профиля", async ({ browser }) => {
        for (let i = 0; i < 4; i++) {
            await pages.profilePage.getGalleryImage(i).assertView(`cat-${i + 1}`);
        }
    });
});
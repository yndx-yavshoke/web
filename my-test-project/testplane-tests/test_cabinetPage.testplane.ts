import { createPages } from './helpers/test_Helpers';
import { getUserEmail, getUserPassword } from './utils/env';

describe("Страница личного кабинета", () => {
    let pages: ReturnType<typeof createPages>;

    beforeEach(async ({ browser }) => {
        pages = createPages(browser);
        await pages.loginPage.open();
        await pages.loginPage.login(getUserEmail(), getUserPassword());
    });
// я не знаю какие есть способы заморозить гифку, решила просто ее игнорировать вместе с ником юзера (защита от переименований)
    it("Проверка отображения футера cтраницы ", async ({ browser }) => {
        await browser.assertView(
            'header',
            '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]',
            {
                ignoreElements: [
                    '//div[@data-testid="user-edit-profile-button"]/../div[1]',
                    '[data-testid="user-avatar"]'
                ]
            });
    });

    it("Проверка отображения кнопки Logout", async ({ browser }) => {
        await browser.$('[data-testid="user-logout-button"]').assertView("logout");
    });

    it("Проверка отображения фото котов на странице профиля", async ({ browser }) => {
        for (let i = 0; i < 4; i++) {
            await pages.profilePage.getGalleryImage(i).assertView(`cat-${i + 1}`);
        }
    });
});
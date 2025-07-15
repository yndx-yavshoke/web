import { profilePageLocators } from '../helpers/locators/profilePageLocators';
import { config } from 'dotenv';
import { urls } from '../helpers/urls';
import * as baseHelpers from '../helpers/baseHelpers';

config();

describe("Страница профиля: ", function() {
    it('отображается корректно в дефолтном состоянии', async function() {
        await this.browser.assertView('profile-default', 'body');
    });

    it('отображается кнопка "Logout"', async function() {
        await baseHelpers.checkElement(this.browser, profilePageLocators.logoutButton, 5000);

        await this.browser.assertView('profile-button-logout', profilePageLocators.logoutButton);
    });

    it('отображается кнопка "Edit Profile"', async function() {
        await baseHelpers.checkElement(this.browser, profilePageLocators.editProfileButton, 5000);

        await this.browser.assertView('profile-button-edit', profilePageLocators.editProfileButton);
    });

    it('отображается количество постов', async function() {
        await baseHelpers.checkElement(this.browser, profilePageLocators.containerQuantityPosts, 5000);

        await this.browser.assertView('profile-quantity-posts', profilePageLocators.containerQuantityPosts);
    });

    it('отображается количество подписчиков', async function() {
        await baseHelpers.checkElement(this.browser, profilePageLocators.containerQuantitySubscribers, 5000);

        await this.browser.assertView('profile-quantity-subscribers', profilePageLocators.containerQuantitySubscribers);
    });

    it('отображается количество лайков', async function() {
        await baseHelpers.checkElement(this.browser, profilePageLocators.containerQuantityLikes, 5000);

        await this.browser.assertView('profile-quantity-likes', profilePageLocators.containerQuantityLikes);
    });

    it('отображаются посты', async function() {
        await baseHelpers.checkElement(this.browser, profilePageLocators.containerPosts, 5000);

        await this.browser.assertView('profile-posts', profilePageLocators.containerPosts);
    });

    it('отрабатывается корректный переход на главную страницу', async function() {
        await baseHelpers.checkElement(this.browser, profilePageLocators.logoutButton, 5000);

        await baseHelpers.click(this.browser, profilePageLocators.logoutButton);

        // проверяем, что произошел возврат на главную страницу
        await this.browser.waitUntil(async () => {
            const currentUrl = await this.browser.getUrl();
            return currentUrl.includes(urls.main);
        }, { timeout: 5000 });

        await this.browser.assertView('profile-main-redirect', 'body');
    });
});
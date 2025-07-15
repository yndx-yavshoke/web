import { mainPageLocators } from '../helpers/locators/mainPageLocators';
import { urls } from '../helpers/urls';
import * as baseHelpers from '../helpers/baseHelpers';
import { config } from 'dotenv';

config();

describe("Главная страница: ", function() {
    it('отображается корректно в дефолтном состоянии', async function() {
        await this.browser.url(urls.main);

        await this.browser.assertView('main-default', 'body');
    });
    
    it('отображается корректно в фокусе на ввод email', async function() {
        await this.browser.url(urls.main);

        await baseHelpers.checkElement(this.browser, mainPageLocators.emailInput, 5000);
        await baseHelpers.click(this.browser, mainPageLocators.emailInput);

        await this.browser.assertView('main-input-focused', mainPageLocators.emailInput);
    });
    
    it('отображается кнопка "Я в шоке?" при пустом поле email', async function() {
        await this.browser.url(urls.main);

        await baseHelpers.checkElement(this.browser, mainPageLocators.checkButton, 5000);

        await this.browser.assertView('main-button-unactive', mainPageLocators.checkButton);
    });
    
    it('отображается кнопка "Я в шоке?" при заполненном поле email', async function() {
        const email = process.env.EMAIL;
        await this.browser.url(urls.main);

        await baseHelpers.checkElement(this.browser, mainPageLocators.emailInput, 5000);
        await baseHelpers.setInputValue(this.browser, mainPageLocators.emailInput, email, 5000);

        await this.browser.assertView('main-button-active', mainPageLocators.checkButton);
    });
    
    it('отображается кнопка "В шок"', async function() {
        await this.browser.url(urls.main);

        await baseHelpers.checkElement(this.browser, mainPageLocators.loginButton, 5000);

        await this.browser.assertView('main-button-login', mainPageLocators.loginButton);
    });
    
    it('обрабатывается корректный переход на страницу входа', async function() {
        await this.browser.url(urls.main);

        await baseHelpers.checkElement(this.browser, mainPageLocators.loginButton, 5000);
        await baseHelpers.click(this.browser, mainPageLocators.loginButton);

        // проверяем переход на страницу входа
        await this.browser.waitUntil(async () => {
            const currentUrl = await this.browser.getUrl();
            return currentUrl.includes(urls.login);
        }, { timeout: 5000 });

        await this.browser.assertView('main-login-redirect', 'body');
    });
});
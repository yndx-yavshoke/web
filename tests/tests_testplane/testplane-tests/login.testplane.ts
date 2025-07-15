import { loginPageLocators } from '../helpers/locators/loginPageLocators';
import { login } from '../helpers/loginPageHelpers'
import { urls } from '../helpers/urls';
import * as baseHelpers from '../helpers/baseHelpers';
import { config } from 'dotenv';

config();

describe("Страница авторизации: ", function() {
    it('отображается корректно в дефолтном состоянии', async function() {
        await this.browser.url(urls.login);

        await this.browser.assertView('login-default', 'body');
    });
    
    it('отображается корректно в фокусе на поле email', async function() {
        await this.browser.url(urls.login);

        await baseHelpers.checkElement(this.browser, loginPageLocators.emailInput, 5000);
        await baseHelpers.click(this.browser, loginPageLocators.emailInput);

        await this.browser.assertView('login-input-email-focused', loginPageLocators.emailInput);
    });
    
    it('отображается корректно в фокусе на поле пароль', async function() {
        await this.browser.url(urls.login);

        await baseHelpers.checkElement(this.browser, loginPageLocators.passwordInput, 5000);
        await baseHelpers.click(this.browser, loginPageLocators.passwordInput);

        await this.browser.assertView('login-input-password-focused', loginPageLocators.passwordInput);
    });
    
    it('отображается кнопка "В шок"', async function() {
        await this.browser.url(urls.login);

        await baseHelpers.checkElement(this.browser, loginPageLocators.loginButton, 5000);

        await this.browser.assertView('login-button-login', loginPageLocators.loginButton);
    });

    it('отображается кнопка "Назад"', async function() {
        await this.browser.url(urls.login);

        await baseHelpers.checkElement(this.browser, loginPageLocators.backButton, 5000);

        await this.browser.assertView('login-button-back', loginPageLocators.backButton);
    });

    it('отображается кнопка "Регистрация"', async function() {
        await this.browser.url(urls.login);

        await baseHelpers.checkElement(this.browser, loginPageLocators.registerButton, 5000);

        await this.browser.assertView('login-button-register', loginPageLocators.registerButton);
    });
    
    it('отображается ошибка "Введите пароль" при пустом поле пароль', async function() {
        const email = 'test@test.com';
        const password = '';

        await this.browser.url(urls.login);

        await login(this.browser, email, password);
        
        await this.browser.pause(2000);
        await this.browser.assertView('login-error-message-no-password', loginPageLocators.container);
    });

    it('отображается ошибка "Введите email" при пустом поле email', async function() {
        const email = '';
        const password = '123456';

        await this.browser.url(urls.login);

        await login(this.browser, email, password);
        
        await this.browser.pause(2000);
        await this.browser.assertView('login-error-message-no-email', loginPageLocators.container);
    });

    it('обрабатывается корректный переход на страницу профиля', async function() {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        await this.browser.url(urls.login);
        
        await login(this.browser, email, password);

        // проверяем переход на страницу профиля
        await this.browser.waitUntil(async () => {
            const currentUrl = await this.browser.getUrl();
            return currentUrl.includes(urls.profile);
        }, { timeout: 5000 });

        await this.browser.execute(() => {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation: none !important;
                    transition: none !important;
                }
                img[src$=".gif"] {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        });

        await this.browser.assertView('login-profile-redirect', 'body');
    });

    it('обрабатывается корректный переход на главную страницу', async function() {
        await this.browser.url(urls.login);

        await baseHelpers.checkElement(this.browser, loginPageLocators.backButton, 5000);

        await baseHelpers.click(this.browser, loginPageLocators.backButton);

        // Проверяем переход на главную страницу
        await this.browser.waitUntil(async () => {
            const currentUrl = await this.browser.getUrl();
            return currentUrl.includes(urls.main);
        }, { timeout: 5000 });

        await this.browser.assertView('login-main-redirect', 'body');
    });

    it('обрабатывается корректный переход на страницу регистрации', async function() {
        await this.browser.url(urls.login);

        await baseHelpers.checkElement(this.browser, loginPageLocators.registerButton, 5000);

        await baseHelpers.click(this.browser, loginPageLocators.registerButton);

        // Проверяем переход на страницу регистрации
        await this.browser.waitUntil(async () => {
            const currentUrl = await this.browser.getUrl();
            return currentUrl.includes(urls.register);
        }, { timeout: 5000 });

        await this.browser.assertView('login-register-redirect', 'body');
    });
});
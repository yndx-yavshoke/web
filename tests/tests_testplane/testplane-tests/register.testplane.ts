import { registerPageLocators } from '../helpers/locators/registerPageLocators';
import { urls } from '../helpers/urls';
import * as baseHelpers from '../helpers/baseHelpers';
import { register } from '../helpers/registerPageHelpers';

describe("Страница регистрации: ", function() {
    it('отображается корректно в дефолтном состоянии', async function() {
        await this.browser.url(urls.register);

        await this.browser.assertView('register-default', 'body');
    });
    
    it('отображается корректно в фокусе на поле email', async function() {
        await this.browser.url(urls.register);

        await baseHelpers.checkElement(this.browser, registerPageLocators.emailInput, 5000);
        await baseHelpers.click(this.browser, registerPageLocators.emailInput);

        await this.browser.assertView('register-input-email-focused', registerPageLocators.emailInput);
    });
    
    it('отображается корректно в фокусе на поле пароль', async function() {
        await this.browser.url(urls.register);

        await baseHelpers.checkElement(this.browser, registerPageLocators.passwordInput, 5000);
        await baseHelpers.click(this.browser, registerPageLocators.passwordInput);

        await this.browser.assertView('register-input-password-focused', registerPageLocators.passwordInput);
    });

    it('отображается корректно в фокусе на поле возраст', async function() {
        await this.browser.url(urls.register);

        await baseHelpers.checkElement(this.browser, registerPageLocators.ageInput, 5000);
        await baseHelpers.click(this.browser, registerPageLocators.ageInput);

        await this.browser.assertView('register-input-age-focused', registerPageLocators.ageInput);
    });
    
    it('отображается кнопка "Зарегистрироваться"', async function() {
        await this.browser.url(urls.register);

        await baseHelpers.checkElement(this.browser, registerPageLocators.registerButton, 5000);

        await this.browser.assertView('register-button-register', registerPageLocators.registerButton);
    });

    it('отображается кнопка "Назад"', async function() {
        await this.browser.url(urls.register);

        await baseHelpers.checkElement(this.browser, registerPageLocators.backButton, 5000);

        await this.browser.assertView('register-button-back', registerPageLocators.backButton);
    });
    
    it('отображается ошибка "Неправильный email-адрес" при невалидном email', async function() {
        const email = 'invalid_email';
        const password = '123456';
        const age = '18';

        await this.browser.url(urls.register);

        await register(this.browser, email, password, age);

        await this.browser.assertView('register-error-message-invalid-email', registerPageLocators.container);
    });

    it('отображается ошибка "Пароль должен содержать минимум 6 символов" при невалидном пароле', async function() {
        const email = 'valid_email@email.com';
        const password = '12345';
        const age = '18';

        await this.browser.url(urls.register);

        await register(this.browser, email, password, age);

        await this.browser.assertView('register-error-message-invalid-password', registerPageLocators.container);
    });

    it('отображается ошибка "Возраст должен быть числом" при невалидном возрасте', async function() {
        const email = 'valid_email@email.com';
        const password = '123456';
        const age = 'abc';

        await this.browser.url(urls.register);

        await register(this.browser, email, password, age);

        await this.browser.assertView('register-error-message-invalid-age', registerPageLocators.container);
    });

    it('обрабатывается корректный переход на страницу логина', async function() {
        await this.browser.url(urls.register);

        await baseHelpers.checkElement(this.browser, registerPageLocators.backButton, 5000);

        await baseHelpers.click(this.browser, registerPageLocators.backButton);

        // проверяем переход на страницу логина
        await this.browser.waitUntil(async () => {
            const currentUrl = await this.browser.getUrl();
            return currentUrl.includes(urls.login);
        }, { timeout: 5000 });

        await this.browser.assertView('register-login-redirect', 'body');
    });
});
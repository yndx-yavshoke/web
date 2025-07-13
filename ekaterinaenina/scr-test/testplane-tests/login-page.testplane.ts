import { browserWaitLoadingByMessage } from "./utils";

describe("Отображение страницы входа", () => {
    const currentUrl = "/login";

    // Названия для assertView
    const headerView = "login-header";
    const submitButtonView = "login-submit-button";
    const backButtonView = "login-back-button";
    const registerButtonView = "login-register-button";

    //email
    const emailEmptyView = "login-email-empty";
    const emailFocusedView = "login-email-focused";
    const emailFillView = "login-email-fill-error";
    const emailFillIncorrectView = "login-email-fill-incorrect-error";
    const emailEmptyErrorView = "login-email-empty-error";
    //password
    const passwordEmptyView = "login-password-empty";
    const passwordFocusedView = "login-password-focused";
    const passwordFillErrorView = "login-password-fill-error";
    //Ошибки
    const errorFillEmailView = "login-error-email";
    const errorFillPasswordView = "login-error-password";
    const errorInvalidFormat = "login-error-invalid-data";
    const errorNotLoginData = "login-error-notlogin-data";

    // Селекторы
    const headerSelector = '//div[contains(text(), "Войти в ШОК")]';
    const emailInputSelector = '[data-testid="login-email-input"]';
    const passwordInputSelector = '[data-testid="login-password-input"]';
    const submitButtonSelector = '[data-testid="login-submit-button"]';
    const backButtonSelector = '[data-testid="login-back-button"]';
    const registerButtonSelector = '[data-testid="login-register-button"]';

    // Тексты ошибок
    const textInputPassword = 'Введите пароль';
    const textInputEmail = 'Введите email';
    const textError = 'Произошла ошибка';
    const textWrongEmailAndPsw = 'Неправильный логин или пароль';

    // Тестовые данные
    const emailForLogin = "invalid@yavshok.ru";
    const invalidEmailFormat = "invalid";
    const passwordForLogin= "wrongpass";

    it("Заголовок страницы", async ({ browser }) => {
        await browser.url(currentUrl);
        await browser.assertView(headerView, headerSelector);
    });

    it("Поле для ввода email", async ({ browser }) => {
        await browser.url(currentUrl);
        await browser.assertView(emailEmptyView, emailInputSelector);
    });

    it("Поле для ввода пароля", async ({ browser }) => {
        await browser.url(currentUrl);
        await browser.assertView(passwordEmptyView, passwordInputSelector);
    });

    it("Кнопка В ШОК", async ({ browser }) => {
        await browser.url(currentUrl);
        await browser.assertView(submitButtonView, submitButtonSelector);
    });

    it("Кнопка Назад", async ({ browser }) => {
        await browser.url(currentUrl);
        await browser.assertView(backButtonView, backButtonSelector);
    });

    it("Кнопка Регистрация", async ({ browser }) => {
        await browser.url(currentUrl);
        await browser.assertView(registerButtonView, registerButtonSelector);
    });

    it("Фокус поля email", async ({ browser }) => {
        await browser.url(currentUrl);
        const email = await browser.$(emailInputSelector);
        await email.click();
        await browser.assertView(emailFocusedView, emailInputSelector);
    });

    it("Фокус поля пароль", async ({ browser }) => {
        await browser.url(currentUrl);
        const password = await browser.$(passwordInputSelector);
        await password.click();
        await browser.assertView(passwordFocusedView, passwordInputSelector);
    });
    //Введите пароль
    it(`Отображение сообщения: ${textInputPassword}`, async ({ browser }) => {
        await browser.url(currentUrl);

        const email = await browser.$(emailInputSelector);
        const loginButton = await browser.$(submitButtonSelector);
        await email.setValue(emailForLogin);
        await loginButton.click();
        await browserWaitLoadingByMessage(browser, textInputPassword);

        await browser.assertView(emailFillView, emailInputSelector);
        await browser.assertView(passwordEmptyView, passwordInputSelector);
        await browser.assertView(errorFillPasswordView, `//div[contains(text(), "${textInputPassword}")]`);
    });
    //Введите email
    it(`Отображение сообщения: ${textInputEmail}`, async ({ browser }) => {
        await browser.url(currentUrl);

        const password = await browser.$(passwordInputSelector);
        const loginButton = await browser.$(submitButtonSelector);
        await password.setValue(passwordForLogin);
        await loginButton.click();
        await browserWaitLoadingByMessage(browser, textInputEmail);

        await browser.assertView(emailEmptyErrorView, emailInputSelector);
        await browser.assertView(passwordFillErrorView, passwordInputSelector);
        await browser.assertView(errorFillEmailView, `//div[contains(text(), "${textInputEmail}")]`);
    });
    //Произошла ошибка
    it(`Отображение сообщения: ${textError}`, async ({ browser }) => {
        await browser.url(currentUrl);

        const email = await browser.$(emailInputSelector);
        const password = await browser.$(passwordInputSelector);
        const loginButton = await browser.$(submitButtonSelector);

        await email.setValue(invalidEmailFormat);
        await password.setValue(passwordForLogin);
        await loginButton.click();
        await browserWaitLoadingByMessage(browser, textError);

        await browser.assertView(emailFillIncorrectView, emailInputSelector);
        await browser.assertView(passwordFillErrorView, passwordInputSelector);
        await browser.assertView(errorInvalidFormat, `//div[contains(text(), "${textError}")]`);
    });

    //Неправильный логин или пароль
    it(`Отображение сообщения: ${textWrongEmailAndPsw}`, async ({ browser }) => {
        await browser.url(currentUrl);

        const email = await browser.$(emailInputSelector);
        const password = await browser.$(passwordInputSelector);
        const loginButton = await browser.$(submitButtonSelector);

        await email.setValue(emailForLogin);
        await password.setValue(passwordForLogin);
        await loginButton.click();
        await browserWaitLoadingByMessage(browser, textWrongEmailAndPsw);

        await browser.assertView(emailFillView, emailInputSelector);
        await browser.assertView(passwordFillErrorView, passwordInputSelector);
        await browser.assertView(errorNotLoginData, `//div[contains(text(), "${textWrongEmailAndPsw}")]`);
    });

});


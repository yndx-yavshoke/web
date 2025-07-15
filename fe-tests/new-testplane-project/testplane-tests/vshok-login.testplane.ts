describe("Страница авторизации", () => {

    it("Открывается и корректно отображается страница авторизации", async ({browser}) => {
        browser.openAndWait("https://yavshok.ru/login");

        await browser.assertView("login-default", 'body');
    });

    it("Корректно отображается фокус на поле ввода эл. почты", async ({browser}) => {
        browser.openAndWait("https://yavshok.ru/login");
        const emailInput = (await browser.$('[data-testid="login-email-input"]'))
        await emailInput.click();

        await browser.assertView("login-email-focus", 'body');
    });

    it("Корректно отображается фокус на поле ввода пароля", async ({browser}) => {
        browser.openAndWait("https://yavshok.ru/login");
        const passwordInput = (await browser.$('[data-testid="login-password-input"]'));
        await passwordInput.click();

        await browser.assertView("login-password-focus", 'body');
    });

    it("Корректно отображается ошибка входа", async ({browser}) => {
        browser.openAndWait("https://yavshok.ru/login");
        const emailInput = (await browser.$('[data-testid="login-email-input"]'));
        await emailInput.setValue('a@ya.ru');

        const passwordInput = (await browser.$('[data-testid="login-password-input"]'));
        await passwordInput.setValue('12345');

        const loginButton = (await browser.$('[data-testid="login-submit-button"]'));
        await loginButton.click();

        await browser.assertView("login-error", 'body');
    });
});

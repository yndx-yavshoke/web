describe("Yavshok Login Page", () => {
    
    // Тест 1: Дефолтное состояние страницы логина
    it("default login page", async ({browser}) => {
        await browser.url("/login");
        await browser.pause(1000);
        
        await browser.assertView("login-default", "body");
    });

    // Тест 2: Состояние с фокусом на поле email
    it("email input focused", async ({browser}) => {
        await browser.url("/login");
        await browser.pause(1500);
        
        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await emailInput.click();

        await browser.assertView("login-email-focused", "body");
    });

    // Тест 3: Состояние с фокусом на поле пароля
    it("password input focused", async ({browser}) => {
        await browser.url("/login");
        await browser.pause(2000);
        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        await passwordInput.waitForDisplayed({ timeout: 5000 });
        await passwordInput.click();

        await browser.assertView("login-password-focused", "body");
    });

    // Тест 4: Ошибка входа с неправильными данными
    it("login error state", async ({browser}) => {
        await browser.url("/login");
        await browser.pause(2000);
        
        const emailInput = await browser.$('[data-testid="login-email-input"]');
        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        const submitButton = await browser.$('[data-testid="login-submit-button"]');

        await emailInput.waitForDisplayed({ timeout: 5000 });
        
        await emailInput.setValue("tochnonevshoke0@yandex.ru");
        await passwordInput.setValue("wrongpassword");
        await submitButton.click();
        await browser.pause(2000);

        await browser.assertView("login-error", "body");
    });
}); 

describe("Страница входа", () => {
    it("Отображается дефолтное состояние", async ({ browser }) => {
        await browser.url("https://yavshok.ru/login");

        const title = await browser.$('h1, [class*="css-146c3p1"]');
        await expect(title).toHaveText("Войти в ШОК");

        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await expect(emailInput).toBeDisplayed();
        await expect(emailInput).toHaveValue("");
        await expect(emailInput).toHaveAttribute("placeholder", "Email");

        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        await expect(passwordInput).toBeDisplayed();
        await expect(passwordInput).toHaveValue("");
        await expect(passwordInput).toHaveAttribute("placeholder", "Пароль");

        const shockButton = await browser.$('[data-testid="login-submit-button"]');
        await expect(shockButton).toBeDisplayed();
        await expect(shockButton.$('.css-146c3p1')).toHaveText("В шок");

        const backButton = await browser.$('[data-testid="login-back-button"]');
        await expect(backButton).toBeDisplayed();
        await expect(backButton.$('.css-146c3p1')).toHaveText("Назад");

        const registerButton = await browser.$('[data-testid="login-register-button"]');
        await expect(registerButton).toBeDisplayed();
        await expect(registerButton.$('.css-146c3p1')).toHaveText("Регистрация");
    });

    it("Фокус на полях email и пароль", async ({ browser }) => {
        await browser.url("https://yavshok.ru/login");

        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await emailInput.click();
        await expect(await emailInput.isFocused()).toBe(true);

        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        await passwordInput.click();
        await expect(await passwordInput.isFocused()).toBe(true);
    });

    function generateFakeEmail() {
        const random = Math.random().toString(36).substring(2, 10);
        return `user_${random}@example.com`;
    }

    it("Ошибка при невалидном входе", async ({ browser }) => {
        await browser.url("https://yavshok.ru/login");

        const fakeEmail = generateFakeEmail();
        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await emailInput.setValue(fakeEmail);

        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        await passwordInput.setValue("wrongpassword");

        const shockButton = await browser.$('[data-testid="login-submit-button"]');
        await shockButton.click();

        const errorMessage = await browser.$('.r-howw7u');
        await expect(errorMessage).toHaveText("Неправильный логин или пароль");
    });
});

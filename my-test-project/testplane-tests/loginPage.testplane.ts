
describe("Login page ", () => {
    it("Default state", async ({browser}) => {
        await browser.url("https://yavshok.ru/login");
        await browser.assertView('login-page-default');
    });

    it("Focus state email input", async ({browser}) => {
        await browser.url("https://yavshok.ru/login");

        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await emailInput.click();

        await browser.assertView('login-page-email-focus');
    });

    it("login error", async ({browser}) => {
        await browser.url("https://yavshok.ru/login");

        await browser.$('[data-testid="login-email-input"]').setValue('abra@mail.ru')
        await browser.$('[data-testid="login-password-input"]').setValue('12345678')
        await browser.$('[data-testid="login-submit-button"]').click();

        await expect(browser.$('[data-testid="login-email-input"]')).toHaveProperty('border-color', 'rgb(255, 0, 0)');
        await expect(browser.$('[data-testid="login-password-input"]')).toHaveProperty('border-color', 'rgb(255, 0, 0)');

        const errorMessage = await browser.$('.css-146c3p1.r-howw7u.r-1enofrn.r-15d164r');
        await expect(errorMessage).toHaveText("Неправильный логин или пароль");

        await browser.assertView('login-page-error');
    });

});

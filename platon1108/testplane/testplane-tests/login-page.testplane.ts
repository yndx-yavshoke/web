describe("Login page tests", () => {
    beforeEach(async function() {
        await this.browser.openAndWait("/login");
    });


    it("Check default Login page", async ({browser}) => {
        await browser.assertView("login_default", "body", {screenshotDelay: 1000});
    });


    it("Check Login page with Email input focused", async ({browser}) => {
        await browser.$('[data-testid="login-email-input"]').click();
        await browser.assertView("login_email_focused", "body", {screenshotDelay: 1000});
    });


    it("Check Login page with Password input focused", async ({browser}) => {
        await browser.$('[data-testid="login-password-input"]').click();
        await browser.assertView("login_password_focused", "body", {screenshotDelay: 1000});
    });


    it("Check Login page with empty email and password field", async ({browser}) => {
        await browser.$('[data-testid="login-submit-button"]').click();
        await browser.assertView("login_empty_email_password", "body", {screenshotDelay: 1000});
    });


    it("Check Login page with empty email field", async ({browser}) => {
        await browser.$('[data-testid="login-password-input"]').setValue('Qwerty');
        await browser.$('[data-testid="login-submit-button"]').click();

        await browser.assertView("login_empty_email", "body", {screenshotDelay: 1000});
    });


    it("Check Login page with empty password field", async ({browser}) => {
        await browser.$('[data-testid="login-email-input"]').setValue('email@server.ru');
        await browser.$('[data-testid="login-submit-button"]').click();
        await browser.assertView("login_empty_password", "body", {screenshotDelay: 1000});
    });

    
    it("Check Login page with auth error", async ({browser}) => {
        await browser.$('[data-testid="login-email-input"]').setValue('email@server.ru');
        await browser.$('[data-testid="login-password-input"]').setValue('Qwerty');
        await browser.$('[data-testid="login-submit-button"]').click();
        await browser.assertView("login_auth_error", "body", {screenshotDelay: 1000});
    });
});

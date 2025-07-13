import { selectors } from '../testplane-helpers/selectors';

describe("Login page", () => {
    
    beforeEach(async ({ browser }) => {
        await browser.setWindowSize(1920, 1080);

        await browser.openAndWait("/login");
    });


    it("should have default page state", async ({ browser }) => {
        await browser.assertView('login-page-default', 'body', {
            screenshotDelay: 300
        });
    });

    it("should display Email input field", async ({ browser }) => {
        await browser.assertView('login-email-field', selectors.emailInput, {
            screenshotDelay: 500
        });
    });

    it("should focus on Email input field", async ({ browser }) => {
        const inputEmail = await browser.$(selectors.emailInput);
        await inputEmail.click();

        await browser.assertView('login-focused-email-field', selectors.emailInput, {
            screenshotDelay: 500
        });
    });

    it("should display Password input field", async ({ browser }) => {
        await browser.assertView('login-password-field', selectors.passwordInput, {
            screenshotDelay: 500
        });
    });

    it("should focus on Password input field", async ({ browser }) => {
        const inputPassword = await browser.$(selectors.passwordInput);
        await inputPassword.click();

        await browser.assertView('login-focused-password-field', selectors.passwordInput, {
            screenshotDelay: 500
        });
    });

    it("should display Login submit button", async ({ browser }) => {
        await browser.assertView('login-submit-button', selectors.loginButton, {
            screenshotDelay: 500
        });
    });

    it("should display back to Main button", async ({ browser }) => {
        await browser.assertView('login-back-button', selectors.backToMainButton, {
            screenshotDelay: 500
        });
    });

    it("should display to Register button", async ({ browser }) => {
        await browser.assertView('login-to-register-button', selectors.toRegisterButton, {
            screenshotDelay: 500
        });
    });

    it("should throw error (Empty fields)", async ({ browser }) => {
        const loginButton = await browser.$(selectors.loginButton);
        await loginButton.click();

        await browser.assertView('login-empty-fields-error', 'body', {
            screenshotDelay: 1000
        });
    });

    it("should throw error (Login error)", async ({ browser }) => {
        const inputEmail = await browser.$(selectors.emailInput);
        const inputPassword = await browser.$(selectors.passwordInput);
        const loginButton = await browser.$(selectors.loginButton);

        await inputEmail.setValue('w');
        await inputPassword.setValue('w');
        await loginButton.click();

        await inputEmail.clearValue();
        await inputPassword.clearValue();

        await browser.assertView('login-error', 'body', {
            screenshotDelay: 5000
        });
    });

    it("should throw error (Incorrect credentials)", async ({ browser }) => {
        const inputEmail = await browser.$(selectors.emailInput);
        const inputPassword = await browser.$(selectors.passwordInput);
        const loginButton = await browser.$(selectors.loginButton);

        await inputEmail.setValue('21non_exist23@ya.ru');
        await inputPassword.setValue('43www222');
        await loginButton.click();

        await inputEmail.clearValue();
        await inputPassword.clearValue();

        await browser.assertView('login-incorrect-credentials', 'body', {
            screenshotDelay: 1000
        });
    });

});
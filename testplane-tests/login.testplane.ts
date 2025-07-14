import { stabilizeGif } from '../utils/stabilize-utils';
import { AUTH_DATA } from '../auth';

// Constants for masking gallery images only (not login fields)
const GALLERY_IMAGE_SELECTORS = [
    AUTH_DATA.selectors.galleryImage(0),
    AUTH_DATA.selectors.galleryImage(1),
    AUTH_DATA.selectors.galleryImage(2),
    AUTH_DATA.selectors.galleryImage(3)
];

async function setPageZoom(browser: any, zoom: number = AUTH_DATA.ui.pageZoom) {
    await browser.execute((zoomLevel: number) => {
        document.body.style.zoom = zoomLevel.toString();
    }, zoom);
}

async function setupLoginPage(browser: any) {
    await browser.url("/login");
    await browser.waitUntil(async () => {
        const emailInput = await browser.$(AUTH_DATA.selectors.loginEmailInput);
        return await emailInput.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.long });
    await setPageZoom(browser);
}

async function getLoginElements(browser: any) {
    return {
        emailInput: await browser.$(AUTH_DATA.selectors.loginEmailInput),
        passwordInput: await browser.$(AUTH_DATA.selectors.loginPasswordInput),
        submitButton: await browser.$(AUTH_DATA.selectors.loginSubmitButton)
    };
}

async function fillLoginForm(browser: any, email: string, password: string) {
    const { emailInput, passwordInput } = await getLoginElements(browser);
    await emailInput.setValue(email);
    await passwordInput.setValue(password);
}

async function submitLoginAndWaitForProfile(browser: any) {
    const { submitButton } = await getLoginElements(browser);
    await submitButton.click();

    await browser.pause(AUTH_DATA.timeouts.medium);
    await browser.waitUntil(async () => {
        const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
        return await userAvatar.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.long });

    // Стабилизируем только GIF аватар, НЕ маскируем поля авторизации
    await stabilizeGif(browser);
}

describe("ShockLoginPage tests", () => {

    describe("Default state", () => {
        it("should show login form after navigation", async function() {
            await setupLoginPage(this.browser);
            await this.browser.assertView("login-form-default", "body");
        });
    });

    describe("Navigation", () => {

        it("should navigate to registration form", async function() {
            await setupLoginPage(this.browser);
            const registerButton = await this.browser.$(AUTH_DATA.selectors.loginRegisterButton);
            await registerButton.click();

            await this.browser.pause(AUTH_DATA.timeouts.short);
            await this.browser.assertView("login-to-register-navigation", "body");
        });
    });

    describe("Input field states", () => {
        it("should show focused email field", async function() {
            await setupLoginPage(this.browser);
            const { emailInput } = await getLoginElements(this.browser);
            await emailInput.click();

            await this.browser.assertView("login-email-focused", "body");
        });

        it("should show focused password field", async function() {
            await setupLoginPage(this.browser);
            const { passwordInput } = await getLoginElements(this.browser);
            await passwordInput.click();

            await this.browser.assertView("login-password-focused", "body");
        });

        it("should show email field with text and focus", async function() {
            await setupLoginPage(this.browser);
            const { emailInput } = await getLoginElements(this.browser);
            
            await emailInput.setValue("test@example.com");
            await emailInput.click();

            await this.browser.assertView("login-email-with-text-focused", "body");
        });

        it("should show password field with text and focus", async function() {
            await setupLoginPage(this.browser);
            const { passwordInput } = await getLoginElements(this.browser);
            
            await passwordInput.setValue("testpassword");
            await passwordInput.click();

            await this.browser.assertView("login-password-with-text-focused", "body");
        });

        it("should show email field with text without focus", async function() {
            await setupLoginPage(this.browser);
            const { emailInput } = await getLoginElements(this.browser);
            
            await emailInput.setValue("test@example.com");
            // Кликаем в другое место чтобы убрать фокус
            await this.browser.execute(() => document.body.click());

            await this.browser.assertView("login-email-with-text-no-focus", "body");
        });

        it("should show password field with text without focus", async function() {
            await setupLoginPage(this.browser);
            const { passwordInput } = await getLoginElements(this.browser);
            
            await passwordInput.setValue("testpassword");
            // Кликаем в другое место чтобы убрать фокус
            await this.browser.execute(() => document.body.click());

            await this.browser.assertView("login-password-with-text-no-focus", "body");
        });


        it("should show email field after clearing", async function() {
            await setupLoginPage(this.browser);
            const { emailInput } = await getLoginElements(this.browser);
            
            await emailInput.setValue("test@example.com");
            await emailInput.clearValue();
            await emailInput.click();

            await this.browser.assertView("login-email-cleared-focused", "body");
        });

        it("should show password field after clearing", async function() {
            await setupLoginPage(this.browser);
            const { passwordInput } = await getLoginElements(this.browser);
            
            await passwordInput.setValue("testpassword");
            await passwordInput.clearValue();
            await passwordInput.click();

            await this.browser.assertView("login-password-cleared-focused", "body");
        });
    });

    describe("Form validation errors", () => {
        it("should show validation errors for empty fields", async function() {
            await setupLoginPage(this.browser);
            const { submitButton } = await getLoginElements(this.browser);
            await submitButton.click();

            await this.browser.assertView("login-empty-fields-error", "body");
        });

        it("should show password error when only email filled", async function() {
            await setupLoginPage(this.browser);

            const testUser = {
                email: "test@example.com",
                password: ""
            };
            await fillLoginForm(this.browser, testUser.email, testUser.password);

            const { submitButton } = await getLoginElements(this.browser);
            await submitButton.click();

            await this.browser.assertView("login-password-missing-error", "body");
        });

        it("should show email error when only password filled", async function() {
            await setupLoginPage(this.browser);

            const testUser = {
                email: "",
                password: "testpassword"
            };
            await fillLoginForm(this.browser, testUser.email, testUser.password);

            const { submitButton } = await getLoginElements(this.browser);
            await submitButton.click();

            await this.browser.assertView("login-email-missing-error", "body");
        });
    });

    describe("Authentication errors", () => {
        it("should show invalid credentials error with non-existent email", async function() {
            await setupLoginPage(this.browser);

            const testUser = {
                email: "fjdkjfdjvfdvojdovfjd@dhhd.ru",
                password: "fksfndkwj63"
            };
            await fillLoginForm(this.browser, testUser.email, testUser.password);

            const { submitButton } = await getLoginElements(this.browser);
            await submitButton.click();

            await this.browser.pause(AUTH_DATA.timeouts.short);
            await this.browser.assertView("login-invalid-credentials-error", "body");
        });

        it("should show invalid credentials error with wrong password", async function() {
            await setupLoginPage(this.browser);

            const testUser = {
                email: AUTH_DATA.knownUser.email,
                password: "wrongpassword123"
            };
            await fillLoginForm(this.browser, testUser.email, testUser.password);

            const { submitButton } = await getLoginElements(this.browser);
            await submitButton.click();

            await this.browser.pause(AUTH_DATA.timeouts.short);
            await this.browser.assertView("login-wrong-password-error", "body");
        });

        it("should show general error for invalid email format", async function() {
            await setupLoginPage(this.browser);

            const testUser = {
                email: "invalid-email-format",
                password: "testpassword"
            };
            await fillLoginForm(this.browser, testUser.email, testUser.password);

            const { submitButton } = await getLoginElements(this.browser);
            await submitButton.click();

            await this.browser.pause(AUTH_DATA.timeouts.short);
            await this.browser.assertView("login-general-error", "body");
        });
    });
}); 
import { stabilizeGif } from '../helpers/stabilizeAnimations.js';
import { maskInputFields } from '../helpers/maskElements.js';
import { AUTH_DATA, generateNewUser } from './auth';

// Constants for masking
const LOGIN_INPUT_SELECTORS = [
    AUTH_DATA.selectors.loginEmailInput,
    AUTH_DATA.selectors.loginPasswordInput
];

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

async function maskLoginInputs(browser: any) {
    await maskInputFields(browser, LOGIN_INPUT_SELECTORS);
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
    
    await stabilizeGif(browser);
    await maskInputFields(browser, GALLERY_IMAGE_SELECTORS);
}

describe("ShockLoginPage tests", () => {
    
    describe("Default state", () => {
        it("should show login form after navigation", async ({browser}) => {
            await setupLoginPage(browser);
            await browser.assertView("login-form-default", "body");
        });
    });

    describe("Navigation", () => {
        it("should navigate back to main page", async ({browser}) => {
            await setupLoginPage(browser);
            
            // Ensure we're on login page by checking if back button exists
            const backButton = await browser.$(AUTH_DATA.selectors.loginBackButton);
            await browser.waitUntil(async () => {
                return await backButton.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.long });
            
            await backButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.medium);
            await browser.assertView("login-back-to-main", "body");
        });

        it("should navigate to registration form", async ({browser}) => {
            await setupLoginPage(browser);
            const registerButton = await browser.$(AUTH_DATA.selectors.loginRegisterButton);
            await registerButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await browser.assertView("login-to-register-navigation", "body");
        });
    });

    describe("Successful login", () => {
        it("should login successfully with correct credentials", async ({browser}) => {
            await setupLoginPage(browser);
            
            await fillLoginForm(browser, AUTH_DATA.knownUser.email, AUTH_DATA.knownUser.password);
            await maskLoginInputs(browser);
            await submitLoginAndWaitForProfile(browser);
            
            await browser.assertView("login-success-profile", "body");
        });
    });

    describe("Input field states", () => {
        it("should show focused email field", async ({browser}) => {
            await setupLoginPage(browser);
            const { emailInput } = await getLoginElements(browser);
            await emailInput.click();
            
            await maskLoginInputs(browser);
            await browser.assertView("login-email-focused", "body");
        });

        it("should show focused password field", async ({browser}) => {
            await setupLoginPage(browser);
            const { passwordInput } = await getLoginElements(browser);
            await passwordInput.click();
            
            await maskLoginInputs(browser);
            await browser.assertView("login-password-focused", "body");
        });

        it("should show filled form with masked inputs", async ({browser}) => {
            await setupLoginPage(browser);
            
            const testUser = generateNewUser();
            await fillLoginForm(browser, testUser.email, testUser.password);
            await maskLoginInputs(browser);
            
            await browser.assertView("login-form-filled-masked", "body");
        });
    });

    describe("Form validation errors", () => {
        it("should show validation errors for empty fields", async ({browser}) => {
            await setupLoginPage(browser);
            const { submitButton } = await getLoginElements(browser);
            await submitButton.click();
            
            await maskLoginInputs(browser);
            await browser.assertView("login-empty-fields-error", "body");
        });

        it("should show password error when only email filled", async ({browser}) => {
            await setupLoginPage(browser);
            
            const testUser = generateNewUser();
            await fillLoginForm(browser, testUser.email, "");
            
            const { submitButton } = await getLoginElements(browser);
            await submitButton.click();
            
            await maskLoginInputs(browser);
            await browser.assertView("login-password-missing-error", "body");
        });

        it("should show email error when only password filled", async ({browser}) => {
            await setupLoginPage(browser);
            
            const testUser = generateNewUser();
            await fillLoginForm(browser, "", testUser.password);
            
            const { submitButton } = await getLoginElements(browser);
            await submitButton.click();
            
            await maskLoginInputs(browser);
            await browser.assertView("login-email-missing-error", "body");
        });
    });

    describe("Authentication errors", () => {
        it("should show invalid credentials error", async ({browser}) => {
            await setupLoginPage(browser);
            
            const testUser = generateNewUser();
            const anotherUser = generateNewUser();
            await fillLoginForm(browser, testUser.email, anotherUser.password);
            
            const { submitButton } = await getLoginElements(browser);
            await submitButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskLoginInputs(browser);
            
            await browser.assertView("login-invalid-credentials-error", "body");
        });

        it("should show general error for invalid email format", async ({browser}) => {
            await setupLoginPage(browser);
            
            const testUser = generateNewUser();
            await fillLoginForm(browser, "invalid-email-format", testUser.password);
            
            const { submitButton } = await getLoginElements(browser);
            await submitButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskLoginInputs(browser);
            
            await browser.assertView("login-general-error", "body");
        });
    });
});

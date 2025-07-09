import { stabilizeGif } from '../helpers/stabilizeAnimations.js';
import { maskInputFields } from '../helpers/maskElements.js';
import { AUTH_DATA, generateNewUser, generateNewUserForRegistration } from './auth';

// Constants for masking
const REGISTER_INPUT_SELECTORS = [
    AUTH_DATA.selectors.registerEmailInput,
    AUTH_DATA.selectors.registerPasswordInput,
    AUTH_DATA.selectors.registerAgeInput
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

async function setupRegisterPage(browser: any) {
    await browser.url("/register");
    await browser.waitUntil(async () => {
        const emailInput = await browser.$(AUTH_DATA.selectors.registerEmailInput);
        return await emailInput.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.long });
    await setPageZoom(browser);
}

async function getRegisterElements(browser: any) {
    return {
        emailInput: await browser.$(AUTH_DATA.selectors.registerEmailInput),
        passwordInput: await browser.$(AUTH_DATA.selectors.registerPasswordInput),
        ageInput: await browser.$(AUTH_DATA.selectors.registerAgeInput),
        submitButton: await browser.$(AUTH_DATA.selectors.registerSubmitButton)
    };
}

async function maskRegisterInputs(browser: any) {
    await maskInputFields(browser, REGISTER_INPUT_SELECTORS);
}

async function fillRegisterForm(browser: any, email: string, password: string, age: string) {
    const { emailInput, passwordInput, ageInput } = await getRegisterElements(browser);
    await emailInput.setValue(email);
    await passwordInput.setValue(password);
    await ageInput.setValue(age);
}

async function submitRegisterAndWaitForProfile(browser: any) {
    const { submitButton } = await getRegisterElements(browser);
    await submitButton.click();
    
    await browser.pause(AUTH_DATA.timeouts.medium);
    await browser.waitUntil(async () => {
        const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
        return await userAvatar.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.long });
    
    await stabilizeGif(browser);
    await maskInputFields(browser, GALLERY_IMAGE_SELECTORS);
}

describe("ShockRegisterPage tests", () => {
    
    describe("Default state", () => {
        it("should show registration form after navigation", async ({browser}) => {
            await setupRegisterPage(browser);
            await browser.assertView("register-form-default", "body");
        });
    });

    describe("Navigation", () => {
        it("should navigate back to main page", async ({browser}) => {
            await setupRegisterPage(browser);
            
            const backButton = await browser.$(AUTH_DATA.selectors.registerBackButton);
            await browser.waitUntil(async () => {
                return await backButton.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.long });
            
            await backButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.medium);
            await browser.assertView("register-back-to-main", "body");
        });
    });

    describe("Successful registration", () => {
        it("should register successfully with valid data", async ({browser}) => {
            await setupRegisterPage(browser);
            
            const testUser = generateNewUserForRegistration();
            await fillRegisterForm(browser, testUser.email, testUser.password, testUser.age.toString());
            await submitRegisterAndWaitForProfile(browser);
            
            await browser.assertView("register-success-profile", "body");
        });
    });

    describe("Form validation errors", () => {
        it("should show validation errors for empty fields", async ({browser}) => {
            await setupRegisterPage(browser);
            const { submitButton } = await getRegisterElements(browser);
            await submitButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await browser.assertView("register-empty-fields-error", "body");
        });

        it("should show invalid email format error", async ({browser}) => {
            await setupRegisterPage(browser);
            
            const testUser = generateNewUser();
            await fillRegisterForm(browser, "invalid-email-format", testUser.password, testUser.age.toString());
            
            const { submitButton } = await getRegisterElements(browser);
            await submitButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskRegisterInputs(browser);
            
            await browser.assertView("register-invalid-email-error", "body");
        });

        it("should show password too short error", async ({browser}) => {
            await setupRegisterPage(browser);
            
            const testUser = generateNewUser();
            await fillRegisterForm(browser, testUser.email, "short", testUser.age.toString());
            
            const { submitButton } = await getRegisterElements(browser);
            await submitButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskRegisterInputs(browser);
            
            await browser.assertView("register-password-too-short-error", "body");
        });

        it("should show invalid age error", async ({browser}) => {
            await setupRegisterPage(browser);
            
            const testUser = generateNewUser();
            await fillRegisterForm(browser, testUser.email, testUser.password, "-1");
            
            const { submitButton } = await getRegisterElements(browser);
            await submitButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskRegisterInputs(browser);
            
            await browser.assertView("register-invalid-age-error", "body");
        });

        it("should show user already exists error", async ({browser}) => {
            await setupRegisterPage(browser);
            
            // Using known existing user email
            const testUser = generateNewUser();
            await fillRegisterForm(browser, AUTH_DATA.knownUser.email, testUser.password, testUser.age.toString());
            
            const { submitButton } = await getRegisterElements(browser);
            await submitButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskRegisterInputs(browser);
            
            await browser.assertView("register-user-exists-error", "body");
        });
    });
}); 
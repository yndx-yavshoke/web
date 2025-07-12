import { stabilizeGif } from '../helpers/stabilizeAnimations.js';
import { maskInputFields } from '../helpers/maskElements.js';
import { AUTH_DATA } from './auth';

// Constants for masking
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

async function setupProfilePage(browser: any) {
    // Сначала логинимся
    await browser.url("/login");
    await browser.waitUntil(async () => {
        const emailInput = await browser.$(AUTH_DATA.selectors.loginEmailInput);
        return await emailInput.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.long });

    // Заполняем форму логина
    const emailInput = await browser.$(AUTH_DATA.selectors.loginEmailInput);
    const passwordInput = await browser.$(AUTH_DATA.selectors.loginPasswordInput);
    const submitButton = await browser.$(AUTH_DATA.selectors.loginSubmitButton);

    await emailInput.setValue(AUTH_DATA.knownUser.email);
    await passwordInput.setValue(AUTH_DATA.knownUser.password);
    await submitButton.click();

    // Ждем загрузки профиля
    await browser.pause(AUTH_DATA.timeouts.medium);
    await browser.waitUntil(async () => {
        const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
        return await userAvatar.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.long });

    await setPageZoom(browser);
}

async function stabilizeProfilePage(browser: any) {
    // Стабилизируем GIF аватар
    await stabilizeGif(browser);
    // Маскируем галерею изображений
    await maskInputFields(browser, GALLERY_IMAGE_SELECTORS);
}

describe("ShockProfilePage tests", () => {
    
    describe("Default state", () => {
        it("user profile", async ({browser}) => {
            await setupProfilePage(browser);
            await stabilizeProfilePage(browser);
            
            await browser.assertView("profile-default-state", "body");
        });
    });

    describe("Navigation", () => {
        it("edit button", async ({browser}) => {
            await setupProfilePage(browser);
            
            const editButton = await browser.$(AUTH_DATA.selectors.userEditProfileButton);
            await editButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.long);
            await setPageZoom(browser);
            await browser.assertView("profile-edit-navigation", "body");
        });

        it("logout button", async ({browser}) => {
            await setupProfilePage(browser);
            
            const logoutButton = await browser.$(AUTH_DATA.selectors.userLogoutButton);
            await logoutButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.medium);
            await browser.waitUntil(async () => {
                const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
                return await emailInput.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.long });
            
            await setPageZoom(browser);
            await browser.assertView("profile-logout-navigation", "body");
        });
    });
}); 
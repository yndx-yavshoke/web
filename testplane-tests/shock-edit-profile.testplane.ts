import { stabilizeGif } from '../helpers/stabilizeAnimations.js';
import { maskInputFields } from '../helpers/maskElements.js';
import { AUTH_DATA, generateNewUser } from './auth';

// Constants for masking gallery images
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

async function setupEditProfilePage(browser: any) {
    // Сначала логинимся
    await browser.url("/login");
    await browser.waitUntil(async () => {
        const emailInput = await browser.$(AUTH_DATA.selectors.loginEmailInput);
        return await emailInput.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.medium });

    // Заполняем форму логина
    const emailInput = await browser.$(AUTH_DATA.selectors.loginEmailInput);
    const passwordInput = await browser.$(AUTH_DATA.selectors.loginPasswordInput);
    const submitButton = await browser.$(AUTH_DATA.selectors.loginSubmitButton);

    await emailInput.setValue(AUTH_DATA.knownUser.email);
    await passwordInput.setValue(AUTH_DATA.knownUser.password);
    await submitButton.click();

    // Ждем загрузки профиля
    await browser.pause(AUTH_DATA.timeouts.short);
    await browser.waitUntil(async () => {
        const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
        return await userAvatar.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.medium });

    // Переходим на страницу редактирования
    const editButton = await browser.$(AUTH_DATA.selectors.userEditProfileButton);
    await editButton.click();
    
    await browser.pause(AUTH_DATA.timeouts.short);
    await setPageZoom(browser);
}

async function stabilizeProfilePage(browser: any) {
    // Стабилизируем GIF аватар
    await stabilizeGif(browser);
    // Маскируем галерею изображений
    await maskInputFields(browser, GALLERY_IMAGE_SELECTORS);
}

describe("ShockEditProfilePage tests", () => {
    
    describe("Default state", () => {
        it("edit profile form", async ({browser}) => {
            await setupEditProfilePage(browser);
            
            await browser.assertView("edit-profile-default-state", "body");
        });
    });

    describe("Input field states", () => {
        it("empty name field with placeholder", async ({browser}) => {
            await setupEditProfilePage(browser);
            
            const nameInput = await browser.$(AUTH_DATA.selectors.editProfileNameInput);
            await nameInput.clearValue();
            
            await browser.assertView("edit-profile-empty-field", "body");
        });
    });

    describe("Navigation", () => {
        it("cancel button", async ({browser}) => {
            await setupEditProfilePage(browser);
            
            // Нажимаем кнопку отмены для возврата на профиль
            const cancelButton = await browser.$(AUTH_DATA.selectors.editProfileCancelButton);
            await cancelButton.click();
            
            // Ждем загрузки страницы профиля
            await browser.waitUntil(async () => {
                const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
                return await userAvatar.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.medium });
            
            // Стабилизируем и маскируем страницу профиля
            await setPageZoom(browser);
            await stabilizeProfilePage(browser);
            await browser.assertView("edit-profile-navigation-back", "body");
        });
    });

    describe("Name change", () => {
        it("change name to NewNameKotik", async ({browser}) => {
            await setupEditProfilePage(browser);
            
            // Меняем имя на "NewNameKotik"
            const nameInput = await browser.$(AUTH_DATA.selectors.editProfileNameInput);
            await nameInput.clearValue();
            await nameInput.setValue("NewNameKotik");
            
            // Сохраняем изменения
            const saveButton = await browser.$(AUTH_DATA.selectors.editProfileSaveButton);
            await saveButton.click();
            
            // Возвращаемся на страницу профиля через кнопку отмены
            const cancelButton = await browser.$(AUTH_DATA.selectors.editProfileCancelButton);
            await cancelButton.click();
            
            // Ждем возврата на страницу профиля
            await browser.pause(AUTH_DATA.timeouts.short);
            await browser.waitUntil(async () => {
                const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
                return await userAvatar.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.medium });
            
            // Стабилизируем и маскируем страницу профиля
            await setPageZoom(browser);
            await stabilizeProfilePage(browser);
            await browser.assertView("edit-profile-name-changed", "body");
            
            // Возвращаем исходное имя "Neko"
            const editButton = await browser.$(AUTH_DATA.selectors.userEditProfileButton);
            await editButton.click();
            
            await browser.pause(AUTH_DATA.timeouts.short);
            await setPageZoom(browser);
            
            const nameInputRestore = await browser.$(AUTH_DATA.selectors.editProfileNameInput);
            await nameInputRestore.clearValue();
            await nameInputRestore.setValue("Neko");
            
            const saveButtonRestore = await browser.$(AUTH_DATA.selectors.editProfileSaveButton);
            await saveButtonRestore.click();
            const cancelButtonRestore = await browser.$(AUTH_DATA.selectors.editProfileCancelButton);
            await cancelButtonRestore.click();
            
            // Ждем возврата на страницу профиля
            await browser.pause(AUTH_DATA.timeouts.short);
            await browser.waitUntil(async () => {
                const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
                return await userAvatar.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.medium });
        });
    });
});


import { stabilizeGif } from '../utils/stabilize-utils';
import { maskInputFields } from '../utils/stabilize-utils';
import { AUTH_DATA } from '../auth';


// Constants for masking gallery images only
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

    // Ждем загрузки страницы редактирования
    await browser.waitUntil(async () => {
        const nameInput = await browser.$(AUTH_DATA.selectors.editProfileNameInput);
        return await nameInput.isDisplayed();
    }, { timeout: AUTH_DATA.timeouts.long });

    await setPageZoom(browser);
}

async function stabilizeProfilePage(browser: any) {
    // Стабилизируем GIF аватар - заменяем на статичное изображение
    await browser.execute(() => {
        const img = document.querySelector('[data-testid="user-avatar"] img') as HTMLImageElement;
        if (img && img.src && img.src.includes(".gif")) {
            img.src = '/assets/assets/images/static-cat.png';
        }
    });
    
    // Ждем загрузки статичного изображения
    await browser.pause(AUTH_DATA.timeouts.short);
    
    // Маскируем только галерею изображений
    await maskInputFields(browser, GALLERY_IMAGE_SELECTORS);
}

describe("ShockEditProfilePage tests", () => {

    describe("Default state", () => {
        it("edit profile form", async function() {
            await setupEditProfilePage(this.browser);

            await this.browser.assertView("edit-profile-default-state", "body");
        });
    });

    describe("Input field states", () => {
        it("empty name field with placeholder", async function() {
            await setupEditProfilePage(this.browser);

            const nameInput = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
            await nameInput.clearValue();

            await this.browser.assertView("edit-profile-empty-field", "body");
        });


        it("name field focused", async function() {
            await setupEditProfilePage(this.browser);

            const nameInput = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
            await nameInput.click();

            await this.browser.assertView("edit-profile-name-focused", "body");
        });
    });

    describe("Navigation", () => {
    //     it("cancel button navigation back to profile", async function() {
    //         await setupEditProfilePage(this.browser);

    //         // Нажимаем кнопку отмены для возврата на профиль
    //         const cancelButton = await this.browser.$(AUTH_DATA.selectors.editProfileCancelButton);
    //         await cancelButton.click();

    //         // Ждем загрузки страницы профиля
    //         await this.browser.waitUntil(async () => {
    //             const userAvatar = await this.browser.$(AUTH_DATA.selectors.userAvatar);
    //             return await userAvatar.isDisplayed();
    //         }, { timeout: AUTH_DATA.timeouts.medium });

    //         // Стабилизируем и маскируем страницу профиля
    //         await setPageZoom(this.browser);
    //         await stabilizeProfilePage(this.browser);
    //         await this.browser.assertView("edit-profile-navigation-back", "body", {
    //             disableAnimation: true,
    //             ignoreElements: [
    //                 '.r-1joea0r > .css-146c3p1:nth-of-type(1)', // userName
    //                 '.r-1joea0r > .css-146c3p1:nth-of-type(2)', // userStatus
    //                 '.r-vw2c0b.r-evnaw', // цифры статистики
    //                 '[data-testid^="gallery-item-"]', // посты
    //             ]
    //         });
    //     });
    // });

    // describe("Name change", () => {
    //     it("change name to NewNameKotik", async function() {
    //         await setupEditProfilePage(this.browser);

    //         // Меняем имя на "NewNameKotik"
    //         const nameInput = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
    //         await nameInput.clearValue();
    //         await nameInput.setValue("NewNameKotik");

    //         // Сохраняем изменения
    //         const saveButton = await this.browser.$(AUTH_DATA.selectors.editProfileSaveButton);
    //         await saveButton.click();

    //         // Возвращаемся на страницу профиля через кнопку отмены
    //         const cancelButton = await this.browser.$(AUTH_DATA.selectors.editProfileCancelButton);
    //         await cancelButton.click();

    //         // Ждем возврата на страницу профиля
    //         await this.browser.pause(AUTH_DATA.timeouts.short);
    //         await this.browser.waitUntil(async () => {
    //             const userAvatar = await this.browser.$(AUTH_DATA.selectors.userAvatar);
    //             return await userAvatar.isDisplayed();
    //         }, { timeout: AUTH_DATA.timeouts.medium });

    //         // Стабилизируем и маскируем страницу профиля
    //         await setPageZoom(this.browser);
    //         await stabilizeProfilePage(this.browser);
    //         await this.browser.assertView("edit-profile-name-changed", "body", {
    //             disableAnimation: true,
    //             ignoreElements: [
    //                 '.r-1joea0r > .css-146c3p1:nth-of-type(1)', // userName
    //                 '.r-1joea0r > .css-146c3p1:nth-of-type(2)', // userStatus
    //                 '.r-vw2c0b.r-evnaw', // цифры статистики
    //                 '[data-testid^="gallery-item-"]', // посты
    //             ]
    //         });

    //         // Возвращаем исходное имя
    //         const editButton = await this.browser.$(AUTH_DATA.selectors.userEditProfileButton);
    //         await editButton.click();

    //         await this.browser.waitUntil(async () => {
    //             const nameInput = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
    //             return await nameInput.isDisplayed();
    //         }, { timeout: AUTH_DATA.timeouts.long });

    //         await setPageZoom(this.browser);

    //         const nameInputRestore = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
    //         await nameInputRestore.clearValue();
    //         await nameInputRestore.setValue("Василиса");

    //         const saveButtonRestore = await this.browser.$(AUTH_DATA.selectors.editProfileSaveButton);
    //         await saveButtonRestore.click();
    //         const cancelButtonRestore = await this.browser.$(AUTH_DATA.selectors.editProfileCancelButton);
    //         await cancelButtonRestore.click();

    //         // Ждем возврата на страницу профиля
    //         await this.browser.pause(AUTH_DATA.timeouts.short);
    //         await this.browser.waitUntil(async () => {
    //             const userAvatar = await this.browser.$(AUTH_DATA.selectors.userAvatar);
    //             return await userAvatar.isDisplayed();
    //         }, { timeout: AUTH_DATA.timeouts.medium });
    //     });
    // });

    // describe("Form validation", () => {
    //     it("empty name validation error", async function() {
    //         await setupEditProfilePage(this.browser);

    //         const nameInput = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
    //         const saveButton = await this.browser.$(AUTH_DATA.selectors.editProfileSaveButton);

    //         await nameInput.clearValue();
    //         await saveButton.click();

    //         await this.browser.pause(AUTH_DATA.timeouts.short);
    //         await this.browser.assertView("edit-profile-empty-name-error", "body");
    //     });

        it("very long name validation error", async function() {
            await setupEditProfilePage(this.browser);

            const nameInput = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
            const saveButton = await this.browser.$(AUTH_DATA.selectors.editProfileSaveButton);

            await nameInput.setValue("A".repeat(100));
            await saveButton.click();

            await this.browser.pause(AUTH_DATA.timeouts.short);
            await this.browser.assertView("edit-profile-long-name-error", "body");
        });

    //     it("special characters validation error", async function() {
    //         await setupEditProfilePage(this.browser);

    //         const nameInput = await this.browser.$(AUTH_DATA.selectors.editProfileNameInput);
    //         const saveButton = await this.browser.$(AUTH_DATA.selectors.editProfileSaveButton);

    //         await nameInput.setValue("!@#$%^&*()");
    //         await saveButton.click();

    //         await this.browser.pause(AUTH_DATA.timeouts.short);
    //         await this.browser.assertView("edit-profile-special-chars-error", "body");
    //     });
    // });

    describe("Button states", () => {
        it("save button", async function() {
            await setupEditProfilePage(this.browser);

            const saveButton = await this.browser.$(AUTH_DATA.selectors.editProfileSaveButton);
            await saveButton.waitForDisplayed({timeout: 5000});

            await this.browser.assertView("edit-profile-save-button", AUTH_DATA.selectors.editProfileSaveButton, {
                compositeImage: true,
                disableAnimation: true
            });
        });

        it("cancel button", async function() {
            await setupEditProfilePage(this.browser);

            const cancelButton = await this.browser.$(AUTH_DATA.selectors.editProfileCancelButton);
            await cancelButton.waitForDisplayed({timeout: 5000});

            await this.browser.assertView("edit-profile-cancel-button", AUTH_DATA.selectors.editProfileCancelButton, {
                compositeImage: true,
                disableAnimation: true
            });
        });

         });
    });
}); 
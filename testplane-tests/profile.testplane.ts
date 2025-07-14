import { stabilizeGif } from '../utils/stabilize-utils';
import { maskInputFields } from '../utils/stabilize-utils';
import { checkAvatarStabilization } from '../utils/stabilize-utils';
import { stabilizeUserAvatar } from '../utils/stabilize-utils';
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

    // Ждем загрузки профиля и аватара
    await browser.pause(AUTH_DATA.timeouts.medium);
    await browser.waitUntil(async () => {
        const userAvatar = await browser.$(AUTH_DATA.selectors.userAvatar);
        const avatarImg = await userAvatar.$('img');
        return await userAvatar.isDisplayed() && await avatarImg.isDisplayed() && await avatarImg.isExisting();
    }, { timeout: AUTH_DATA.timeouts.long });

    await setPageZoom(browser);
}

async function stabilizeProfilePage(browser: any) {
    // Ждем загрузки аватара
    await browser.waitUntil(async () => {
        const avatar = await browser.$(AUTH_DATA.selectors.userAvatar);
        const img = await avatar.$('img');
        return await img.isDisplayed() && await img.isExisting();
    }, { timeout: AUTH_DATA.timeouts.long });

    // Стабилизируем аватар пользователя
    await stabilizeUserAvatar(browser);
    
    // Маскируем только галерею изображений
    await maskInputFields(browser, GALLERY_IMAGE_SELECTORS);
}

describe("ShockProfilePage tests", () => {

    describe("Default state", () => {
        it("user profile", async function() {
            await setupProfilePage(this.browser);
            await stabilizeProfilePage(this.browser);

            // Проверяем, что аватар стабилизирован
            await this.browser.waitUntil(async () => {
                return await checkAvatarStabilization(this.browser);
            }, { timeout: AUTH_DATA.timeouts.long });

            await this.browser.assertView("profile-default-state", "body", {
                disableAnimation: true,
                ignoreElements: [
                    '.r-1joea0r > .css-146c3p1:nth-of-type(1)', // userName
                    '.r-1joea0r > .css-146c3p1:nth-of-type(2)', // userStatus
                    '.r-vw2c0b.r-evnaw', // цифры статистики
                    '[data-testid^="gallery-item-"]', // посты
                ]
            });
        });
    });

    describe("Navigation", () => {
        
        it("logout button navigation", async function() {
            await setupProfilePage(this.browser);

            const logoutButton = await this.browser.$(AUTH_DATA.selectors.userLogoutButton);
            await logoutButton.click();

            await this.browser.pause(AUTH_DATA.timeouts.medium);
            await this.browser.waitUntil(async () => {
                const emailInput = await this.browser.$(AUTH_DATA.selectors.emailInput);
                return await emailInput.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.long });

            await setPageZoom(this.browser);
            await this.browser.assertView("profile-logout-navigation", "body");
        });
    });

    describe("Profile elements", () => {
        it("user avatar", async function() {
            await setupProfilePage(this.browser);
            //await stabilizeProfilePage(this.browser);
            
            const userAvatar = await this.browser.$(AUTH_DATA.selectors.userAvatar);
            await userAvatar.waitForDisplayed({timeout: 5000});
            
            // Дополнительная проверка, что изображение внутри аватара загружено
            const avatarImg = await userAvatar.$('img');
            await avatarImg.waitForDisplayed({timeout: 5000});
            
            // Ждем еще немного для полной стабилизации
            await this.browser.pause(AUTH_DATA.timeouts.short);
            
            // Проверяем, что аватар стабилизирован
            await this.browser.waitUntil(async () => {
                return await checkAvatarStabilization(this.browser);
            }, { timeout: AUTH_DATA.timeouts.long });
            
            await this.browser.assertView("profile-user-avatar", AUTH_DATA.selectors.userAvatar, {
                compositeImage: true,
                disableAnimation: true
            });
        });

        it("edit profile button", async function() {
            await setupProfilePage(this.browser);
            
            const editButton = await this.browser.$(AUTH_DATA.selectors.userEditProfileButton);
            await editButton.waitForDisplayed({timeout: 5000});
            
            await this.browser.assertView("profile-edit-button", AUTH_DATA.selectors.userEditProfileButton, {
                compositeImage: true,
                disableAnimation: true
            });
        });

        it("logout button", async function() {
            await setupProfilePage(this.browser);
            
            const logoutButton = await this.browser.$(AUTH_DATA.selectors.userLogoutButton);
            await logoutButton.waitForDisplayed({timeout: 5000});
            
            await this.browser.assertView("profile-logout-button", AUTH_DATA.selectors.userLogoutButton, {
                compositeImage: true,
                disableAnimation: true
            });
        });
    });

 }); 
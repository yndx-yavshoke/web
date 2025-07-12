import { stabilizeGif } from '../helpers/stabilizeAnimations.js';
import { maskInputFields } from '../helpers/maskElements.js';
import { AUTH_DATA, generateNewUser, generateTestEmail } from './auth';

// Функция для установки масштаба страницы
async function setPageZoom(browser: any, zoom: number = AUTH_DATA.ui.pageZoom) {
    await browser.execute((zoomLevel: number) => {
        document.body.style.zoom = zoomLevel.toString();
    }, zoom);
}

// Функция для закрытия конфетти белым прямоугольником
async function coverConfettiWithRectangle(browser: any) {
    await browser.execute(() => {
        // Создаем белый прямоугольник для закрытия конфетти
        const coverDiv = document.createElement('div');
        coverDiv.style.position = 'fixed';
        coverDiv.style.bottom = '0';
        coverDiv.style.left = '0';
        coverDiv.style.width = '100%';
        coverDiv.style.height = '20px';
        coverDiv.style.backgroundColor = 'white';
        coverDiv.style.zIndex = '9999';
        coverDiv.style.pointerEvents = 'none';
        
        document.body.appendChild(coverDiv);
    });
}

async function setupPage(browser: any) {
    await browser.url("/");
    const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
    await emailInput.waitForDisplayed();
    await setPageZoom(browser, AUTH_DATA.ui.pageZoom);
    return emailInput;
}

describe("ShockMainPage tests", () => {
    
    beforeEach(async ({browser}) => {
        // Устанавливаем начальное состояние перед каждым тестом
        await browser.url("/");
        
        // Ждем загрузки главной страницы
        await browser.waitUntil(async () => {
            const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
            return await emailInput.isDisplayed();
        }, { 
            timeout: AUTH_DATA.timeouts.long,
            timeoutMsg: 'Main page email input not displayed after timeout'
        });
        
        // Устанавливаем масштаб страницы
        await setPageZoom(browser, AUTH_DATA.ui.pageZoom);
    });
    
    describe("Default state", () => {
        it("should load main page", async ({browser}) => {
            await browser.assertView("main-page-default", "body");
        });
    });
    
    describe("Email input states", () => {
        it("should focus email field", async ({browser}) => {
            const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
            await emailInput.click();
            await browser.assertView("main-page-email-focus", "body");
        });

        it("should show state with email", async ({browser}) => {
            const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
            const testEmail = generateTestEmail();
            await emailInput.setValue(testEmail);
            await maskInputFields(browser, [AUTH_DATA.selectors.emailInput]);
            await browser.assertView("main-page-with-email", "body");
        });
    });

    describe("Shock check responses", () => {
        it("should show not shocked response", async ({browser}) => {
            const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
            const newUser = generateNewUser();
            await emailInput.setValue(newUser.email);
            const checkButton = await browser.$(AUTH_DATA.selectors.checkButton);
            await checkButton.click();
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskInputFields(browser, [AUTH_DATA.selectors.emailInput]);
            await browser.assertView("main-page-not-shocked", "body");
        });

        it("should show already shocked response", async ({browser}) => {
            const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
            await emailInput.setValue(AUTH_DATA.knownUser.email);
            const checkButton = await browser.$(AUTH_DATA.selectors.checkButton);
            await checkButton.click();
            await browser.pause(AUTH_DATA.timeouts.medium);
            await coverConfettiWithRectangle(browser);
            await stabilizeGif(browser);
            await browser.pause(AUTH_DATA.timeouts.short);
            await maskInputFields(browser, [AUTH_DATA.selectors.emailInput]);
            await browser.assertView("main-page-already-shocked", "body", {
                tolerance: AUTH_DATA.ui.tolerance,
                screenshotDelay: AUTH_DATA.ui.screenshotDelay,
                antialiasingTolerance: AUTH_DATA.ui.antialiasingTolerance
            });
        });
    });

    describe("Button hover states", () => {
        it("should hover check button", async ({browser}) => {
            const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
            const testEmail = generateTestEmail();
            await emailInput.setValue(testEmail);
            await maskInputFields(browser, [AUTH_DATA.selectors.emailInput]);
            
            const checkButton = await browser.$(AUTH_DATA.selectors.checkButton);
            await checkButton.moveTo();
            await browser.assertView("main-check-button-hover", "body");
        });

        it("should hover login button", async ({browser}) => {
            const emailInput = await browser.$(AUTH_DATA.selectors.emailInput);
            const testEmail = generateTestEmail();
            await emailInput.setValue(testEmail);
            await maskInputFields(browser, [AUTH_DATA.selectors.emailInput]);
            
            const loginButton = await browser.$(AUTH_DATA.selectors.loginButton);
            await loginButton.moveTo();
            await browser.assertView("main-login-button-hover", "body");
        });
    });

    describe("Navigation", () => {
        it("should navigate to login form", async ({browser}) => {
            const loginButton = await browser.$(AUTH_DATA.selectors.loginButton);
            await loginButton.click();
            await browser.waitUntil(async () => {
                const emailInput = await browser.$(AUTH_DATA.selectors.loginEmailInput);
                return await emailInput.isDisplayed();
            }, { timeout: AUTH_DATA.timeouts.long });
            await browser.assertView("transition-to-login-form", "body");
        });
    });
}); 
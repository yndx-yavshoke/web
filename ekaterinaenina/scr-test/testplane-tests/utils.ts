import { config } from "dotenv";
config();

export async function loginUser(browser: WebdriverIO.Browser) {
    await browser.url("/login");

    const emailInput = await browser.$('[data-testid="login-email-input"]');
    const passwordInput = await browser.$('[data-testid="login-password-input"]');
    const submitButton = await browser.$('[data-testid="login-submit-button"]');

    await emailInput.setValue(process.env.EMAIL!);
    await passwordInput.setValue(process.env.PASSWORD!);
    await submitButton.click();
}

export async function logoutUser(browser: WebdriverIO.Browser) {
    await browser.url("");
    const logoutButton = await browser.$('[data-testid="user-logout-button"]');
    await logoutButton.click();
}

export async function browserWaitLoadingByMessage(browser: WebdriverIO.Browser, text: string) {
    await browser.waitUntil(
        async () => {
            const bodyText = await browser.$('body').getText();
            return bodyText.includes(text);
        },
        {
            timeout: 1000,
            timeoutMsg: `Сообщение: ${text} не появилось`
        }
    );
}

export async function freezeGif(browser: WebdriverIO.Browser, selector: string) {
    await browser.execute((sel) => {
        const gif = document.querySelector(sel) as HTMLImageElement | null;
        if (gif) {
            gif.style.animation = "none";
            gif.style.visibility = "visible";
            gif.src = gif.src; // это "перезагрузит" кадр, иногда помогает заморозить
        }
    }, selector);
}
export async function login(browser: WebdriverIO.Browser, credentials: { email: string; password: string }) {
    await browser.url('https://yavshok.ru/login');
    
    // Заполнение формы
    await browser.$('[data-testid="login-email-input"]').setValue(credentials.email);
    await browser.$('[data-testid="login-password-input"]').setValue(credentials.password);
    await browser.$('[data-testid="login-submit-button"]').click();
    
    // Переход в профиль
    await browser.$('[class = "css-175oi2r r-13awgt0"]').waitForDisplayed({ timeout: 10000 });
}
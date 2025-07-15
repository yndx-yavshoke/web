const { validEmail, validPassword } = require('../../secrets/user');

export async function setupLoggedUser(browser: WebdriverIO.Browser) {
    await browser.url('/login');
    await browser.$('[data-testid="login-email-input"]').setValue(validEmail);
    await browser.$('[data-testid="login-password-input"]').setValue(validPassword);
    await browser.$('[data-testid="login-submit-button"]').click();

    await browser.$("[data-testid='user-logout-button']");
  }
  
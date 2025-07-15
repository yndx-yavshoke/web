export class AuthPage {
  private browser: WebdriverIO.Browser;

  constructor(browser: WebdriverIO.Browser) {
    this.browser = browser;
  }

  readonly emailSelector = '[data-testid="login-email-input"]';
  readonly passwordSelector = '[data-testid="login-password-input"]';
  readonly submitSelector = '[data-testid="login-submit-button"]';
  readonly errorMsgSelector = '//div[contains(text(), "Неправильный логин или пароль")]';
  readonly registerSelector = '[data-testid="login-register-button"]';
  readonly backSelector = '[data-testid="login-back-button"]';

  get emailInput() {
    return this.browser.$(this.emailSelector);
  }

  get passwordInput() {
    return this.browser.$(this.passwordSelector);
  }

  get loginButton() {
    return this.browser.$(this.submitSelector);
  }

  get errorMsg() {
    return this.browser.$(this.errorMsgSelector);
  }

  public async login({ email, password }: { email: string; password: string }) {
    await this.browser.navigateTo(`${process.env.BASE_URL}/login`);

    await (await this.emailInput).setValue(email);
    await (await this.passwordInput).setValue(password);
    await (await this.loginButton).click();

    await this.browser
      .$('[data-testid="user-logout-button"]')
      .waitForExist({ timeout: 5000 });
  }

  public async loginWithDefaultCredentials() {
    await this.login({
      email: process.env.TEST_EMAIL!,
      password: process.env.TEST_PASSWORD!,
    });
  }
}

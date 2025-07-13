import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginBackButton: Locator;
  readonly loginRegisterButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.loginButton = page.getByTestId('login-submit-button');
    this.loginBackButton = page.getByTestId('login-back-button');
    this.loginRegisterButton = page.getByTestId('login-register-button');
    this.emailError = page.locator('xpath=//div[text()="Введите email"]');
    this.passwordError = page.locator('xpath=//div[contains(text(), "Введите пароль")]');
  }

  async navigate() {
    const url = process.env.BASE_URL
    ? `${process.env.BASE_URL}/login`
    : 'https://yavshok.ru/login';

    await this.page.goto(url);
}

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('/');
  }

  async goToRegister() {
  await this.loginRegisterButton.click();
  }

  async goBackFromLogin() {
    await this.loginBackButton.click()
  }
}
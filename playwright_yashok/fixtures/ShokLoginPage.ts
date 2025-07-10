import { Page, Locator } from '@playwright/test';

export class ShokLoginPage {
  public title: Locator;
  public emailinput: Locator;
  public passwordinput: Locator;
  public toLoginButton: Locator;
  public toBackButton: Locator;
  public toRegisterButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Войти в ШОК', { exact: true });
    this.emailinput = this.page.getByTestId('login-email-input');
    this.passwordinput = this.page.getByTestId('login-password-input');
    this.toLoginButton = this.page.getByTestId('login-submit-button');
    this.toBackButton = this.page.getByTestId('login-back-button');
    this.toRegisterButton = this.page.getByTestId('login-register-button');
  }

  public async open() {
    await this.page.goto('/login');
  }

  public async checkLogin(email: string, password: string) {
    await this.emailinput.fill(email);
    await this.passwordinput.fill(password);
    await this.toLoginButton.click();
  }
}

import { Page, Locator } from '@playwright/test';

export class ShokLoginPage {
  public title: Locator;
  public inputEmail: Locator;
  public inputPassword: Locator;
  public loginButton: Locator;
  public emailMessageError: Locator;
  public passwordMessageError: Locator;

  constructor(public readonly page: Page) {
    this.title = page.getByText('Войти в ШОК', { exact: true });
    this.inputEmail = page.getByTestId('login-email-input');
    this.inputPassword = page.getByTestId('login-password-input');
    this.loginButton = page.getByTestId('login-submit-button');
    this.emailMessageError = page.getByText('Введите email');
    this.passwordMessageError = page.getByText('Введите пароль');
  }

  public async login(email: string, password: string) {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.loginButton.click();
  }

  public async open() {
    await this.page.goto('/login');
  }
}
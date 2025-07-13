import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  public page: Page;
  public title: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public submitButton: Locator;
  public registerButton: Locator;
  public backButton: Locator;

  public errorMessage: Locator;
  public emptyEmailError: Locator;
  public emptyPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Войти в ШОК', { exact: true });
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-submit-button');
    this.registerButton = page.getByTestId('login-register-button');
    this.backButton = page.getByTestId('login-back-button');

    this.errorMessage = page.getByText('Неправильный логин или пароль', { exact: true });
    this.emptyEmailError = page.getByText('Введите email', { exact: true });
    this.emptyPasswordError = page.getByText('Введите пароль', { exact: true });

  }

  public async open() {
    await this.page.goto('/login');
  }

  public async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

    public async goBack() {
    await this.backButton.click();
  }

    public async goToRegister() {
    await this.registerButton.click();
  }

  public async expectError() {
    await expect(this.errorMessage).toBeVisible();
  }
}

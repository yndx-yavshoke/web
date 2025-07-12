import { Page, Locator, expect } from '@playwright/test';

export class ShokAuthPage {
  public title: Locator;

  public emailInput: Locator;
  public emailPlaceholder: Locator;

  public passwordInput: Locator;
  public passwordPlaceholder: Locator;

  public loginButton: Locator;
  public backButton: Locator;
  public registerButton: Locator;

  public errorInvalidCredentials: Locator;
  public errorEmailRequired: Locator;
  public errorPasswordRequired: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Войти в ШОК', { exact: true });

    this.emailInput = this.page.getByTestId('login-email-input');
    this.emailPlaceholder = this.page.getByPlaceholder('Email');

    this.passwordInput = this.page.getByTestId('login-password-input');
    this.passwordPlaceholder = this.page.getByPlaceholder('Пароль');

    this.loginButton = this.page.getByTestId('login-submit-button');
    this.backButton = this.page.getByTestId('login-back-button');
    this.registerButton = this.page.getByTestId('login-register-button');

    this.errorInvalidCredentials = this.page.getByText('Неверный логин или пароль', { exact: true });
    this.errorEmailRequired = this.page.getByText('Введите email', {
      exact: true,
    });
    this.errorPasswordRequired = this.page.getByText('Введите пароль', {
      exact: true,
    });
  }

  public async open() {
    await this.page.goto('/login');
  }

  public async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  public async clickBackButton() {
    await this.backButton.click();
  }

  public async clickRegisterButton() {
    await this.registerButton.click();
  }

  public async expectUI() {
    await expect(this.title).toBeVisible();
  
    await expect(this.emailInput).toBeVisible();
    await expect(this.emailPlaceholder).toBeVisible();
  
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordPlaceholder).toBeVisible();
  
    await expect(this.loginButton).toBeVisible();
    await expect(this.backButton).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }
  
}

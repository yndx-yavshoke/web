import { Page, Locator } from '@playwright/test';

export class ShokAuthPage {
  public title: Locator;

  public emailInput: Locator;
  public emailPlaceholder: Locator;

  public passwordInput: Locator;
  public passwordPlaceholder: Locator;

  public toLoginButton: Locator;
  public toBackButton: Locator;
  public toRegisterButton: Locator;
  
  public errorInvalidCredentials: Locator;
  public errorEmailRequired: Locator;
  public errorPasswordRequired: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Я в ШОКе', { exact: true });

    this.emailInput = this.page.getByTestId('login-email-input');
    this.emailPlaceholder = this.page.getByPlaceholder('Email');

    this.passwordInput = this.page.getByTestId('login-password-input');
    this.passwordPlaceholder = this.page.getByPlaceholder('Пароль');

    this.toLoginButton = this.page.getByTestId('login-submit-button');
    this.toBackButton = this.page.getByTestId('login-back-button');
    this.toRegisterButton = this.page.getByTestId('login-register-button');

    this.errorInvalidCredentials = this.page.getByText(
      'Неверный логин или пароль',
      { exact: true },
    );
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
    await this.toLoginButton.click();
  }

  public async toBackButtonClick() {
    await this.toBackButton.click();
  }

  public async toRegisterButtonClick() {
    await this.toRegisterButton.click();
  }
}

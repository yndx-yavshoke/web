import { Page, Locator, expect } from "@playwright/test";

export class ShockLoginPage {
  public title: Locator;
  public emailInput: Locator;
  public emailPlaceholder: Locator;
  public passwordInput: Locator;
  public passwordPlaceholder: Locator;
  public loginButton: Locator;
  public loginButtonText: Locator;
  public backButton: Locator;
  public backButtonText: Locator;
  public registerButton: Locator;
  public registerButtonText: Locator;
  public invalidEmailText: Locator;
  public errorText: Locator;
  public withoutEmailText: Locator;
  public withoutPasswordText: Locator;
  
  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Войти в ШОК', {exact: true});
    this.emailInput = this.page.getByTestId('login-email-input');
    this.emailPlaceholder = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByTestId('login-password-input');
    this.passwordPlaceholder = this.page.getByPlaceholder('Пароль');
    this.loginButton = this.page.getByTestId('login-submit-button');
    this.loginButtonText = this.page.getByText('В шок', { exact: true });
    this.backButton = this.page.getByTestId('login-back-button');
    this.backButtonText = this.page.getByText('Назад', { exact: true });
    this.registerButton = this.page.getByTestId('login-register-button');
    this.registerButtonText = this.page.getByText('Регистрация', { exact: true });
    this.invalidEmailText = this.page.getByText('Неверный логин или пароль', { exact: true });
    this.errorText = this.page.getByText('Произошла ошибка', { exact: true });
    this.withoutEmailText = this.page.getByText('Введите email', { exact: true });
    this.withoutPasswordText = this.page.getByText('Введите пароль', { exact: true });
  }
  public async open() {
    await this.page.goto('/login');
  }
  public async clickRegisterButton() {
    await this.registerButton.click();
  }
  public async clickBackButton() {
    await this.backButton.click();
  }
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

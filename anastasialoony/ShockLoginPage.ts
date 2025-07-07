import { Page, Locator, expect } from "@playwright/test";

export class ShockLoginPage {
  public title: Locator;
  public emailInput: Locator;
  public emailPlaceholder: Locator;
  public passwordInput: Locator;
  public passwordPlaceholder: Locator;
  public toLoginButton: Locator;
  public toBackButton: Locator;
  public toRegisterButton: Locator;
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
    this.toLoginButton = this.page.getByTestId('login-submit-button');
    this.toLoginButton = this.page.getByText('В шок', { exact: true });
    this.toBackButton = this.page.getByTestId('login-back-button');
    this.toBackButton = this.page.getByText('Назад', { exact: true });
    this.toRegisterButton = this.page.getByTestId('login-register-button');
    this.toRegisterButton = this.page.getByText('Регистрация', { exact: true });
    this.invalidEmailText = this.page.getByText('Неверный логин или пароль', { exact: true });
    this.errorText = this.page.getByText('Произошла ошибка', { exact: true });
    this.withoutEmailText = this.page.getByText('Введите email', { exact: true });
    this.withoutPasswordText = this.page.getByText('Введите пароль', { exact: true });
  }
  public async open() {
    await this.page.goto('/login');
  }
  public async toRegisterButtonClick() {
    await this.toRegisterButton.click();
  }
  public async toBackButtonClick() {
    await this.toBackButton.click();
  }
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.toLoginButton.click();
  }
}

import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  public page: Page;
  public nameInput: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public ageInput: Locator;
  public submitButton: Locator;
  public emailRequiredMessage: Locator;
  public passwordRequiredMessage: Locator;
  public ageRequiredMessage: Locator;
  public existUserMessage: Locator;
  public wrongEmailMessage: Locator;
  public tooShortPasswordMessage: Locator;
  public notNumericAgeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId('register-name-input');
    this.emailInput = page.getByTestId('register-email-input');
    this.passwordInput = page.getByTestId('register-password-input');
    this.ageInput = page.getByTestId('register-age-input');
    this.submitButton = page.getByTestId('register-submit-button');
    this.emailRequiredMessage = this.page.getByText("Введите email", {exact: true,});
    this.passwordRequiredMessage = this.page.getByText("Введите пароль", {exact: true,});
    this.ageRequiredMessage = this.page.getByText("Введите возраст", {exact: true,});
    this.wrongEmailMessage = this.page.getByText("Неправильный email-адрес", {exact: true,});
    this.tooShortPasswordMessage = this.page.getByText("Пароль должен содержать минимум 6 символов", {exact: true,});
    this.notNumericAgeMessage = this.page.getByText("Возраст должен быть числом", {exact: true,});
    this.existUserMessage = this.page.getByText("Пользователь с таким email уже существует", {exact: true,});
  }

  public async open() {
    await this.page.goto('/register');
  }

  public async register(email: string, password: string, age: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(age);
    await this.submitButton.click();
  }

  public async expectError(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}

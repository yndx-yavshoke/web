import { Page, Locator, expect } from "@playwright/test";

export class ShockRegisterPage {
  public title: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public ageInput: Locator;
  public emailPlaceholder: Locator;
  public passwordPlaceholder: Locator;
  public agePlaceholder: Locator;
  public registerButton: Locator;
  public registerButtonText: Locator;
  public backButton: Locator;
  public backButtonText: Locator;
  public withoutEmailText: Locator;
  public withoutPasswordText: Locator;
  public withoutAgeText: Locator;
  public invalidEmailText: Locator;
  public invalidPasswordText: Locator;
  public ageErrorText: Locator;
  public emailAlreadyExistsText: Locator;

  
  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
    this.emailInput = this.page.getByTestId('register-email-input');
    this.emailInput = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByTestId('register-password-input');
    this.passwordInput = this.page.getByPlaceholder('Пароль');
    this.ageInput = this.page.getByTestId('register-age-input');
    this.ageInput = this.page.getByPlaceholder('Возраст');
    this.registerButton = this.page.getByTestId('register-submit-button');
    this.registerButtonText = this.page.getByText('Зарегистрироваться', { exact: true });
    this.backButton = this.page.getByTestId('register-back-button');
    this.backButtonText = this.page.getByText('Назад', { exact: true });
    this.withoutEmailText = this.page.getByText('Введите email', { exact: true });
    this.withoutPasswordText = this.page.getByText('Введите пароль', { exact: true });
    this.withoutAgeText = this.page.getByText('Введите возраст', { exact: true });
    this.invalidEmailText = this.page.getByText('Неправильный email-адрес', { exact: true });
    this.invalidPasswordText = this.page.getByText('Пароль должен содержать минимум 6 символов', { exact: true });
    this.emailAlreadyExistsText = this.page.getByText('Пользователь с таким email уже существует', { exact: true });
    this.ageErrorText = this.page.getByText('Возраст должен быть числом', { exact: true });
  }
  
  public async open() {
    await this.page.goto('/register');
  }
  public async clickBackButton() {
    await this.backButton.click();
  }

  public async register(email: string, password: string, age: string, valid: boolean) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(age);
    await this.registerButton.click();
    if (valid) {
      await expect(this.page).toHaveURL('/');
    } else {
      await expect(this.page).toHaveURL('/register');
      if (!email) {
        await expect(this.withoutEmailText).toBeVisible();
      }
      if (!password) {
        await expect(this.withoutPasswordText).toBeVisible();
      }
      if (!age) {
        await expect(this.withoutAgeText).toBeVisible();
      }
    }
  }
} 
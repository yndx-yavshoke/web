import { Page, Locator } from '@playwright/test';

const randomAge = Math.floor(Math.random() * 100);

export class registerPage {
  public title: Locator;
  public inputEmail: Locator;
  public inputPassword: Locator;
  public inputAge: Locator;
  public registerButton: Locator;
  public backButton: Locator;
  public emailValidationError: Locator;
  public passwordValidationError: Locator;
  public ageValidationError: Locator;

  constructor(public readonly page: Page) {
    this.title = page.getByText('Регистрация в ШОКе', { exact: true });
    this.inputEmail = page.getByTestId('register-email-input');
    this.inputPassword = page.getByTestId('register-password-input');
    this.inputAge = page.getByTestId('register-age-input');
    this.registerButton = page.getByTestId('register-submit-button');
    this.backButton = page.getByTestId('register-back-button');
    this.emailValidationError = page.getByText('Введите email', { exact: true });
    this.passwordValidationError = page.getByText('Введите пароль', { exact: true });
    this.ageValidationError = page.getByText('Введите возраст', { exact: true });
  }

  public async open() {
    await this.page.goto('/register');
    await this.title.waitFor({ state: 'visible' });
  }

  public async back() {
    await this.backButton.click();
  }

  public async register(email: string, password: string, age: string) {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.inputAge.fill(age);
    await this.registerButton.click();
  }
}
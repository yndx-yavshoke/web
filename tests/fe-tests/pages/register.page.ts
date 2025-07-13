import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly ageInput: Locator;
  readonly registerButton: Locator;
  readonly backButton: Locator;
  readonly regEmailError: Locator;
  readonly regPasswordError: Locator;
  readonly regAgeError: Locator;
  readonly emailExistsError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('register-email-input');
    this.passwordInput = page.getByTestId('register-password-input');
    this.ageInput = page.getByTestId('register-age-input');
    this.registerButton = page.getByTestId('register-submit-button');
    this.backButton = page.getByTestId('register-back-button');
    this.regEmailError = page.locator('xpath=//div[text()="Введите email"]');
    this.regPasswordError = page.locator('xpath=//div[contains(text(), "Введите пароль")]');
    this.regAgeError = page.locator('xpath=//div[text()="Введите возраст"]')
    this.emailExistsError = page.getByText('Пользователь с таким email уже существует', {exact: true});
  }

  async navigate() {
    const url = process.env.BASE_URL 
      ? `${process.env.BASE_URL}/register`
      : 'https://yavshok.ru/register';
  
    await this.page.goto(url);
    await this.page.waitForURL(url);
}

  async register(user: {
    email: string;
    password: string;
    age: string; 
  }) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.ageInput.fill(user.age);
    await this.registerButton.click();
  }
  
  async goBack() {
    await this.backButton.click();
  }
}
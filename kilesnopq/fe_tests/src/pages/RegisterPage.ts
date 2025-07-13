import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get emailInput(): Locator {
    return this.page.locator('[data-testid="register-email-input"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('[data-testid="register-password-input"]');
  }

  get ageInput(): Locator {
    return this.page.locator('[data-testid="register-age-input"]');
  }

  get submitButton(): Locator {
    return this.page.locator('[data-testid="register-submit-button"]');
  }

  get backButton(): Locator {
    return this.page.locator('[data-testid="register-back-button"]');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(email: string, password: string, age: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(age);
    await this.submitButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }
} 
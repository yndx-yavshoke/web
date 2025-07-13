import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Локаторы для главной страницы
  get title(): Locator {
    return this.page.locator('h1');
  }

  get emailInput(): Locator {
    return this.page.locator('[data-testid="main-email-input"]');
  }

  get shockedButton(): Locator {
    return this.page.locator('[data-testid="main-check-button"]');
  }

  get inShockButton(): Locator {
    return this.page.locator('[data-testid="main-login-button"]');
  }


  get loginEmailInput(): Locator {
    return this.page.locator('[data-testid="login-email-input"]');
  }

  get loginPasswordInput(): Locator {
    return this.page.locator('[data-testid="login-password-input"]');
  }

  get loginSubmitButton(): Locator {
    return this.page.locator('[data-testid="login-submit-button"]');
  }

  get loginBackButton(): Locator {
    return this.page.locator('[data-testid="login-back-button"]');
  }

  get loginRegisterButton(): Locator {
    return this.page.locator('[data-testid="login-register-button"]');
  }

  get editProfileButton(): Locator {
    return this.page.locator('[data-testid="user-edit-profile-button"]');
  }


  async goto() {
    await this.page.goto('/login');
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async clickInShock() {
    await this.inShockButton.click();
  }


  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitButton.click();
  }

  async loginWithoutPassword(email: string) {
    await this.loginEmailInput.fill(email);
    await this.loginSubmitButton.click();
  }

  async goBack() {
    await this.loginBackButton.click();
  }

  async goToRegister() {
    await this.loginRegisterButton.click();
  }

  async goToEditProfile() {
    await this.editProfileButton.click();
  }
} 
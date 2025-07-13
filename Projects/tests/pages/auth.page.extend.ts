import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly backButton: Locator;
  readonly registrationButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-submit-button').getByText('В шок');
    this.backButton = page.getByTestId('login-back-button');
    this.registrationButton = page.getByTestId('login-register-button');
    this.errorMessage = page.getByTestId('error-message');
    this.successMessage = page.getByTestId('success-message');
  }

  async open(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async verifyEmailField() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.emailInput).toHaveAttribute('type', 'email');
    await expect(this.emailInput).toHaveAttribute('placeholder', /[Ee]mail/);
  }

  async verifyPasswordField() {
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    await expect(this.passwordInput).toHaveAttribute('placeholder', /[Пп]ароль/);
  }

  async verifySubmitButton() {
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
    await expect(this.submitButton).toHaveText('В шок');
  }

  async verifyBackButton() {
    await expect(this.backButton).toBeVisible();
    await expect(this.backButton).toBeEnabled();
  }

  async verifyRegistrationButton() {
    await expect(this.registrationButton).toBeVisible();
    await expect(this.registrationButton).toBeEnabled();
    await expect(this.registrationButton).toHaveText('Регистрация');
  }

  async loginWithCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.page).toHaveURL(/login/);
  }

  async verifyAgeRestrictionMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async verifyLoginError(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
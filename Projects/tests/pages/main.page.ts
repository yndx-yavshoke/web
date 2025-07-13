import { Page, Locator, expect } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly buttonVShok: Locator;
  readonly buttonYaVShoke: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly userAvatar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonVShok = page.getByTestId('main-login-button').filter({ hasText: /^В шок$/ });
    this.buttonYaVShoke = page.getByTestId('main-check-button').filter({ hasText: /^Я в шоке\?$/ });
    this.emailInput = page.getByTestId('main-email-input');
    this.submitButton = page.getByTestId('main-submit-button');
    this.errorMessage = page.getByTestId('error-message');
    this.successMessage = page.getByTestId('success-message');
    this.userAvatar = page.getByTestId('user-avatar');
  }

  async open(path: string) {
    await this.page.goto(path);
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async checkEmailInput() {
    await expect(this.emailInput).toBeEditable();
    await expect(this.emailInput).toHaveAttribute('type', 'email');
    await expect(this.emailInput).toHaveAttribute('placeholder', 'Введите email');
  }

  async checkButtonDisabled() {
    await expect(this.submitButton).toBeDisabled();
    await expect(this.submitButton).toHaveCSS('cursor', 'not-allowed');
  }

  async submitInvalidEmail(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('Некорректный email');
  }

  async submitValidEmail(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    await expect(this.page).toHaveURL("/");
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Ты уже в ШОКе');
    await expect(this.userAvatar).toBeVisible();
  }

  async clearStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }
}
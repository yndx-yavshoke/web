import { Page, Locator,expect} from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly buttonVShok: Locator;
  readonly buttonYaVShoke: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonVShok = page.getByTestId('main-login-button').filter({ hasText: /^В шок$/ });
    this.buttonYaVShoke = page.getByTestId('main-check-button').filter({ hasText: /^Я в шоке\?$/ });
    this.emailInput = page.getByTestId('main-email-input');
    this.submitButton = page.getByTestId('main-check-button');
  }

  async open(path: string) {
    await this.page.goto(path);
  }

  async checkEmailInput() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.emailInput).toHaveAttribute('placeholder', 'Введите email');
  }

  async checkButtonDisabled() {
    await expect(this.submitButton).toHaveAttribute('aria-disabled', 'true');
  }

  async submitInvalidEmail(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    await expect(this.page.getByText('Ты еще не в ШОКе')).toBeVisible();
  }

  async submitValidEmail(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    await expect(this.page.getByText('Ты уже в ШОКе')).toBeVisible();
    await expect(this.page.getByRole('img')).toBeVisible();
  }
}
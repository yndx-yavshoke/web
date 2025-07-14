import { Page, Locator, expect } from '@playwright/test';

export class MainPage {
  public page: Page;
  public title: Locator;
  public emailInput: Locator;
  public checkButton: Locator;
  public loginButton: Locator;

  public successText: Locator;
  public successGIF: Locator;
  public failedText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByText("Я в ШОКе", { exact: true });
    this.emailInput = page.getByTestId('main-email-input');
    this.checkButton = page.getByTestId('main-check-button');
    this.loginButton = page.getByTestId('main-login-button');
    this.successGIF = page.getByRole('img');
  }

  public async open() {
    await this.page.goto('/');
  }

  public async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  public async checkEmail() {
    await this.checkButton.click();
  }

  public async expectShockStatus(expected: 'in' | 'out') {
    const message = expected === 'in' ? 'Ты уже в ШОКе' : 'Ты еще не в ШОКе';
    await expect(this.page.getByText(message)).toBeVisible();
  }

  public async proceedToLogin() {
    await this.loginButton.click();
  }
}

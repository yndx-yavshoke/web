import { Page, Locator, expect } from '@playwright/test';

export class ExistPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly loginButton: Locator;
  readonly successGif: Locator;
  readonly successText: Locator;
  readonly failText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('main-email-input');
    this.submitButton = page.getByTestId('main-check-button');
    this.loginButton = page.getByTestId('main-login-button');
    this.successGif = page.locator('img[src*="happyCat"]');
    this.successText = page.getByText('Я в ШОКе');
    this.failText = page.getByText('Ты еще не в ШОКе')
  }

  async submitEmail(email: string) {
      await this.emailInput.fill(email);
      await this.submitButton.click();
    }

  async verifySuccessState() {
      await expect(this.successGif).toBeVisible();
      await expect(this.failText).not.toBeVisible();
    }

  async verifyErrorState() {
      await expect(this.failText).toBeVisible();
      await expect(this.successGif).not.toBeVisible();
    }
    
  async goToLogin(){
      await this.loginButton.click()
    }
}
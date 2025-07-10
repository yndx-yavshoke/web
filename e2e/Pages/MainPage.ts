import { expect } from '@playwright/test';
import { BasePage } from '../helper/BasePage';

export class MainPage extends BasePage {
  readonly emailInput = this.byTestId('main-email-input');
  readonly submitButton = this.byTestId('main-check-button');
  readonly toLoginButton = this.byTestId('main-login-button');
  readonly happyCatImg = this.locator('img[src*="happyCat"]');
  readonly inShockText = this.byText('Ты уже в ШОКе');
  readonly notInShockText = this.byText('Ты еще не в ШОКе');

  async open() {
    await super.open('/');
  }

  async goToLogin() {
    await this.toLoginButton.click();
  }

  async checkEmail(email: string, expectValid: boolean) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    await expect(expectValid ? this.happyCatImg && this.inShockText : this.notInShockText).toBeVisible();
  }
}

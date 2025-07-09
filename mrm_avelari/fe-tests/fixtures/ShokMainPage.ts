import { Page, Locator, expect } from '@playwright/test';

export class ShokMainPage {
  public title: Locator;
  public input: Locator;
  public inputPlaceholder: Locator;
  public inShok: Locator;
  public notInShok: Locator;
  public catGif: Locator;
  public checkButton: Locator;
  public toLoginButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Я в ШОКе', { exact: true });
    this.input = this.page.getByTestId('main-email-input');
    this.inputPlaceholder = this.page.getByPlaceholder('Введите email');
    this.inShok = this.page.getByText('Ты уже в ШОКе');
    this.notInShok = this.page.getByText('Ты еще не в ШОКе');
    this.catGif = this.page.locator('img[src*="happyCat"]');
    this.checkButton = this.page.getByTestId('main-check-button');
    this.toLoginButton = this.page.getByTestId('main-login-button');
  }

  public async open() {
    await this.page.goto('/');
  }

  async clearAuth() {
    await this.page.context().clearCookies();
    await this.page.goto('/');
    await this.page.evaluate(() => localStorage.clear());
  }

  public async toLoginButtonClick() {
    await this.toLoginButton.click();
  }

  public async checkEmail(email: string, valid: boolean) {
    await this.input.fill(email);
    await this.checkButton.click();

    if (valid) {
      await expect(this.inShok).toBeVisible();
    } else {
      await expect(this.notInShok).toBeVisible();
    }
  }

  public async checkColorOfPhrase(expectedColor: string, isGreen: boolean) {
    const phrase = isGreen ? this.inShok : this.notInShok;

    await expect(phrase).toBeVisible();

    const color = await phrase.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    expect(color).toBe(expectedColor);
  }
}

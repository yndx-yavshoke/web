import { Page, Locator, expect } from '@playwright/test';

export class ShokMainPage {
  public title: Locator;
  public emailInput: Locator;
  public emailPlaceholder: Locator;
  public statusInShok: Locator;
  public statusNotInShok: Locator;
  public catGif: Locator;
  public checkStatusButton: Locator;
  public loginButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Я в ШОКе', { exact: true });
    this.emailInput = this.page.getByTestId('main-email-input');
    this.emailPlaceholder = this.page.getByPlaceholder('Введите email');
    this.statusInShok = this.page.getByText('Ты уже в ШОКе');
    this.statusNotInShok = this.page.getByText('Ты еще не в ШОКе');
    this.catGif = this.page.locator('img[src*="happyCat"]');
    this.checkStatusButton = this.page.getByTestId('main-check-button');
    this.loginButton = this.page.getByTestId('main-login-button');
  }

  public async open() {
    await this.page.goto('/');
  }

  public async clickLoginButton() {
    await this.loginButton.click();
  }

  public async checkEmailStatus(email: string, valid: boolean) {
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
    await this.checkStatusButton.click();

    if (valid) {
      await expect(this.statusInShok).toBeVisible();
    } else {
      await expect(this.statusNotInShok).toBeVisible();
    }
  }

  public async checkColorOfPhrase(expectedColor: string, isGreen: boolean) {
    const phrase = isGreen ? this.statusInShok : this.statusNotInShok;

    await expect(phrase).toBeVisible();

    const actualColor = await phrase.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    expect(actualColor).toBe(expectedColor);
  }

  public async expectUI() {
  await expect(this.title).toBeVisible();
  await expect(this.emailInput).toBeVisible();
  await expect(this.emailPlaceholder).toBeVisible();
  await expect(this.checkStatusButton).toBeVisible();
  await expect(this.loginButton).toBeVisible();
}
}

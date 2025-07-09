import { Page, Locator } from '@playwright/test';

export class ShokMainPage {
  public title: Locator;
  public input: Locator;
  public checkButton: Locator;
  public toLogInButton: Locator;
  public notInShokText: Locator;
  public inShokText: Locator;
  public happyCatImage: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Я в ШОКе', { exact: true });
    this.input = this.page.getByTestId('main-email-input');
    this.checkButton = this.page.getByTestId('main-check-button');
    this.toLogInButton = this.page.getByTestId('main-login-button');
    this.notInShokText = this.page.getByText('Ты еще не в ШОКе', { exact: true });
    this.inShokText = this.page.getByText('Ты уже в ШОКе', { exact: true });
    this.happyCatImage = this.page.locator('img[src*="happyCat"]');
  }

  public async open() {
    await this.page.goto('/');
  }

  public async checkEmail(email: string) {
    await this.input.fill(email);
    await this.checkButton.click();
  }
}

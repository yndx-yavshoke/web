import { Page, Locator, expect } from "@playwright/test";

export class ShockMainPage {
  public title: Locator;
  public input: Locator;
  public checkButton: Locator;
  public loginButton: Locator;
  public loginButtonText: Locator;
  public inputPlaceholder: Locator;
  public happyCatImg: Locator;        
  public InShockText: Locator;        
  public notInShockText: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Я в ШОКе', {exact: true});
    this.input = this.page.getByTestId('main-email-input');
    this.checkButton = this.page.getByTestId('main-check-button');
    this.checkButton = this.page.getByText('Я в шоке?', { exact: true });
    this.loginButton = this.page.getByTestId('main-login-button');
    this.loginButtonText = this.page.getByText('В шок', { exact: true });
    this.inputPlaceholder = this.page.getByPlaceholder('Введите email');
    this.happyCatImg = this.page.locator('img[src*="happyCat"]');
    this.InShockText = this.page.getByText('Ты уже в ШОКе', { exact: true });
    this.notInShockText = this.page.getByText('Ты еще не в ШОКе', { exact: true });
  }
  public async open() {
    await this.page.goto('/');
  }
  public async clickLoginButton() {
    await this.loginButton.click();
  }

  public async checkEmail(email: string, valid: boolean) {
    await this.input.fill(email);
    await this.checkButton.click();
    if (valid) {
      await expect(this.happyCatImg).toBeVisible();
    } else {
      await expect(this.notInShockText).toBeVisible();
    }
  }
}

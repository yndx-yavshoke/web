import { Page, Locator } from "@playwright/test";

export class MainPage {
  public title: Locator;
  public input: Locator;
  public shokCheckButton: Locator;
  public toLoginButton: Locator;
  public notInShokText: Locator;
  public inShokTest: Locator;
  public catGif: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText("Я в ШОКе", { exact: true });
    this.input = this.page.getByTestId("main-email-input");
    this.shokCheckButton = this.page.getByTestId("main-check-button");
    this.toLoginButton = this.page.getByTestId("main-login-button");
    this.notInShokText = this.page.getByText("Ты еще не в ШОКе", {
      exact: true,
    });
    this.inShokTest = this.page.getByText("Ты уже в ШОКе", { exact: true });
    this.catGif = this.page.locator('img[src*="happyCat"]');
  }

  public async open() {
    await this.page.goto("/");
  }

  public async checkEmail(email: string) {
    await this.input.fill(email);
    await this.shokCheckButton.click();
  }
}

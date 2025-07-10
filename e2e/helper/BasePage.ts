import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async open(path: string = '/') { await this.page.goto(path); }
  protected byTestId(id: string) { return this.page.getByTestId(id); }
  protected byText(text: string, exact = true) { return this.page.getByText(text, { exact }); }
  protected locator(selector: string) { return this.page.locator(selector); }
}
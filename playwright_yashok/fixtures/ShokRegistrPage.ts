import { Page, Locator } from '@playwright/test';

export class ShokRegistrPage {
  public title: Locator;
  public emailinput: Locator;
  public passwordinput: Locator;
  public ageinput: Locator;
  public toRegistrButton: Locator;
  public toBackButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
    this.emailinput = this.page.getByTestId('register-email-input');
    this.passwordinput = this.page.getByTestId('register-password-input');
    this.ageinput = this.page.getByTestId('register-age-input');
    this.toRegistrButton = this.page.getByTestId('register-submit-button');
    this.toBackButton = this.page.getByTestId('register-back-button');
  }

  public async open() {
    await this.page.goto('/register');
  }
}

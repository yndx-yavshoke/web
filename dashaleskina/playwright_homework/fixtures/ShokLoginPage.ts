import { Page, Locator } from "@playwright/test";

export class ShokLoginPage {
  public title: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public loginButton: Locator;
  public registerButton: Locator;
  public backButton: Locator;

  //error message - empty field
  public emailRequiredMessage: Locator;
  public passwordRequiredMessage: Locator;

  //error message - non exist user
  public authErrorMessage: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText("Войти в ШОК", { exact: true });
    this.emailInput = this.page.getByTestId("login-email-input");
    this.passwordInput = this.page.getByTestId("login-password-input");
    this.loginButton = this.page.getByTestId("login-submit-button");
    this.registerButton = this.page.getByTestId("login-register-button");
    this.backButton = this.page.getByTestId("login-back-button");
    this.emailRequiredMessage = this.page.getByText("Введите email", {
      exact: true,
    });
    this.passwordRequiredMessage = this.page.getByText("Введите пароль", {
      exact: true,
    });
    this.authErrorMessage = this.page.getByText(
      "Неправильный логин или пароль",
      { exact: true }
    );
  }

  public async open() {
    await this.page.goto("/login");
  }
}

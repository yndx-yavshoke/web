import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

const authPath = path.join(process.cwd(), "secrets", "auth.json");
const authData = JSON.parse(fs.readFileSync(authPath, "utf-8"));

export class LoginPage {
  public title: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public inShokButton: Locator;
  public backButton: Locator;
  public registerButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText("Войти в ШОК", { exact: true });
    this.emailInput = this.page.getByTestId("login-email-input");
    this.passwordInput = this.page.getByTestId("login-password-input");
    this.inShokButton = this.page.getByTestId("login-submit-button");
    this.backButton = this.page.getByTestId("login-back-button");
    this.registerButton = this.page.getByTestId("login-register-button");
  }

  public async open() {
    await this.page.goto("/login");
  }

  public async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.inShokButton.click();
  }

  public async loginWithRegisteredUser() {
    await this.login(authData.email, authData.password);
  }

  public async loginWithUnregisteredUser() {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();
    await this.login(fakeEmail, fakePassword);
  }

  public async goBack() {
    await this.backButton.click();
  }

  public async goToRegister() {
    await this.registerButton.click();
  }
}

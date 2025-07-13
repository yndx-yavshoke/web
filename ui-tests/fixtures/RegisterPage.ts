import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class RegisterPage {
  public title: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public ageInput: Locator;
  public registerButton: Locator;
  public backButton: Locator;
  public emailError: Locator;
  public passwordError: Locator;
  public ageError: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText("Регистрация в ШОКе", { exact: true });
    this.emailInput = this.page.getByTestId("register-email-input");
    this.passwordInput = this.page.getByTestId("register-password-input");
    this.ageInput = this.page.getByTestId("register-age-input");
    this.registerButton = this.page.getByTestId("register-submit-button");
    this.backButton = this.page.getByTestId("register-back-button");
    this.emailError = this.page.getByText("Неправильный email-адрес");
    this.passwordError = this.page.getByText(
      "Пароль должен содержать минимум 6 символов",
      { exact: true }
    );
    this.ageError = this.page.getByText("Возраст должен быть числом", {
      exact: true,
    });
  }

  public async open() {
    await this.page.goto("/register");
  }

  public async register(email: string, password: string, age: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(age);
    await this.registerButton.click();
  }

  public async registerWithRandomUser() {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();
    const fakeAge = faker.number.int({ min: 0, max: 99 }).toString();
    await this.register(fakeEmail, fakePassword, fakeAge);
  }

  public async goBack() {
    await this.backButton.click();
  }
}

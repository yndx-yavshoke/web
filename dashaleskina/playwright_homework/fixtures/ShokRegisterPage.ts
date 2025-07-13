import { Page, Locator } from "@playwright/test";

export class ShokRegisterPage {
  public title: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public ageInput: Locator;
  public registerButton: Locator;
  public backButton: Locator;

  //error message - empty field
  public emailRequiredMessage: Locator;
  public passwordRequiredMessage: Locator;
  public ageRequiredMessage: Locator;

  //error message - data errors
  public existUserMessage: Locator;
  public wrongEmailMessage: Locator;
  public tooShortPasswordMessage: Locator;
  public notNumericAgeMessage: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText("Регистрация в ШОКе", { exact: true });
    this.emailInput = this.page.getByTestId("register-email-input");
    this.passwordInput = this.page.getByTestId("register-password-input");
    this.ageInput = this.page.getByTestId("register-age-input");
    this.registerButton = this.page.getByTestId("register-submit-button");
    this.backButton = this.page.getByTestId("register-back-button");
    this.emailRequiredMessage = this.page.getByText("Введите email", {
      exact: true,
    });
    this.passwordRequiredMessage = this.page.getByText("Введите пароль", {
      exact: true,
    });
    this.ageRequiredMessage = this.page.getByText("Введите возраст", {
      exact: true,
    });
    this.wrongEmailMessage = this.page.getByText("Неправильный email-адрес", {
      exact: true,
    });
    this.tooShortPasswordMessage = this.page.getByText(
      "Пароль должен содержать минимум 6 символов",
      {
        exact: true,
      }
    );
    this.notNumericAgeMessage = this.page.getByText(
      "Возраст должен быть числом",
      {
        exact: true,
      }
    );
    this.existUserMessage = this.page.getByText(
      "Пользователь с таким email уже существует",
      {
        exact: true,
      }
    );
  }

  public async open() {
    await this.page.goto("/register");
  }

  public async fillFields({
    email,
    password,
    age,
  }: {
    email?: string;
    password?: string | number;
    age?: string | number;
  }) {
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(String(password));
    }
    if (age !== undefined) {
      await this.ageInput.fill(String(age));
    }
    await this.registerButton.click();
  }
}

import { Page, Locator, expect } from '@playwright/test';

export class ShockRegisterPage {
  public title: Locator;

  public emailInput: Locator;
  public emailPlaceholder: Locator;

  public passwordInput: Locator;
  public passwordPlaceholder: Locator;

  public ageInput: Locator;
  public agePlaceholder: Locator;

  public toRegisterButton: Locator;
  public registerButtonPlaceholder: Locator;
  public toBackButton: Locator;
  public backButtonPlaceholder: Locator;

  public errorEmailRequired: Locator;
  public errorPasswordRequired: Locator;
  public errorAgeRequired: Locator;
  public errorInvalidEmail: Locator;
  public errorInvalidPassword: Locator;
  public errorInvalidAge: Locator;
  public errorDuplicateEmail: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });

    this.emailInput = this.page.getByTestId('register-email-input');
    this.emailPlaceholder = this.page.getByPlaceholder('Email');

    this.passwordInput = this.page.getByTestId('register-password-input');
    this.passwordPlaceholder = this.page.getByPlaceholder('Пароль');

    this.ageInput = this.page.getByTestId('register-age-input');
    this.agePlaceholder = this.page.getByPlaceholder('Возраст');

    this.toRegisterButton = this.page.getByTestId('register-submit-button');
    this.registerButtonPlaceholder = this.page.getByText('Зарегистрироваться', {
      exact: true,
    });
    this.toBackButton = this.page.getByTestId('register-back-button');
    this.backButtonPlaceholder = this.page.getByText('Назад', { exact: true });

    this.errorEmailRequired = this.page.getByText('Введите email', {
      exact: true,
    });
    this.errorPasswordRequired = this.page.getByText('Введите пароль', {
      exact: true,
    });
    this.errorAgeRequired = this.page.getByText('Введите возраст', {
      exact: true,
    });

    this.errorInvalidEmail = this.page.getByText('Неправильный email-адрес', {
      exact: true,
    });
    this.errorInvalidPassword = this.page.getByText(
      'Пароль должен содержать минимум 6 символов',
      { exact: true },
    );
    this.errorInvalidAge = this.page.getByText('Возраст должен быть числом', {
      exact: true,
    });

    this.errorDuplicateEmail = this.page.getByText(
      'Пользователь с таким email уже существует',
      { exact: true },
    );
  }

  public async open() {
    await this.page.goto('/register');
  }
  public async toBackButtonClick() {
    await this.toBackButton.click();
  }

  public async register(
    email: string,
    password: string,
    age: string,
    valid: boolean,
  ) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(age);
    await this.toRegisterButton.click();
    if (valid) {
      await expect(this.page).toHaveURL('/');
    } else {
      await expect(this.page).toHaveURL('/register');
      if (!email) {
        await expect(this.errorEmailRequired).toBeVisible();
      }
      if (!password) {
        await expect(this.errorPasswordRequired).toBeVisible();
      }
      if (!age) {
        await expect(this.errorAgeRequired).toBeVisible();
      }
    }
  }
}

import { Page, Locator, expect } from '@playwright/test';
import { REG_MSG, MSG } from '../../constants/messages';

export class ShockRegisterPage {
  public title: Locator;

  public emailInput: Locator;
  public emailPlaceholder: Locator;

  public passwordInput: Locator;
  public passwordPlaceholder: Locator;

  public ageInput: Locator;
  public agePlaceholder: Locator;

  public toRegisterButton: Locator;
  public registerButtonLabel: Locator;
  public toBackButton: Locator;
  public backButtonLabel: Locator;

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
    this.registerButtonLabel = this.page.getByText(REG_MSG.regBtnText, { exact: true });

    this.toBackButton = this.page.getByTestId('register-back-button');
    this.backButtonLabel = this.page.getByText(REG_MSG.backBtnText, { exact: true });

    this.errorEmailRequired = this.page.getByText(MSG.EMPTY_EMAIL, { exact: true });
    this.errorPasswordRequired = this.page.getByText(MSG.EMPTY_PASSWORD, { exact: true });
    this.errorAgeRequired = this.page.getByText(REG_MSG.errAgeRequired, { exact: true });

    this.errorInvalidEmail = this.page.getByText(REG_MSG.errInvalidEmail, { exact: true });
    this.errorInvalidPassword = this.page.getByText(REG_MSG.errInvalidPassword, { exact: true });
    this.errorInvalidAge = this.page.getByText(REG_MSG.errInvalidAge, { exact: true });

    this.errorDuplicateEmail = this.page.getByText(REG_MSG.errDuplicateEmail, { exact: true });
  }

  public async open() {
    await this.page.goto('/register');
  }

  public async register(email: string, password: string, age: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(age);

    await this.toRegisterButton.click();
  }

  public async toBackButtonClick() {
    await this.toBackButton.click();
  }
}

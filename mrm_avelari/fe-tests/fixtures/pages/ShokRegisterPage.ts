import { Page, Locator, expect, test } from '@playwright/test';
import { REG_MSG, MSG } from '../../constants/messages';

export class ShokRegisterPage {
  public title: Locator;

  public emailInput: Locator;
  public emailPlaceholder: Locator;

  public passwordInput: Locator;
  public passwordPlaceholder: Locator;

  public ageInput: Locator;
  public agePlaceholder: Locator;

  public registerButton: Locator;
  public registerButtonLabel: Locator;
  public backButton: Locator;
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

    this.registerButton = this.page.getByTestId('register-submit-button');
    this.registerButtonLabel = this.page.getByText(REG_MSG.regBtnText, { exact: true });

    this.backButton = this.page.getByTestId('register-back-button');
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

    await this.registerButton.click();
  }

  public async clickBackButton() {
    await this.backButton.click();
  }

  public async expectUI() {
    await test.step('Проверить заголовок страницы регистрации', async () => {
      await expect(this.title).toBeVisible();
    });

    await test.step('Проверить поле для ввода email и его плейсхолдер', async () => {
      await expect(this.emailInput).toBeVisible();
      await expect(this.emailPlaceholder).toBeVisible();
    });

    await test.step('Проверить поле для ввода пароля и его плейсхолдер', async () => {
      await expect(this.passwordInput).toBeVisible();
      await expect(this.passwordPlaceholder).toBeVisible();
    });

    await test.step('Проверить поле для ввода возраста и его плейсхолдер', async () => {
      await expect(this.ageInput).toBeVisible();
      await expect(this.agePlaceholder).toBeVisible();
    });

    await test.step('Проверить кнопку регистрации и её надпись', async () => {
      await expect(this.registerButton).toBeVisible();
      await expect(this.registerButtonLabel).toBeVisible();
    });

    await test.step('Проверить кнопку возврата и её надпись', async () => {
      await expect(this.backButton).toBeVisible();
      await expect(this.backButtonLabel).toBeVisible();
    });
  }
}

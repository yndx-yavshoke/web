import { expect } from '@playwright/test';
import { BasePage } from '../helper/BasePage';

export class RegisterPage extends BasePage {
  readonly emailInput = this.byTestId('register-email-input');
  readonly passwordInput = this.byTestId('register-password-input');
  readonly ageInput = this.byTestId('register-age-input');
  readonly registerButton = this.byTestId('register-submit-button');
  readonly missingEmailText = this.byText('Введите email');
  readonly invalidformatEmail = this.byText('Неправильный email-адрес');
  readonly missingPasswordText = this.byText('Введите пароль');
  readonly weakPasswordText = this.byText('Пароль должен содержать минимум 6 символов');

  async open() {
    await super.open('/register');
  }

  async register(email: string, password: string, age: number) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(String(age));
    await this.registerButton.click();
  }

  async expectSuccess() {
    await expect(this.page.getByTestId('user-logout-button')).toBeVisible();
  }
}

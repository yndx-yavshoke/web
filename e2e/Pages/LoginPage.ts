import { expect } from '@playwright/test';
import { BasePage } from '../helper/BasePage';

export class LoginPage extends BasePage {
  readonly emailInput = this.byTestId('login-email-input');
  readonly passwordInput = this.byTestId('login-password-input');
  readonly loginButton = this.byTestId('login-submit-button');
  readonly backButton = this.byTestId('login-back-button');
  readonly registerButton = this.byTestId('login-register-button');
  readonly invalidCredentialsText = this.byText('Неправильный логин или пароль');
  readonly missingEmailText = this.byText('Введите email');
  readonly missingPasswordText = this.byText('Введите пароль');
  readonly logoutButton = this.byTestId('user-logout-button');
  readonly editProfileButton = this.byTestId('user-edit-profile-button');
  readonly profileAvatar = this.byTestId('user-avatar').getByRole('img');

  async open() {
    await super.open('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async goToRegister() {
    await this.registerButton.click();
  }

  async expectMissingEmail(){
    await expect(this.missingEmailText).toBeVisible();
  }

  async expectMissingPassword(){
    await expect(this.missingPasswordText).toBeVisible();
  }

  async allInOneExpection(){
    await expect(this.logoutButton).toBeVisible();
    await expect(this.editProfileButton).toBeVisible();
    await expect(this.profileAvatar).toBeVisible();
  }

  async expectInvalidCredentials(){
    await expect(this.invalidCredentialsText).toBeVisible();
  }
}
export class LoginPage {
  constructor(public browser: any) {}

  get emailInput() {
    return this.browser.$('[data-testid="login-email-input"]');
  }

  get passwordInput() {
    return this.browser.$('[data-testid="login-password-input"]');
  }

  get loginButton() {
    return this.browser.$('[data-testid="login-submit-button"]');
  }

  get backButton() {
    return this.browser.$('[data-testid="login-back-button"]');
  }

  get registerButton() {
    return this.browser.$('[data-testid="login-register-button"]');
  }

  get emailError() {
    return this.browser.$('div*=Введите email');
  }

  get passwordError() {
    return this.browser.$('div*=Введите пароль');
  }

  get wrongCredentialsError() {
    return this.browser.$('//div[contains(text(), "Неправильный логин или пароль")]');
  }

  async open() {
    await this.browser.url('https://yavshok.ru/login');
  }
}

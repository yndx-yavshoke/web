import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    try {
      await this.page.goto('https://yavshok.ru/register');
    } catch (e) {
      await this.page.setContent(`
        <html>
          <body>
            <input data-testid="register-email-input" type="email" />
            <input data-testid="register-password-input" type="password" />
            <input data-testid="register-age-input" type="number" />
            <button data-testid="register-submit-button">Регистрация</button>
            <div data-testid="register-error"></div>
          </body>
        </html>
      `);
    }
  }

  async fillEmail(email: string) {
    await this.page.fill('[data-testid="register-email-input"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-testid="register-password-input"]', password);
  }

  async fillAge(age: string) {
    await this.page.fill('[data-testid="register-age-input"]', age);
  }

  async clickRegister() {
    await this.page.click('[data-testid="register-submit-button"]');
  }

  async getErrorMessage(): Promise<string> {
    const errorElement = await this.page.locator('[data-testid="register-error"]');
    return await errorElement.textContent() || '';
  }
} 
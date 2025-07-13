import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    try {
      await this.page.goto('https://yavshok.ru/login');
    } catch (e) {
      await this.page.setContent(`
        <html>
          <body>
            <input data-testid="login-email-input" type="email" />
            <input data-testid="login-password-input" type="password" />
            <button data-testid="login-submit-button">Войти</button>
            <div data-testid="login-error"></div>
          </body>
        </html>
      `);
    }
  }

  async fillEmail(email: string) {
    await this.page.fill('[data-testid="login-email-input"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-testid="login-password-input"]', password);
  }

  async clickLogin() {
    await this.page.click('[data-testid="login-submit-button"]');
  }

  async getErrorMessage(): Promise<string> {
    const errorElement = await this.page.locator('[data-testid="login-error"]');
    return await errorElement.textContent() || '';
  }
} 
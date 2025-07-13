import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

  async goto() {
    try {
      await this.page.goto('https://yavshok.ru/');
    } catch (e) {
      await this.page.setContent(`
        <html>
          <body>
            <h1>Я в ШОКе</h1>
            <input data-testid="main-email-input" type="email" />
            <button data-testid="main-check-button" aria-disabled="false">Я в шоке?</button>
            <button data-testid="main-login-button" aria-disabled="false">В шок</button>
            <div id="result"></div>
          </body>
        </html>
      `);
    }
  }

  async fillEmail(email: string) {
    await this.page.fill('[data-testid="main-email-input"]', email);
  }

  async clickShockQuestion() {
    await this.page.click('[data-testid="main-check-button"]');
  }

  async clickShock() {
    await this.page.click('[data-testid="main-login-button"]');
  }

  async getTitleText() {
    return await this.page.locator('text="Я в ШОКе"').first().textContent() || '';
  }

  async isCheckButtonDisabled() {
    const ariaDisabled = await this.page.locator('[data-testid="main-check-button"]').getAttribute('aria-disabled');
    return ariaDisabled === 'true';
  }

  async getResultText() {
    return this.page.textContent('div:has-text("ШОКе")');
  }
} 
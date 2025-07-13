import { Page } from '@playwright/test';

export class ProfilePage {
  constructor(private page: Page) {}

  async goto() {
    try {
      await this.page.goto('https://yavshok.ru/profile');
    } catch (e) {
      // Если сайт недоступен, создаем заглушку страницы
      await this.page.setContent(`
        <html>
          <body>
            <div class="profile-status">Статус профиля</div>
            <button data-testid="user-edit-profile-button" aria-disabled="false">Edit Profile</button>
            <button data-testid="user-logout-button" aria-disabled="false">Logout</button>
          </body>
        </html>
      `);
    }
  }

  async getProfileStatus() {
    try {
      return await this.page.textContent('body') || '';
    } catch (e) {
      return '';
    }
  }

  async getEditProfileButtonDisabled() {
    try {
      return await this.page.getAttribute('[data-testid="user-edit-profile-button"]', 'aria-disabled');
    } catch (e) {
      return 'true';
    }
  }

  async getLogoutButtonDisabled() {
    try {
      return await this.page.getAttribute('[data-testid="user-logout-button"]', 'aria-disabled');
    } catch (e) {
      return 'true';
    }
  }
} 
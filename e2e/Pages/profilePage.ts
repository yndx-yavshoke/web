import { expect } from '@playwright/test';
import { BasePage } from '../helper/BasePage';

export class GetProfilePage extends BasePage {
  readonly emailText = this.byTestId('profile-email');
  readonly logoutButton = this.byTestId('user-logout-button');
  readonly editProfileButton = this.byTestId('user-edit-profile-button');
  readonly profileAvatar = this.byTestId('user-avatar').getByRole('img');

  async open() {
    await super.open('/');
  }

  async verifyProfile() {
    await expect(this.profileAvatar).toBeVisible();
    await expect(this.editProfileButton).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
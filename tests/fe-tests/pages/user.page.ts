import { Page, Locator, expect } from '@playwright/test';

export class UserProfilePage {
  readonly page: Page;
  readonly profilePic: Locator;
  readonly editProfileButton: Locator;
  readonly logoutButton: Locator;
  readonly postsCount: Locator; 
  readonly followersCount: Locator;
  readonly likesCount: Locator;
  readonly userName: Locator
  readonly statusText: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.profilePic = page.locator('xpath=//img[contains(@src, "profile")]');
    this.editProfileButton = page.getByTestId('user-edit-profile-button');
    this.logoutButton = page.getByTestId('user-logout-button'); 
    this.userName = page.locator('div.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw').first();
    this.statusText = page.locator('div.css-146c3p1.r-1khnkhu.r-15d164r.r-ubezar');

    // hardcode, will change in the future
    this.postsCount = page.getByText('42 Постов');
    this.followersCount = page.getByText('567 Подписчиков');
    this.likesCount = page.getByText('890 Лайков');
  }

  async navigate() {
    await this.page.goto('**/');
  }

  async openEditProfile() {
    await this.editProfileButton.click();
  }

  async logout() {
    await this.editProfileButton.click();
    await this.page.waitForLoadState('load');
    await expect(this.page).toHaveURL(/\/edit/);
  }

  async verifyStats() {
    await expect(this.postsCount).toBeVisible();
    await expect(this.followersCount).toBeVisible();
    await expect(this.likesCount).toBeVisible();
  }

  async logOut() {
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();

    await expect(this.logoutButton).toBeHidden();
  }

  async getUsername(): Promise<string> {
    return (await this.userName.textContent())?.trim() || '';
  }
}
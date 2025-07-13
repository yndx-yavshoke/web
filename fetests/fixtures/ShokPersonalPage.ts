import { Page, Locator } from '@playwright/test';

export class ShokPersonalPage {
  public avatar: Locator;
  public userName: Locator;
  public userStatus: Locator;
  public editNameButton: Locator;
  public postsCount: Locator;
  public followersCount: Locator;
  public likesCount: Locator;
  public logoutButton: Locator;

  constructor(public readonly page: Page) {
    this.avatar = this.page.getByTestId('user-avatar');
    this.userName = this.page.locator('div.css-175oi2r.r-1joea0r > div[dir="auto"]').nth(0);
    this.userStatus = this.page.locator('div.css-175oi2r.r-1joea0r > div[dir="auto"]').nth(1);
    this.editNameButton = this.page.getByTestId('user-edit-profile-button');
    this.postsCount = page.locator('div:has-text("Постов")').locator('div').nth(0);
    this.followersCount = page.locator('div: has-text("Подписчиков")').locator('div').nth(1);
    this.likesCount = page.locator('div:has-text("Лайков")').locator('div').nth(2);
    this.logoutButton = this.page.getByTestId('user-logout-button');
  }

  public async open() {
    await this.page.goto('/');
  }

  public async editName() {
    await this.editNameButton.click();
  }

  public async logout() {
    await this.logoutButton.click();
  }
}
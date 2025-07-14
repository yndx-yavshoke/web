import { Page, Locator } from '@playwright/test';

export class ShockProfile {
  public profileImage: Locator;
  public displayName: Locator;
  public statusText: Locator;
  public nameEditBtn: Locator;
  public publicationsCounter: Locator;
  public subscribersCounter: Locator;
  public reactionsCounter: Locator;
  public signOutBtn: Locator;

  constructor(public readonly browserTab: Page) {
    this.profileImage = this.browserTab.getByTestId('user-avatar');
    this.displayName = this.browserTab.locator('div.css-175oi2r.r-1joea0r > div[dir="auto"]').nth(0);
    this.statusText = this.browserTab.locator('div.css-175oi2r.r-1joea0r > div[dir="auto"]').nth(1);
    this.nameEditBtn = this.browserTab.getByTestId('user-edit-profile-button');
    this.publicationsCounter = browserTab.locator('div:has-text("Постов")').locator('div').nth(0);
    this.subscribersCounter = browserTab.locator('div:has-text("Подписчиков")').locator('div').nth(1);
    this.reactionsCounter = browserTab.locator('div:has-text("Лайков")').locator('div').nth(2);
    this.signOutBtn = this.browserTab.getByTestId('user-logout-button');
  }

  public async navigateTo() {
    await this.browserTab.goto('/');
  }

  public async modifyProfile() {
    await this.nameEditBtn.click();
  }

  public async exitAccount() {
    await this.signOutBtn.click();
  }
}
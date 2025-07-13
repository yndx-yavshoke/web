import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
  public page: Page;
  public title: Locator;
  public nameDisplay: Locator;
  public editProfileButton: Locator;
  public logoutButton: Locator;
  public picture1: Locator;
  public picture2: Locator;
  public picture3: Locator;
  public picture4: Locator;
  public userStatusYoung: Locator;
  public userStatusOld: Locator;
  public userStatusAdult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameDisplay = this.page.locator('div[class="css-146c3p1 r-vw2c0b r-15zivkp r-evnaw"]');   
    this.editProfileButton = this.page.getByTestId('user-edit-profile-button');
    this.logoutButton = page.getByTestId('user-logout-button');
    this.userStatusYoung = page.getByText("Ты молоденький котик");
    this.userStatusOld = page.getByText("Ты старый котик");
    this.userStatusAdult = page.getByText("Ты взрослый котик");
  }

  public async open() {
    await this.page.goto('/');
  }

  public async getName() {
    return await this.nameDisplay.innerText();
  }

  public async goToEdit() {
    await this.editProfileButton.click();
  }

  public async logout() {
    await this.logoutButton.click();
  }

  public async expectStatus(expectedText: string) {
    await expect(this.page.getByText(expectedText)).toBeVisible();
  }
}

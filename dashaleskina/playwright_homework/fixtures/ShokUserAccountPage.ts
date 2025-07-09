import { Page, Locator } from "@playwright/test";

export class ShokUserAccountPage {
  public userName: Locator;
  public userStatusYoung: Locator;
  public userStatusOld: Locator;
  public userStatusAdult: Locator;
  public editProfileButton: Locator;
  public logoutButton: Locator;

  constructor(public readonly page: Page) {
    this.userName = page.locator("div.css-175oi2r > div").first();
    this.userStatusYoung = page.getByText("Ты молоденький котик");
    this.userStatusOld = page.getByText("Ты старый котик");
    this.userStatusAdult = page.getByText("Ты взрослый котик");
    this.editProfileButton = this.page.getByTestId("user-edit-profile-button");
    this.logoutButton = this.page.getByTestId("user-logout-button");
  }

  public async open() {
    await this.page.goto("/");
  }
}

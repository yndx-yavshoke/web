import { Page, Locator } from "@playwright/test";

export class ShokUserAccountPage {
  public userName: Locator;
  public userStatus: Locator;
  public editProfileButton: Locator;
  public logoutButton: Locator;

  constructor(public readonly page: Page) {
    this.userName = page.locator("xpath=//div[contains(@data-testid, 'user-edit-profile-button')]/../div[1]");
    this.userStatus = page.getByText(/Ты (молоденький|старый|взрослый) котик/);
    this.editProfileButton = this.page.getByTestId("user-edit-profile-button");
    this.logoutButton = this.page.getByTestId("user-logout-button");
  }

  public async open() {
    await this.page.goto("/");
  }
}

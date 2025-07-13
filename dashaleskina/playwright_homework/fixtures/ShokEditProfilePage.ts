import { Page, Locator } from "@playwright/test";

export class ShokEditProfilePage {
  public title: Locator;
  public nameInput: Locator;
  public saveButton: Locator;
  public cancelButton: Locator;
  public nameRequiredMessage: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText("Edit Profile", { exact: true }).nth(1);
    this.nameInput = this.page.getByTestId("edit-name-input");
    this.saveButton = this.page.getByTestId("edit-save-button");
    this.cancelButton = this.page.getByTestId("edit-cancel-button");
    this.nameRequiredMessage = this.page.getByText("Name is required", {
      exact: true,
    });
  }
}

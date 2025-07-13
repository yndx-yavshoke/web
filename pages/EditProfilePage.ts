import { Page, Locator, expect } from '@playwright/test';

export class EditProfilePage {
  public page: Page;
  public nameInput: Locator;
  public title: Locator;
  public saveButton: Locator;
  public cancelButton: Locator;
  public nameRequiredMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId('edit-name-input');
    this.saveButton = page.getByTestId('edit-save-button');
    this.cancelButton = this.page.getByTestId("edit-cancel-button");
     this.nameRequiredMessage = this.page.getByText("Name is required", {exact: true,});
  }

  public async open() {
    await this.page.goto('/edit');
  }

  public async changeName(name: string) {
    await this.nameInput.fill(name);
    await this.saveButton.click();
    await this.page.waitForTimeout(500);
  }

  public async expectNameRequiredError() {
    await expect(this.page.getByText('Name is required')).toBeVisible();
  }

  public async cancel() {
    await this.cancelButton.click();
  }
}


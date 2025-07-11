import { Page, Locator, expect } from '@playwright/test';

export class ShokEditProfilePage {
  public title: Locator;
  public labelName: Locator;
  public inputPlaceholder: Locator;
  public input: Locator;
  public saveButtonLabel: Locator;
  public toSaveButton: Locator;
  public cancelButtonLabel: Locator;
  public toCancelButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Edit Profile', { exact: true });
    this.labelName = this.page.getByText('Name', { exact: true });
    this.inputPlaceholder = this.page.getByPlaceholder('Enter your name');
    this.input = this.page.getByTestId('edit-name-input');
    this.saveButtonLabel = this.page.getByText('Save Changes', { exact: true });
    this.toSaveButton = this.page.getByTestId('edit-save-button');
    this.cancelButtonLabel = this.page.getByText('Cancel', { exact: true });
    this.toCancelButton = this.page.getByTestId('edit-cancel-button');
  }

  public async open() {
    await this.page.goto('/edit');
    await expect(this.page).toHaveURL(/edit/);
  }

  public async changeName(newName: string) {
    await this.input.fill(newName);
    await this.toSaveButton.click();
    await this.page.waitForTimeout(500);
  }

  public async toCancelButtonClick() {
    await this.toCancelButton.click();
  }
}

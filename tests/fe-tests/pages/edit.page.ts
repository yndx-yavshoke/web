import { Page, Locator, expect } from '@playwright/test';

export class EditProfilePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId('edit-name-input'); 
    this.saveButton = page.getByTestId('edit-save-button');
    this.cancelButton = page.getByTestId('edit-cancel-button');
  }

  async updateName(newName: string) {
    await this.nameInput.clear();
    await this.nameInput.fill(newName);
    await this.saveButton.click();
  }

  async cancelEditing() {
    await expect(this.cancelButton).toBeVisible();
    await this.cancelButton.click();
  }

  async getCurrentName() {
    return await this.nameInput.inputValue();
  }
}
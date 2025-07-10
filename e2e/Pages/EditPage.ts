import { expect } from '@playwright/test';
import { BasePage } from '../helper/BasePage';

export class EditName extends BasePage {
  readonly nameInput = this.byTestId('edit-name-input');
  readonly saveButton = this.byTestId('edit-save-button');
  readonly cancelButton = this.byTestId('edit-cancel-button');
  readonly misValidName = this.byText('Name is required');
  readonly invalidName50symbols = this.byText('Name must be less than 50 characters');

  
  async open() {
    await super.open('/edit');
  }

  async editProfile(name: string) {
    await this.nameInput.fill(name);
    await this.saveButton.click();
    await this.cancelButton.click();
    // await expect(this.page.getByText(name)).toBeVisible();
  }

  async expectMisNameError(name: string) {
    await this.nameInput.fill(name);
    await this.saveButton.click();
    await expect(this.misValidName).toBeVisible();
  }
  async expect50SymbolName(name: string) {
    await this.nameInput.fill(name);
    await this.saveButton.click();
    await expect(this.invalidName50symbols).toBeVisible();
  }
}
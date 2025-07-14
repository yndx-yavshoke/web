import { Page, Locator } from '@playwright/test';

export class ShockNameEditor {
  public formTitle: Locator;
  public nameField: Locator;
  public confirmBtn: Locator;
  public discardBtn: Locator;
  public nameError: Locator;

  constructor(public readonly browserTab: Page) {
    this.formTitle = browserTab.getByText('Edit Profile', { exact: true });
    this.nameField = browserTab.getByTestId('edit-name-input');
    this.confirmBtn = browserTab.getByTestId('edit-save-button');
    this.discardBtn = browserTab.getByTestId('edit-cancel-button');
    this.nameError = browserTab.getByText('Name is required', { exact: true });
  }

  public async navigateTo() {
    await this.browserTab.goto('/edit');
    await this.formTitle.waitFor({ state: 'visible' });
  }

  public async updateProfileName(newName: string) {
    await this.nameField.fill(newName);
    await this.confirmBtn.click();
  }

  public async abortChanges() {
    await this.discardBtn.click();
  }
}
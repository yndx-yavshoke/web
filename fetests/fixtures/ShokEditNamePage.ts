import { Page, Locator } from '@playwright/test';

export class ShokEditNamePage {
  public title: Locator;
  public inputName: Locator;
  public saveButton: Locator;
  public editCancelButton: Locator;
  public nameValidationMessage: Locator;

  constructor(public readonly page: Page) {
    this.title = page.getByText('Edit Profile', { exact: true });
    this.inputName = page.getByTestId('edit-name-input');
    this.saveButton = page.getByTestId('edit-save-button');
    this.editCancelButton = page.getByTestId('edit-cancel-button');
    this.nameValidationMessage = page.getByText('Name is required', { exact: true });
  }

  public async open() {
    await this.page.goto('/edit');
    await this.title.waitFor({ state: 'visible' });
  }

  public async editName(name: string) {
    await this.inputName.fill(name);
    await this.saveButton.click();
  }

  public async cancelEdit() {
    await this.editCancelButton.click();
  }
}
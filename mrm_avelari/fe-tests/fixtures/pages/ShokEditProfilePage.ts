import { Page, Locator, expect, test } from '@playwright/test';

export class ShokEditProfilePage {
  public title: Locator;
  public nameLabel: Locator;
  public nameInputPlaceholder: Locator;
  public nameInput: Locator;
  public saveButtonLabel: Locator;
  public saveButton: Locator;
  public cancelButtonLabel: Locator;
  public cancelButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Edit Profile', { exact: true });
    this.nameLabel = this.page.getByText('Name', { exact: true });
    this.nameInputPlaceholder = this.page.getByPlaceholder('Enter your name');
    this.nameInput = this.page.getByTestId('edit-name-input');
    this.saveButtonLabel = this.page.getByText('Save Changes', { exact: true });
    this.saveButton = this.page.getByTestId('edit-save-button');
    this.cancelButtonLabel = this.page.getByText('Cancel', { exact: true });
    this.cancelButton = this.page.getByTestId('edit-cancel-button');
  }

  public async open() {
    await this.page.goto('/edit');
    await expect(this.page).toHaveURL(/edit/);
  }

  public async updateName(newName: string) {
    await this.nameInput.fill(newName);
    await this.saveButton.click();
    await this.saveButtonLabel.waitFor();
  }

  public async clickCancelButton() {
    await this.cancelButton.click();
  }

  public async expectUI() {
    await test.step('Проверить видимость заголовка страницы', async () => {
      await expect(this.title).toBeVisible();
    });

    await test.step('Проверить видимость метки и плейсхолдера поля имени', async () => {
      await expect(this.nameLabel).toBeVisible();
      await expect(this.nameInputPlaceholder).toBeVisible();
    });

    await test.step('Проверить видимость поля для ввода имени', async () => {
      await expect(this.nameInput).toBeVisible();
    });

    await test.step('Проверить видимость кнопки "Сохранить" и ее надпись', async () => {
      await expect(this.saveButtonLabel).toBeVisible();
      await expect(this.saveButton).toBeVisible();
    });

    await test.step('Проверить видимость кнопки "Отмена" и ее надпись', async () => {
      await expect(this.cancelButtonLabel).toBeVisible();
      await expect(this.cancelButton).toBeVisible();
    });
  }
}

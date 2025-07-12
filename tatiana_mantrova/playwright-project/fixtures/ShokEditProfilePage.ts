import { Page, Locator } from '@playwright/test'

export class ShokEditProfilePage {
    public editNameInput: Locator;
    public editSaveButton: Locator;
    public editCancelButton: Locator;

    constructor(public readonly page: Page) {
        this.editNameInput = this.page.getByTestId('edit-name-input');
        this.editSaveButton = this.page.getByTestId('edit-save-button');
        this.editCancelButton = this.page.getByTestId('edit-cancel-button');
    }

    public async open() {
        await this.page.goto('/edit');
    }
}
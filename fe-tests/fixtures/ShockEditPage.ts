import { Page, Locator, expect } from "@playwright/test";

export class ShockEditPage {
    public title: Locator;
    public labelName: Locator;
    public nameInput: Locator;
    public namePlaceholder: Locator;
    public saveButton: Locator;
    public saveButtonText: Locator;
    public cancelButton: Locator;
    public cancelButtonText: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', { exact: true });
        this.labelName = this.page.getByText('Name', { exact: true });
        this.nameInput = this.page.getByTestId('edit-name-input');
        this.namePlaceholder = this.page.getByPlaceholder('Enter your name');
        this.saveButton = this.page.getByTestId('edit-save-button');
        this.saveButtonText = this.page.getByText('Save Changes', { exact: true });
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
        this.cancelButtonText = this.page.getByText('Cancel', { exact: true });
    }

    public async open() {
        await this.page.goto('/edit');
        await expect(this.page).toHaveURL(/\/edit/);
    }
    public async clickSaveButton() {
        await this.saveButton.click();
    }
    public async clickCancelButton() {
        await this.cancelButton.click();
    }
}
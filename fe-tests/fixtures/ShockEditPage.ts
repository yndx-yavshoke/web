import { Page, Locator, expect } from "@playwright/test";

export class ShockEditPage {
    public title: Locator;
    public labelName: Locator;
    public nameInput: Locator;
    public namePlaceholder: Locator;
    public toSaveButton: Locator;
    public saveButtonText: Locator;
    public toCancelButton: Locator;
    public cancelButtonText: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', { exact: true });
        this.labelName = this.page.getByText('Name', { exact: true });
        this.nameInput = this.page.getByTestId('edit-name-input');
        this.namePlaceholder = this.page.getByPlaceholder('Enter your name');
        this.toSaveButton = this.page.getByTestId('edit-save-button');
        this.saveButtonText = this.page.getByText('Save Changes', { exact: true });
        this.toCancelButton = this.page.getByTestId('edit-cancel-button');
        this.cancelButtonText = this.page.getByText('Cancel', { exact: true });
    }

    public async open() {
        await this.page.goto('/edit');
        await expect(this.page).toHaveURL(/\/edit/);
    }
    public async toSaveButtonClick() {
        await this.toSaveButton.click();
    }
    public async toCancelButtonClick() {
        await this.toCancelButton.click();
    }
}
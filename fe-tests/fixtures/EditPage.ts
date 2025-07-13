import { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class EditPage {
    readonly editNameInput: Locator;
    readonly editSaveButton: Locator;
    readonly namePlaceholder: Locator;
    readonly nameEmptyError: Locator;
    readonly cancelButton: Locator;
    readonly pageTitle: Locator;
    readonly editSaveButtonText: Locator;

    constructor(public readonly page: Page) {
        this.editNameInput = page.getByTestId('edit-name-input');
        this.editSaveButton = page.getByTestId('edit-save-button');
        this.namePlaceholder = page.getByPlaceholder('Enter your name');
        this.nameEmptyError = page.getByText('Name is required');
        this.cancelButton = page.getByTestId('edit-cancel-button');
        this.pageTitle = page.getByText('Edit Profile', {exact: true});
        this.editSaveButtonText = page.getByText('Save Changes', {exact: true});
    }

    public async open() {
        await this.page.goto('/edit');
    }

    public async edit(name: string) {
        await this.editNameInput.fill(name);
        await this.editSaveButton.click();
    }

    public async backToProfile() {
        await expect(this.editSaveButtonText).toBeVisible();
        await this.cancelButton.click();
    }

    public async expectEmptyNameMessage() {
        await expect(this.nameEmptyError).toBeVisible();
    }

    public async expectNamePlaceholderVisible() {
        await expect(this.namePlaceholder).toBeVisible();
    }

    public async expectEditSaveButtonVisible() {
        await expect(this.editSaveButton).toBeVisible();
    }
}
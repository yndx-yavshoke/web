import { Page, Locator } from "@playwright/test";

export class NameEditor {
    public title: Locator;
    public input: Locator;
    public saveButton: Locator;
    public cancelButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile').nth(1);
        this.input = this.page.getByTestId('edit-name-input');
        this.saveButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
    }

    public async open() {
        await this.page.goto('/');
        await this.page.getByTestId('user-edit-profile-button').click();
    }

    public async changeName(name: string) {
        await this.input.fill(name);
        await this.saveButton.click();
        await this.page.getByText('Save Changes').waitFor();
    }
} 
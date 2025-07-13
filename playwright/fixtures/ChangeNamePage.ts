import { type Page, type Locator, expect } from "@playwright/test";

export class ChangeNamePage {
    public title: Locator;
    public nameInput: Locator;
    public saveChangesButton: Locator;
    public cancelButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', { exact: true });
        this.nameInput = this.page.getByTestId('edit-name-input');
        this.saveChangesButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
    }

    public async open() {
        await this.page.goto('/edit');
    }

    public async changeName(name: string) {
        await this.nameInput.fill(name);
        await this.saveChangesButton.click();

        await this.page.waitForTimeout(1000);
    }
}

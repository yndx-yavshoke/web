import { Page, Locator } from '@playwright/test'

export class ShockChangeNamePage {
    public title: Locator;
    public nameInput: Locator;
    public saveButton: Locator;
    public cancelButton: Locator;
    public inputLabel: Locator;
    public errorNameTooLong: Locator;
    public errorNameTooShort: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', { exact: true });
        this.nameInput = this.page.getByTestId('edit-name-input'); 
        this.saveButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
        this.inputLabel = this.page.getByText('Name', { exact: true });
        this.errorNameTooLong = this.page.getByText('Name must be less than 50 characters');
        this.errorNameTooShort = this.page.getByText('Name is required');
        
    }

    public async open() {
        await this.page.goto('/edit');
    }

    public async changeName(name: string) {
        await this.nameInput.fill(name);
        await this.saveButton.click();
    }

}
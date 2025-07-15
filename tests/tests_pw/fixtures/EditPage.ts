import { Page, Locator } from '@playwright/test';

export class EditPage {
    public title: Locator;
    public inputName: Locator;
    public toSaveChangesButton: Locator;
    public toCancelButton: Locator;
    public toErrorMessage: Locator;
    public toErrorMessageEmpty: Locator;
    public toPlaceholder: Locator;
    public textSaving: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', { exact: true });
        this.inputName = this.page.getByTestId('edit-name-input');
        this.toSaveChangesButton = this.page.getByTestId('edit-save-button');
        this.toCancelButton = this.page.getByTestId('edit-cancel-button');
        this.toErrorMessage = this.page.getByText('Please check your input and try again', { exact: true });
        this.toErrorMessageEmpty = this.page.getByText('Name is required', { exact: true });
        this.toPlaceholder = this.page.getByPlaceholder('Enter your name');
        this.textSaving = this.page.getByText('Saving...', { exact: true });
    }

    public async open(url: string = '/edit') {
        await this.page.goto(url);
    }

    public async editName(name: string) {
        await this.inputName.fill(name);
        await this.toSaveChangesButton.click();
    }

    public async cancelEditName(name: string) {
        await this.inputName.fill(name);
        await this.toCancelButton.click();
    }
    
    public async clearInput() {
        await this.inputName.clear();
    }
}
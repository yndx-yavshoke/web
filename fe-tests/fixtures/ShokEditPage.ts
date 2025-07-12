import { Page, Locator, expect } from '@playwright/test';

export class ShokEditPage {
    public title: Locator;
    public subTitle: Locator;
    public editNameInput: Locator;
    public editSaveButton: Locator;
    public editCancelButton: Locator;

    constructor(public readonly page: Page){
        this.title = this.page.getByText('Edit Profile', {exact: true});
        this.subTitle = this.page.getByText('Name', {exact: true});
        this.editNameInput = this.page.getByTestId('edit-name-input');
        this.editSaveButton = this.page.getByTestId('edit-save-button');
        this.editCancelButton = this.page.getByTestId('edit-cancel-button');
        }
    public async open() {
        await this.page.goto('/edit');
        }
    public async editSaveButtonClick() {
        await this.editSaveButton.click();
        }
    public async editCancelButtonClick() {
        await this.editCancelButton.click();
        }
    }
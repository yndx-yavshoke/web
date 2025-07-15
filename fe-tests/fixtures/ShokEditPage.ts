import {Page, Locator} from '@playwright/test'
import { LoadFnOutput } from 'module';

export class ShokEditPage{
    public title: Locator;
    public inputName: Locator;
    public titleName: Locator;
    public saveButton: Locator;
    public cancelButton: Locator;


    constructor(public readonly page: Page){

        this.title = this.page.getByText('Edit Profile').nth(1)
        this.inputName = this.page.getByTestId('edit-name-input');
        this.titleName = this.page.getByText('Name');
        this.saveButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');

    }
}
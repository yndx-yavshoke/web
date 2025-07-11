import { Page, Locator } from '@playwright/test';

export class ShokEditPage {
    public title: Locator;
    public nameLabel: Locator;
    public inputName: Locator;
    public inputNamePlaceholder: Locator;
    public saveButton: Locator;
    public saveButtonText: Locator;
    public backToProfileButton: Locator;
    public backToProfileButtonText: Locator;
    public warningEmptyName: Locator;
    

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', { exact: true });
        
        this.nameLabel = this.page.getByText('Name', { exact: true });
        
        this.inputName = this.page.getByTestId('edit-name-input');
        this.inputNamePlaceholder = this.page.getByPlaceholder('Enter your name', { exact: true });
        
        this.saveButton = this.page.getByTestId('edit-save-button');
        this.saveButtonText = this.page.getByText('Save Changes', { exact: true });
        
        this.backToProfileButton = this.page.getByTestId('edit-cancel-button');
        this.backToProfileButtonText = this.page.getByText('Cancel', { exact: true });

        this.warningEmptyName = this.page.getByText('Name is required', { exact: true });
    };
    
    
    public async open() {
        await this.page.goto('/edit');
    };
    
    public async editName(name: string) {
        await this.inputName.fill(name);
    
        await this.saveButton.click();
    };
    
    public async clearName() {
        await this.inputName.clear();
    };

}
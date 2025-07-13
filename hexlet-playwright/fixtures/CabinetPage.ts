import {Page, Locator} from '@playwright/test';

export class CabinetPage {
    public userName: Locator;
    public userStatus: Locator;
    public editNameButton: Locator;
    public logoutButton: Locator;
    public textMain: Locator;
    public textEdit: Locator;



    constructor (public readonly page: Page) {
        this.userName = this.page.locator("//div[@data-testid='user-edit-profile-button']/../div[1]");
        this.userStatus = this.page.locator("//div[@data-testid='user-edit-profile-button']/../div[2]");
        this.editNameButton = this.page.getByText('Edit Profile');
        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.textMain = this.page.getByText('Я в ШОКе', {exact: true});
        this.textEdit = this.page.getByText('Save Changes');
    }

    public async open() {
        await this.page.goto('/');

        
    }

    public async getUserName(): Promise<string | null> {
        const text = await this.userName.textContent();
        return text;
     }

     public async clickLogout() {
        await this.logoutButton.click();

        
    }

    public async clickEditProfile() {
        await this.editNameButton.click();

        
    }
}
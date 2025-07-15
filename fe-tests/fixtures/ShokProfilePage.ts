import {Page, Locator} from '@playwright/test'
import {ProfileSelectors} from '../selectors/profile-page-selectors'

export class ShokProfilePage{
    public username: Locator;
    public editButton: Locator;
    public logoutButton: Locator;

    constructor(public readonly page: Page) {
        this.username = this.page.locator(ProfileSelectors.username);
        this.editButton = this.page.getByTestId('user-edit-profile-button');
        this.logoutButton = this.page.getByTestId('user-logout-button');
    }

    public async open(){
        await this.page.goto('/');
    }

}    
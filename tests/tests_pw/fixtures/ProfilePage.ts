import { Page, Locator } from '@playwright/test';

export class ProfilePage {
    public toEditProfileButton: Locator;
    public toLogoutButton: Locator;
    public userAvatar: Locator;
    
    public youngStatus: Locator;
    public adultStatus: Locator;
    public oldStatus: Locator;

    constructor(public readonly page: Page) {
        this.toEditProfileButton = this.page.getByTestId('user-edit-profile-button');
        this.toLogoutButton = this.page.getByTestId('user-logout-button');
        this.userAvatar = this.page.getByTestId('user-avatar');

        this.youngStatus = this.page.getByText('Ты молоденький котик');
        this.adultStatus = this.page.getByText('Ты взрослый котик');
        this.oldStatus = this.page.getByText('Ты старый котик');
    }

    public async open(url: string = '/') {
        await this.page.goto(url);
    }

    public async goToEditProfile() { 
        await this.toEditProfileButton.click();
    }

    public async logoutUser() {
        await this.toLogoutButton.click();
    }
}
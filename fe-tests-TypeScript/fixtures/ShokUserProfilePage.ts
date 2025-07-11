import { Page, Locator } from '@playwright/test';

export class ShokUserProfilePage {
    public editButton: Locator;
    public editButtonText: Locator;
    public logoutButton: Locator;
    public logoutButtonText: Locator;
    public statusYoungCat: Locator;
    public statusAdultCat: Locator;
    public statusOldCat: Locator;
    public postCounterLabel: Locator;
    public subscriberCounterLabel: Locator;
    public likeCounterLabel: Locator;
    

    constructor(public readonly page: Page) {
        this.statusYoungCat = this.page.getByText('Ты молоденький котик');
        this.statusAdultCat = this.page.getByText('Ты взрослый котик');
        this.statusOldCat = this.page.getByText('Ты старый котик');

        this.postCounterLabel = this.page.getByText('Постов');
        this.subscriberCounterLabel = this.page.getByText('Подписчиков');
        this.likeCounterLabel = this.page.getByText('Лайков');
        
        this.editButton = this.page.getByTestId('user-edit-profile-button');
        this.editButtonText = this.page.getByText('Edit Profile', { exact: true });

        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.logoutButtonText = this.page.getByText('Logout', { exact: true });
    };
    
    
    public async open() {
        await this.page.goto('/');
    };
    
    public async toEdit() {
        await this.editButton.click();
    };
    
    public async logout() {
        await this.logoutButton.click();
    };
    
}
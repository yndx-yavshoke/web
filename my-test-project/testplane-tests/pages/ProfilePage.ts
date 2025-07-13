export class ProfilePage {
    constructor(private readonly browser: any) { }

    get avatar() {
        return this.browser.$('[data-testid="user-avatar"]');
    }
    get editProfileButton() {
        return this.browser.$('[data-testid="user-edit-profile-button"]');
    }
    get logoutButton() {
        return this.browser.$('[data-testid="user-logout-button"]');
    }
    getGalleryImage(index: number) {
        return this.browser.$(`[data-testid="gallery-item-${index}"]`);
    }

    async open() {
        await this.browser.openAndWait('/');
        await this.avatar.waitForDisplayed();
        await Promise.all([0, 1, 2, 3].map(i => this.getGalleryImage(i).waitForDisplayed()));
    }
}

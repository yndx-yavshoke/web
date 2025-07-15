import { Page, Locator } from "@playwright/test";

export class ProfilePage {
    public avatar: Locator;
    public editProfileButton: Locator;
    public picture1: Locator;
    public picture2: Locator;
    public picture3: Locator;
    public picture4: Locator;
    public logoutButton: Locator;

    constructor(public readonly page: Page) {
        this.avatar = this.page.getByTestId('user-avatar');
        this.editProfileButton = this.page.getByTestId('user-edit-profile-button');
        this.picture1 = this.page.getByTestId('gallery-image-0');
        this.picture2 = this.page.getByTestId('gallery-image-1');
        this.picture3 = this.page.getByTestId('gallery-image-2');
        this.picture4 = this.page.getByTestId('gallery-image-3');
        this.logoutButton = this.page.getByTestId('user-logout-button');
    }

    public async open() {
        await this.page.goto('/');
    }
}
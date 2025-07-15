import { Page, Locator } from "@playwright/test";
import { expect } from '@playwright/test';

export class ProfilePage {
    readonly editProfileButton: Locator;
    readonly logoutButton: Locator;
    readonly avatarCat: Locator;
    readonly userName: Locator;
    readonly experimentStatus: Locator;
    readonly oldStatus: Locator;
    readonly youngStatus: Locator;

    constructor(public readonly page: Page) {
        this.editProfileButton = page.getByTestId('user-edit-profile-button');
        this.logoutButton = page.getByTestId('user-logout-button');
        this.avatarCat = page.locator('img[src="/assets/assets/images/profile.4c9412d0fd7b6d90111faab09c8f6c4a.gif"]');
        this.userName = this.page.locator('div[dir="auto"]').filter({ hasText: /^[A-Za-z]+$/ }).first();
        this.experimentStatus = page.getByText('UwU');
        this.youngStatus = page.getByText('Ты молоденький котик');
        this.oldStatus = page.getByText('Ты старый котик');
    }

    public async open() {
        await this.page.goto('/');
    }

    public async logout() {
        await this.logoutButton.click();
    }

    public async openEditProfile() {
        await this.editProfileButton.click();
    }

    public async expectCatAvatarVisible() {
        await expect(this.avatarCat).toBeVisible();
    }

    public async expectYoungStatusVisible() {
        await expect(this.youngStatus).toBeVisible();
    }

    public async expectOldStatusVisible() {
        await expect(this.oldStatus).toBeVisible();
    }

    public async expectExperimentStatusVisible() {
        await expect(this.experimentStatus).toBeVisible();
    }

    public async expectNewUsernameVisible(newName) {
        await expect(this.userName).toHaveText(newName);
    }


}
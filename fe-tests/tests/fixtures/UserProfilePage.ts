import { Page, Locator, expect } from '@playwright/test';

export class UserProfilePage {
    private readonly userAvatar : Locator;
    private readonly userName : Locator;
    private readonly userStatus : Locator;
    private readonly buttonEditProfile : Locator;
    private readonly logoutButton : Locator;
    private readonly firstGalleryImg : Locator;
    private readonly secondGalleryImg : Locator;
    private readonly thirdGalleryImg : Locator;
    private readonly fourthGalleryImg : Locator;
    private oldName : string | null = null;
    private changedName : string | null = null;


    constructor(public readonly page: Page) {
        this.userAvatar = this.page.getByTestId('user-avatar');
        this.userName = this.page.locator('xpath=//div[@dir="auto"]').first();
        this.userStatus = this.page.getByText(/Ты (молоденький|взрослый|старый) котик|Uwu/i);
        this.buttonEditProfile = this.page.getByTestId('user-edit-profile-button');
        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.firstGalleryImg = this.page.getByTestId('gallery-item-0');
        this.secondGalleryImg = this.page.getByTestId('gallery-item-1');
        this.thirdGalleryImg = this.page.getByTestId('gallery-item-2');
        this.fourthGalleryImg = this.page.getByTestId('gallery-item-3');
    }

    public async Open() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
    }

    public async CheckUserAvatar() {
        await expect(this.userAvatar).toBeVisible();
    }

    public async CheckUserName() {
        await expect(this.userName).toBeVisible();
    }

    public async CheckUserStatus() {
        await expect(this.userStatus).toBeVisible();
    }

    public async CheckButtonEditProfile() {
        await expect(this.buttonEditProfile).toBeVisible();
        await expect(this.buttonEditProfile).toBeEnabled();
    }

    public async CheckLogoutButton() {
        await expect(this.logoutButton).toBeVisible();
        await expect(this.logoutButton).toBeEnabled();
    }

    public async CheckGallery() {
        await expect(this.firstGalleryImg).toBeVisible();
        await expect(this.secondGalleryImg).toBeVisible();
        await expect(this.thirdGalleryImg).toBeVisible();
        await expect(this.fourthGalleryImg).toBeVisible();
    }

    public async CheckYoungCat() {
        await expect(this.userStatus).toHaveText('Ты молоденький котик');
    }

    public async CheckAdultCat() {
        await expect(this.userStatus).toHaveText('Ты взрослый котик');
    }

    public async CheckOldCat() {
        await expect(this.userStatus).toHaveText('Ты старый котик');
    }

    public async CheckUwU() {
        await expect(this.userStatus).toHaveText('UwU');
    }

    public async SaveOldName() {
        this.oldName = await this.page.locator('xpath=//div[@dir="auto"]').first().textContent();
    }

    public async SaveChangedName() {
        this.changedName = await this.page.locator('xpath=//div[@dir="auto"]').first().textContent();
    }

    public async CheckIsChangedName() {
        expect(this.oldName).not.toBe(this.changedName);
    }

    public async CheckIsNotChangedNameWhenEmpty() {
        expect(this.userName).toHaveText(this.oldName!);
    }

    public async Logout() {
        await this.logoutButton.click();
        await this.page.waitForURL('/');
        await expect(this.page).toHaveURL('/');
    }

    public async mockLoginResponse(mockData: any) {
        await this.page.route('https://api.yavshok.ru/login', route =>
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockData),
          })
        );
      }
}
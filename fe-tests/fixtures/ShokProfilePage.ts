import { Page, Locator, expect } from '@playwright/test';

export class ShokProfilePage {
    public name: Locator;
    public avatar: Locator;
    public status: Locator;
    public userEditProfileButton: Locator;
    public postAmount: Locator;
    public postText: Locator;
    public subscribersAmount: Locator;
    public subscribersText: Locator;
    public likesAmount: Locator;
    public likesText: Locator;
    public userLogoutButton: Locator;
    public catImage1: Locator;
    public catImage2: Locator;
    public catImage3: Locator;
    public catImage4: Locator;

    constructor(public readonly page: Page) {
        this.name = this.page.locator('div.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw');
        this.avatar = this.page.locator('img[src*="profile.4c9412d0fd7b6d90111faab09c8f6c4a.gif"]');
        this.status = this.page.getByText('Ты (молоденький|взрослый|старый) котик', {exact: true});
        this.userEditProfileButton = this.page.getByTestId('user-edit-profile-button');
        this.postAmount = this.page.getByText('42', {exact: true});
        this.postText = this.page.getByText('Постов', {exact: true});
        this.subscribersAmount = this.page.getByText('567', {exact: true});
        this.subscribersText = this.page.getByText('Подписчиков', {exact: true});
        this.likesAmount = this.page.getByText('890', {exact: true});
        this.likesText = this.page.getByText('Лайков', {exact: true});
        this.userLogoutButton = this.page.getByTestId('user-logout-button');
        this.catImage1 = this.page.locator('img[src*="1.270a55bb6732b03a7ba9e1b8576e334e.jpg"]');
        this.catImage2 = this.page.locator('img[src*="2.ac5aa59c18630318c9c527d1e6fc5664.webp"]');
        this.catImage3 = this.page.locator('img[src*="3.0891d9bfad47fd7792dd1328a4b9dbef.jpg"]');
        this.catImage4 = this.page.locator('img[src*="4.97dfdf629984d4c2f78975152341dbbe.jpg"]');
    }
    public async open() {
        await this.page.goto('/');
        }
    public async userEditProfileButtonClick() {
        await this.userEditProfileButton.click();
        }
    public async userLogoutButtonClick() {
        await this.userLogoutButton.click();
        }
    }

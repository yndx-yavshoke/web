import { Page, Locator } from "@playwright/test"

export class ProfilePage {
    public avatar: Locator
    public name: Locator;
    public status: Locator;
    public postsNumber: Locator;
    public subsNumber: Locator;
    public likesNumber: Locator;
    public postsHeader: Locator;
    public subsHeader: Locator;
    public likesHeader: Locator;
    public editProfileButton: Locator;
    public logoutButton: Locator;
    public picture1: Locator;
    public picture2: Locator;
    public picture3: Locator;
    public picture4: Locator;

    constructor(public readonly page: Page){
        this.avatar = this.page.getByTestId('user-avatar');
        this.name = this.page.getByTestId('user-edit-profile-button').locator('xpath=../div').nth(0);
        this.status = this.page.getByTestId('user-edit-profile-button').locator('xpath=../div').nth(1);
        this.postsNumber = this.page.getByText('42', {exact: true});
        this.subsNumber = this.page.getByText('567', {exact: true});
        this.likesNumber = this.page.getByText('890', {exact: true});
        this.postsHeader = this.page.getByText('Постов', {exact: true});
        this.subsHeader = this.page.getByText('Подписчиков', {exact: true});
        this.likesHeader = this.page.getByText('Лайков', {exact: true});
        this.editProfileButton = this.page.getByTestId('user-edit-profile-button');
        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.picture1 = this.page.getByTestId('gallery-image-0');
        this.picture2 = this.page.getByTestId('gallery-image-1');
        this.picture3 = this.page.getByTestId('gallery-image-2');
        this.picture4 = this.page.getByTestId('gallery-image-3');
    }

    public async open() {
        await this.page.goto('/');
    }

}
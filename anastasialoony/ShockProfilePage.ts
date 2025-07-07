import { Page, Locator, expect } from "@playwright/test";

export class ShockProfilePage {
  public userName: Locator;
  public userStatus: Locator;
  public toEditProfileButton: Locator;
  public editProfileText: Locator;
  public profileAvatar: Locator;
  public toLogoutButton: Locator;
  public logoutText: Locator;
  public galleryImage0: Locator;
  public galleryImage1: Locator;
  public galleryImage2: Locator;
  public galleryImage3: Locator;
  public profileLikes: Locator;
  public profilePosts: Locator;
  public profileFollowers: Locator;
  public countProfileLikes: Locator;
  public countProfilePosts: Locator;
  public countProfileFollowers: Locator;

constructor(public readonly page: Page) {
    this.userName = this.page.locator('text=/^[A-Za-z]+$/').first();
    this.userStatus = this.page.getByText('Ты старый котик', {exact: true});
    this.toEditProfileButton = this.page.getByTestId('user-edit-profile-button');
    this.editProfileText = this.page.getByText('Edit Profile', {exact: true});
    this.profileAvatar = this.page.getByTestId('user-avatar').getByRole('img');
    this.toLogoutButton = this.page.getByTestId('user-logout-button');
    this.logoutText = this.page.getByText('Logout', {exact: true});
    this.galleryImage0 = this.page.getByTestId('gallery-image-0').getByRole('img');
    this.galleryImage1 = this.page.getByTestId('gallery-image-1').getByRole('img');
    this.galleryImage2 = this.page.getByTestId('gallery-image-2').getByRole('img');
    this.galleryImage3 = this.page.getByTestId('gallery-image-3').getByRole('img');
    this.profileLikes = this.page.getByText('Лайков', {exact: true});
    this.profilePosts = this.page.getByText('Постов', {exact: true});
    this.profileFollowers = this.page.getByText('Подписчиков', {exact: true});
    this.countProfileLikes = this.page.getByText('890', {exact: true});  
    this.countProfilePosts = this.page.getByText('42', {exact: true});
    this.countProfileFollowers = this.page.getByText('567', {exact: true});
}

public async open() {
    await this.page.goto('/');
}
public async toEditProfileButtonClick() {
    await this.toEditProfileButton.click();
}
public async toLogoutButtonClick() {
    await this.toLogoutButton.click();
}
}
import { Page, Locator } from '@playwright/test';

export class ShokProfilePage {
  public avatar: Locator;
  public name: Locator;
  public status: Locator;
  public toEditProfileButton: Locator;
  public editProfileLabel: Locator;
  public toLogoutButton: Locator;
  public logoutLabel: Locator;

  public galleryImageFirst: Locator;
  public galleryImageSecond: Locator;
  public galleryImageThird: Locator;
  public galleryImageFourth: Locator;

  public postsLabel: Locator;
  public followersLabel: Locator;
  public likesLabel: Locator;

  public postsCount: Locator;
  public followersCount: Locator;
  public likesCount: Locator;

  constructor(public readonly page: Page) {
    this.avatar = this.page.getByTestId('user-avatar').getByRole('img');
    this.name = this.page
      .locator(
        '[data-testid="user-avatar"] + div div.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw',
      )
      .first(); //нужен id хоть какой-нибуудь((

    this.status = this.page.getByText(
      /Ты молоденький котик|Ты взрослый котик|Ты старый котик/,
    );
    this.toEditProfileButton = this.page.getByTestId(
      'user-edit-profile-button',
    );
    this.editProfileLabel = this.page.getByText('Edit Profile', {
      exact: true,
    });
    this.toLogoutButton = this.page.getByTestId('user-logout-button');
    this.logoutLabel = this.page.getByText('Logout', { exact: true });

    this.galleryImageFirst = this.page
      .getByTestId('gallery-image-0')
      .getByRole('img');
    this.galleryImageSecond = this.page
      .getByTestId('gallery-image-1')
      .getByRole('img');
    this.galleryImageThird = this.page
      .getByTestId('gallery-image-2')
      .getByRole('img');
    this.galleryImageFourth = this.page
      .getByTestId('gallery-image-3')
      .getByRole('img');

    this.postsLabel = this.page.getByText('Постов', { exact: true });
    this.followersLabel = this.page.getByText('Подписчиков', { exact: true });
    this.likesLabel = this.page.getByText('Лайков', { exact: true });

    this.postsCount = this.page.getByText('42', { exact: true });
    this.followersCount = this.page.getByText('567', { exact: true });
    this.likesCount = this.page.getByText('890', { exact: true });
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

import { Page, Locator, expect, test } from '@playwright/test';

export class ShokProfilePage {
  public avatar: Locator;
  public userName: Locator;
  public ageStatusText: Locator;

  public editProfileButton: Locator;
  public editProfileLabel: Locator;
  public logoutButton: Locator;
  public logoutLabel: Locator;

  public galleryImage0: Locator;
  public galleryImage1: Locator;
  public galleryImage2: Locator;
  public galleryImage3: Locator;

  public postsLabel: Locator;
  public followersLabel: Locator;
  public likesLabel: Locator;

  public postsCount: Locator;
  public followersCount: Locator;
  public likesCount: Locator;

  constructor(public readonly page: Page) {
    this.avatar = this.page.getByTestId('user-avatar').getByRole('img');
    this.userName = this.page.locator("//div[@data-testid='user-edit-profile-button']/../div[1]");
    this.ageStatusText = this.page.getByText(/Ты молоденький котик|Ты взрослый котик|Ты старый котик/);
    this.editProfileButton = this.page.getByTestId('user-edit-profile-button');
    this.editProfileLabel = this.page.getByText('Edit Profile', {
      exact: true,
    });
    this.logoutButton = this.page.getByTestId('user-logout-button');
    this.logoutLabel = this.page.getByText('Logout', { exact: true });

    this.galleryImage0 = this.page.getByTestId('gallery-image-0').getByRole('img');
    this.galleryImage1 = this.page.getByTestId('gallery-image-1').getByRole('img');
    this.galleryImage2 = this.page.getByTestId('gallery-image-2').getByRole('img');
    this.galleryImage3 = this.page.getByTestId('gallery-image-3').getByRole('img');

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

  public async clickEditProfileButton() {
    await this.editProfileButton.click();
  }

  public async clickLogoutButton() {
    await this.logoutButton.click();
  }

  public async expectUI() {
    await test.step('Проверить видимость аватара, имени и статуса пользователя', async () => {
      await expect(this.avatar, 'Аватар пользователя должен быть видимым').toBeVisible();
      await expect(this.userName, 'Имя пользователя должно быть видимым').toBeVisible();
      await expect(this.ageStatusText, 'Статус возраста должен быть видимым').toBeVisible();
    });

    await test.step('Проверить видимость кнопок редактирования профиля и выхода и их надписи', async () => {
      await expect(this.editProfileButton, 'Кнопка редактирования профиля должна быть видимой').toBeVisible();
      await expect(this.editProfileLabel, 'Надпись кнопки редактирования должна быть видимой').toBeVisible();
      await expect(this.logoutButton, 'Кнопка выхода должна быть видимой').toBeVisible();
      await expect(this.logoutLabel, 'Надпись кнопки выхода должна быть видимой').toBeVisible();
    });

    await test.step('Проверить видимость изображений галереи', async () => {
      await expect(this.galleryImage0, 'Изображение 0 в галерее должно быть видимым').toBeVisible();
      await expect(this.galleryImage1, 'Изображение 1 в галерее должно быть видимым').toBeVisible();
      await expect(this.galleryImage2, 'Изображение 2 в галерее должно быть видимым').toBeVisible();
      await expect(this.galleryImage3, 'Изображение 3 в галерее должно быть видимым').toBeVisible();
    });

    await test.step('Проверить видимость подписей постов, подписчиков и лайков', async () => {
      await expect(this.postsLabel, 'Подпись постов должна  быть видимым').toBeVisible();
      await expect(this.followersLabel, 'Подпись подписчиков должна  быть видимым').toBeVisible();
      await expect(this.likesLabel, 'Подпись лайков должна  быть видимым').toBeVisible();
    });

    await test.step('Проверить видимость счётчиков постов, подписчиков и лайков', async () => {
      await expect(this.postsCount, 'Счётчик постов должен быть видимым').toBeVisible();
      await expect(this.followersCount, 'Счётчик подписчиков должен быть видимым').toBeVisible();
      await expect(this.likesCount, 'Счётчик лайков должен быть видимым').toBeVisible();
    });
  }
}

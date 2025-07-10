import { Page, Locator } from '@playwright/test';

export class ShokProfilePage {
  public name: Locator;
  public avatar: Locator;
  public status: Locator;
  public toEditButton: Locator;
  public toLogoutButton: Locator;
  public subscribers: Locator;
  public posts: Locator;
  public likes: Locator;
  public photo0: Locator;
  public photo1: Locator;
  public photo2: Locator;
  public photo3: Locator;

  constructor(public readonly page: Page) {
    this.name = this.page.getByText('Neko', { exact: true });
    this.avatar = this.page.getByTestId('user-avatar');
    this.status = this.page.getByText(/Ты (молоденький|взрослый|старый) котик/);
    this.toEditButton = this.page.getByTestId('user-edit-profile-button');
    this.toLogoutButton = this.page.getByTestId('user-logout-button');

    this.posts = this.page.getByText('42Постов');
    this.subscribers = this.page.getByText('567Подписчиков');
    this.likes = this.page.getByText('890Лайков');

    this.photo0 = this.page.getByTestId('gallery-item-0');
    this.photo1 = this.page.getByTestId('gallery-item-1');
    this.photo2 = this.page.getByTestId('gallery-item-2');
    this.photo3 = this.page.getByTestId('gallery-item-3');
  }

  public async open() {
    await this.page.goto('/');
  }
}

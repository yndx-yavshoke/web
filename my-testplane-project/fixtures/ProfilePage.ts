export class ProfilePage {
  constructor(public browser: any) {}

  get userAvatar() {
    return this.browser.$('[data-testid="user-avatar"]');
  }

  get userAvatarImg() {
    return this.browser.$('[data-testid="user-avatar"] img');
  }

  get editButton() {
    return this.browser.$('[data-testid="user-edit-profile-button"]');
  }

  get logoutButton() {
    return this.browser.$('[data-testid="user-logout-button"]');
  }

  get userName() {
    return this.browser.$('.r-1joea0r > .css-146c3p1:nth-of-type(1)');
  }

  get userStatus() {
    return this.browser.$('.r-1joea0r > .css-146c3p1:nth-of-type(2)');
  }

  get statsBlock() {
    return this.browser.$('.r-18u37iz.r-a2tzq0.r-156q2ks.r-15m1z73.r-u9wvl5');
  }

  get statsNumbers() {
    return this.browser.$$('.r-vw2c0b.r-evnaw');
  }

  get galleryItems() {
    return this.browser.$$('[data-testid^="gallery-item-"]');
  }

  async open() {
    await this.browser.url('https://yavshok.ru/');
  }
}

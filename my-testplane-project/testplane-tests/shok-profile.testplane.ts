import { ProfilePage } from '../fixtures/ProfilePage';
import { login } from '../auth/auth';

describe('Профиль пользователя', () => {
  beforeEach(async function () {
    await this.browser.reloadSession();
    await this.browser.url('https://yavshok.ru');
  });

  it('Дефолтное состояние профиля', async function () {
    const page = new ProfilePage(this.browser);
    await login(this.browser, 'cat1@ya.ru', '123456');
    await this.browser.assertView('profile-default', '.r-1joea0r', {
      disableAnimation: true,
      ignoreElements: [
        '.r-1joea0r > .css-146c3p1:nth-of-type(1)', // userName
        '.r-1joea0r > .css-146c3p1:nth-of-type(2)', // userStatus
        '[data-testid="user-avatar"]',
        'img[src*="profile.4c9412d0fd7b6d90111faab09c8f6c4a.gif"]',
      ],
    });
  });

  it('Блок статистики профиля', async function () {
    const page = new ProfilePage(this.browser);
    await login(this.browser, 'cat1@ya.ru', '123456');
    const statsBlock = await page.statsBlock;
    await statsBlock.waitForDisplayed();
    await this.browser.assertView(
      'profile-stats',
      '.r-18u37iz.r-a2tzq0.r-156q2ks.r-15m1z73.r-u9wvl5',
      {
        disableAnimation: true,
        ignoreElements: ['.r-vw2c0b.r-evnaw'],
      },
    );
  });

  it('Кнопка Logout', async function () {
    const page = new ProfilePage(this.browser);
    await login(this.browser, 'cat1@ya.ru', '123456');
    const logoutButton = await page.logoutButton;
    await logoutButton.waitForDisplayed();
    await this.browser.assertView('profile-logout-button', '[data-testid="user-logout-button"]', {
      disableAnimation: true,
    });
  });

  it('Вся страница профиля', async function () {
    const page = new ProfilePage(this.browser);
    await login(this.browser, 'cat1@ya.ru', '123456');
    const userAvatarImg = await page.userAvatarImg;
    await userAvatarImg.waitForDisplayed();
    await this.browser.executeAsync((done) => {
      const img = document.querySelector('[data-testid="user-avatar"] img');
      if (img) {
        (img as HTMLImageElement).onload = () => done();
        img.setAttribute('src', '/assets/assets/images/static-cat.png');
        if ((img as HTMLImageElement).complete) done();
      } else {
        done();
      }
    });
    await this.browser.assertView('profile-full', 'body', {
      disableAnimation: true,
      ignoreElements: [
        '.r-1joea0r > .css-146c3p1:nth-of-type(1)', // userName
        '.r-1joea0r > .css-146c3p1:nth-of-type(2)', // userStatus
        '.r-vw2c0b.r-evnaw', // цифры статистики
        '[data-testid^="gallery-item-"]', // посты
      ],
    });
  });
});

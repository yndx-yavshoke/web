import { login } from './helpers/auth';


describe('Профиль пользователя — визуальные проверки', function () {
  beforeEach(async function () {
    await login(this.browser, 'q@q.q', '123456');
    await this.browser.url('https://yavshok.ru/');
  });

  it('страница пользователя отображается (игнорим гифку)', async function () {
    const avatarSelector = '[data-testid="user-avatar"]';
    const logoutButton = await this.browser.$('[data-testid="user-logout-button"]');
    await logoutButton.waitForDisplayed({ timeout: 5000 });

    await this.browser.assertView('full-page', 'body', {
      ignoreElements: [avatarSelector],
      allowViewportOverflow: true,
      compositeImage: true
    });
  });

  it('отображается кнопка выхода', async function () {
    const logoutSelector = '[data-testid="user-logout-button"]';
    const logoutButton = await this.browser.$(logoutSelector);
    await logoutButton.waitForDisplayed({ timeout: 5000 });

    await this.browser.assertView('logout-button', logoutSelector);
  });

  it('отображаются посты пользователя', async function () {
  const selector = '[data-testid="gallery-item-0"]';
  const post = await this.browser.$(selector);
  await post.waitForDisplayed({ timeout: 5000 });

  await this.browser.assertView('first-user-post', selector, {
    ignoreElements: ['img']
    });
  });
});
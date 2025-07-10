import loginToProfile from '../utils/auth';
import { PROFILE_SELECTORS } from '../utils/selectors';
import { PROFILE_ASSERT_OPTIONS } from '../utils/assertOptions';

describe('Шапка профиля', function () {
  const USER_DATA = {
    name: 'Neko',
    description: 'Ты молоденький котик',
    user: 'user1',
  };

  async function prepareProfile(browser: WebdriverIO.Browser) {
    await browser.$(PROFILE_SELECTORS.AVATAR).waitForExist({ timeout: 10000 });
    await browser.$(PROFILE_SELECTORS.LOGOUT_BUTTON).waitForExist({ timeout: 10000 });
    await browser.$(PROFILE_SELECTORS.STATS).waitForExist({ timeout: 10000 });
    await browser.$(PROFILE_SELECTORS.HEADER).waitForExist({ timeout: 10000 });
  }

  beforeEach(async function () {
    await loginToProfile(this.browser, USER_DATA.user);
    await prepareProfile(this.browser);
  });

  it('Отображение аватара профиля', async function () {
    await this.browser.assertView(
      'profile-avatar-young',
      PROFILE_SELECTORS.AVATAR,
      PROFILE_ASSERT_OPTIONS,
    );
  });

  it('Отображение имени пользователя', async function () {
    const nameSelector = `//*[text()="${USER_DATA.name}"]`;
    await this.browser.assertView('profile-name-young', nameSelector, PROFILE_ASSERT_OPTIONS);
  });

  it('Отображение статуса пользователя', async function () {
    const descriptionSelector = `//*[text()="${USER_DATA.description}"]`;
    await this.browser.assertView(
      'profile-description-young',
      descriptionSelector,
      PROFILE_ASSERT_OPTIONS,
    );
  });

  it('Отображение статистики профиля', async function () {
    await this.browser.assertView(
      'profile-stats-young',
      PROFILE_SELECTORS.STATS,
      PROFILE_ASSERT_OPTIONS,
    );
  });

  it('Отображение кнопки выхода из профиля', async function () {
    await this.browser.assertView(
      'profile-logout-button-young',
      PROFILE_SELECTORS.LOGOUT_BUTTON,
      PROFILE_ASSERT_OPTIONS,
    );
  });

  it('Отображение полной шапки профиля', async function () {
    await this.browser.assertView(
      'profile-header-full-young',
      PROFILE_SELECTORS.HEADER,
      PROFILE_ASSERT_OPTIONS,
    );
  });
});

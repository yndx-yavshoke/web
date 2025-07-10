import loginToProfile from '../utils/auth';
import { COMMON_SELECTORS, EDIT_PROFILE_SELECTORS } from '../utils/selectors';
import { EDIT_PROFILE_ASSERT_OPTIONS } from '../utils/assertOptions';

describe('Страница редактирования профиля', function () {
  async function openEditProfile(browser: WebdriverIO.Browser) {
    await loginToProfile(browser, 'user2');
    await browser.$(EDIT_PROFILE_SELECTORS.EDIT_BUTTON).waitForExist({ timeout: 10000 });
    await browser.$(EDIT_PROFILE_SELECTORS.EDIT_BUTTON).click();
  }

  describe('Дефолтное состояние', function () {
    beforeEach(async function () {
      await openEditProfile(this.browser);
    });

    it('1. Отображение поля для ввода имени', async function () {
      await this.browser.assertView(
        '2.3.1. name-input-default',
        EDIT_PROFILE_SELECTORS.NAME_INPUT,
        EDIT_PROFILE_ASSERT_OPTIONS,
      );
    });

    it('2. Отображение кнопки сохранения изменений', async function () {
      await this.browser.assertView(
        '2.3.2. save-button-default',
        EDIT_PROFILE_SELECTORS.SAVE_BUTTON,
        EDIT_PROFILE_ASSERT_OPTIONS,
      );
    });

    it('3. Отображение кнопки отмены', async function () {
      await this.browser.assertView(
        '2.3.3. cancel-button-default',
        EDIT_PROFILE_SELECTORS.CANCEL_BUTTON,
        EDIT_PROFILE_ASSERT_OPTIONS,
      );
    });
  });
});

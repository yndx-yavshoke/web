import { LOGIN_URL } from '../utils/urls';
import { LOGIN_SELECTORS } from '../utils/selectors';
import { PROFILE_ASSERT_OPTIONS } from '../utils/assertOptions';

describe('Страница входа', function () {
  beforeEach(async function () {
    await this.browser.openAndWait(LOGIN_URL);
    await this.browser.setTimeout({ pageLoad: 30000 });
  });

  describe('1. Дефолтное состояние', function () {
    it('1.1. Страница входа', async function () {
      await this.browser.assertView('login-page-default', 'body', PROFILE_ASSERT_OPTIONS);
    });

    it('1.2. Поле email', async function () {
      await this.browser.assertView(
        'email-input-default',
        LOGIN_SELECTORS.EMAIL_INPUT,
        PROFILE_ASSERT_OPTIONS,
      );
    });

    it('1.3. Поле пароля', async function () {
      await this.browser.assertView(
        'password-input-default',
        LOGIN_SELECTORS.PASSWORD_INPUT,
        PROFILE_ASSERT_OPTIONS,
      );
    });

    it('1.4. Кнопка входа', async function () {
      await this.browser.assertView(
        'submit-button-default',
        LOGIN_SELECTORS.SUBMIT_BUTTON,
        PROFILE_ASSERT_OPTIONS,
      );
    });

    it('1.5. Кнопка "Назад"', async function () {
      await this.browser.assertView(
        'back-button-default',
        LOGIN_SELECTORS.BACK_BUTTON,
        PROFILE_ASSERT_OPTIONS,
      );
    });

    it('1.6. Кнопка регистрации', async function () {
      await this.browser.assertView(
        'register-button-default',
        LOGIN_SELECTORS.REGISTER_BUTTON,
        PROFILE_ASSERT_OPTIONS,
      );
    });
  });

  describe('2. Состояние фокуса', function () {
    it('2.1. Фокус на поле Email', async function () {
      await this.browser.$(LOGIN_SELECTORS.EMAIL_INPUT).click();
      await this.browser.assertView(
        'email-input-focused',
        LOGIN_SELECTORS.EMAIL_INPUT,
        PROFILE_ASSERT_OPTIONS,
      );
    });

    it('2.2. Фокус на поле Пароль', async function () {
      await this.browser.$(LOGIN_SELECTORS.PASSWORD_INPUT).click();
      await this.browser.assertView(
        'password-input-focused',
        LOGIN_SELECTORS.PASSWORD_INPUT,
        PROFILE_ASSERT_OPTIONS,
      );
    });

    it('2.3. Фокус на кнопке входа', async function () {
      await this.browser.$(LOGIN_SELECTORS.SUBMIT_BUTTON).click();
      await this.browser.assertView(
        'submit-button-focused',
        LOGIN_SELECTORS.SUBMIT_BUTTON,
        PROFILE_ASSERT_OPTIONS,
      );
    });
  });

  describe('3. Ошибки входа', function () {
    async function submitLoginForm() {
      await this.browser.$(LOGIN_SELECTORS.SUBMIT_BUTTON).click();
    }

    it('3.1. Пустые поля', async function () {
      await submitLoginForm.call(this);

      await this.browser.$(LOGIN_SELECTORS.EMAIL_ERROR).waitForExist({ timeout: 5000 });
      await this.browser.$(LOGIN_SELECTORS.PASSWORD_ERROR).waitForExist({ timeout: 5000 });

      await this.browser.assertView('empty-fields-error', 'body', PROFILE_ASSERT_OPTIONS);
    });

    it('3.2. Пустой пароль', async function () {
      await this.browser.$(LOGIN_SELECTORS.EMAIL_INPUT).setValue('user@example.com');
      await submitLoginForm.call(this);

      await this.browser.$(LOGIN_SELECTORS.PASSWORD_ERROR).waitForExist({ timeout: 5000 });
      await this.browser.assertView('password-empty-error', 'body', PROFILE_ASSERT_OPTIONS);
    });

    it('3.3. Пустой email', async function () {
      await this.browser.$(LOGIN_SELECTORS.PASSWORD_INPUT).setValue('pass123');
      await submitLoginForm.call(this);

      await this.browser.$(LOGIN_SELECTORS.EMAIL_ERROR).waitForExist({ timeout: 5000 });
      await this.browser.assertView('email-empty-error', 'body', PROFILE_ASSERT_OPTIONS);
    });

    it('3.4. Неверные учетные данные', async function () {
      await this.browser.$(LOGIN_SELECTORS.EMAIL_INPUT).setValue('wrong@example.com');
      await this.browser.$(LOGIN_SELECTORS.PASSWORD_INPUT).setValue('wrongpass');
      await submitLoginForm.call(this);

      await this.browser.$(LOGIN_SELECTORS.GENERAL_ERROR).waitForDisplayed({ timeout: 10000 });
      await this.browser.assertView('invalid-credentials-error', 'body', PROFILE_ASSERT_OPTIONS);
    });
  });
});

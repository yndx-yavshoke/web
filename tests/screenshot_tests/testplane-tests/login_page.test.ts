describe('Страница входа', function () {
  it('дефолтное состояние', async function () {
    await this.browser.url('https://yavshok.ru/login');
    await this.browser.assertView('login-default', 'body');
  });

  it('фокус на поле email', async function () {
    await this.browser.url('https://yavshok.ru/login');

    const emailInput = await this.browser.$('[data-testid="login-email-input"]');
    await emailInput.click();

    await this.browser.assertView('email-focused', 'body');
  });

  it('фокус на поле password', async function () {
    await this.browser.url('https://yavshok.ru/login');

    const passwordInput = await this.browser.$('[data-testid="login-password-input"]');
    await passwordInput.click();

    await this.browser.assertView('password-focused', 'body');
  });

  it('ошибка входа при неправильных данных', async function () {
    await this.browser.url('https://yavshok.ru/login');

    const emailInput = await this.browser.$('[data-testid="login-email-input"]');
    const passwordInput = await this.browser.$('[data-testid="login-password-input"]');
    const submitButton = await this.browser.$('[data-testid="login-submit-button"]');

    await emailInput.setValue('wrong@email.com');
    await passwordInput.setValue('invalidpass');
    await submitButton.click();

    const emailError = await this.browser.$('//div[text()="Введите email"]');
    const passwordError = await this.browser.$('//div[contains(text(), "Введите пароль")]');

    await emailError.waitForDisplayed({ timeout: 5000 }).catch(() => {});
    await passwordError.waitForDisplayed({ timeout: 5000 }).catch(() => {});

    await this.browser.assertView('error-state', 'body');
  });
});
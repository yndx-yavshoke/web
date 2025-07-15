describe('Страница входа', function () {
  it('дефолтное состояние', async function () {
    await this.browser.url('https://yavshok.ru/auth/login');
    await this.browser.assertView('login-default', 'body');
  });

  it('фокус на поле email', async function () {
    await this.browser.url('https://yavshok.ru/auth/login');

    const emailInput = await this.browser.$('input[name="email"]');
    await emailInput.click();

    await this.browser.assertView('login-email-focused', 'body');
  });

  it('ошибка входа при неправильных данных', async function () {
    await this.browser.url('https://yavshok.ru/auth/login');

    const emailInput = await this.browser.$('input[name="email"]');
    const passwordInput = await this.browser.$('input[name="password"]');
    const submitButton = await this.browser.$('button[type="submit"]');

    await emailInput.setValue('wrong@email.com');
    await passwordInput.setValue('invalidpass');
    await submitButton.click();

    const error = await this.browser.$('[class*="error"], [class*="alert"], [data-testid*="error"]');
    await error.waitForDisplayed({ timeout: 5000 });

    await this.browser.assertView('login-error-state', 'body');
  });
});

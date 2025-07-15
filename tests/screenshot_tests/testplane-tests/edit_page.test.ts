import { login } from './helpers/auth';

describe('Редактирование профиля', function () {
  beforeEach(async function () {
    await login(this.browser, 'q@q.q', '123456');
    await this.browser.url('https://yavshok.ru/edit');
  });

  it('форма отображается корректно', async function () {
    const formSelector = '[data-testid="edit-name-input"]';
    const formElement = await this.browser.$(formSelector);
    await formElement.waitForDisplayed({ timeout: 5000 });

    await this.browser.assertView('edit-profile-form', formSelector);
  });

  it('ошибка валидации отображается', async function () {
    const input = await this.browser.$('[data-testid="edit-name-input"]');
    await input.waitForDisplayed({ timeout: 3000 });
    await input.setValue(''); // очистим

    const saveBtn = await this.browser.$('[data-testid="edit-save-button"]');
    await saveBtn.click();

    const errorSelector = '//div[contains(text(), "Name is required")]';
    const error = await this.browser.$(errorSelector);
    await error.waitForDisplayed({ timeout: 3000 });

    await this.browser.assertView('name-required-error', errorSelector, {});
  });

  it('можно ввести имя в поле', async function () {
    const inputSelector = '[data-testid="edit-name-input"]';
    const input = await this.browser.$(inputSelector);
    await input.waitForDisplayed({ timeout: 3000 });

    await input.setValue('TestUser123');

    await this.browser.assertView('edit-name-filled', inputSelector);
  });

  it('фокус в поле ввода имени', async function () {
    const inputSelector = '[data-testid="edit-name-input"]';
    const input = await this.browser.$(inputSelector);
    await input.waitForDisplayed({ timeout: 3000 });

    await input.click();

    await this.browser.assertView('edit-name-focused', inputSelector);
  });
});

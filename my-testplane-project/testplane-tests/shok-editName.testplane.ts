import { EditNamePage } from '../fixtures/EditNamePage';
import { ProfilePage } from '../fixtures/ProfilePage';
import { login } from '../auth/auth';

describe('Страница редактирования имени', () => {
  let page;

  beforeEach(function () {
    page = new EditNamePage(this.browser);
  });

  it('Дефолтное состояние страницы редактирования имени', async function () {
    await page.open();
    await (await page.editProfileTitle).waitForDisplayed();
    await (await page.editNameInput).waitForDisplayed();
    await (await page.editSaveButton).waitForDisplayed();
    await (await page.editCancelButton).waitForDisplayed();

    await this.browser.assertView('edit-name-default', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('Изменение имени пользователя', async function () {
    const page = new EditNamePage(this.browser);
    await login(this.browser, 'cat1@ya.ru', '123456');

    await this.browser.url('https://yavshok.ru/edit');

    await (await page.editNameInput).waitForDisplayed();
    await page.editNameInput.setValue('Мурзик');

    await page.editSaveButton.click();

    await this.browser.url('https://yavshok.ru/');

    const profilePage = new ProfilePage(this.browser);
    await (await profilePage.userName).waitForDisplayed();

    await this.browser.waitUntil(async () => (await profilePage.userName.getText()) === 'Мурзик');
  });
});

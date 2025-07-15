
import { editPageLocators } from '../helpers/locators/editPageLocators';
import { profilePageLocators } from '../helpers/locators/profilePageLocators';
import { editName } from '../helpers/editPageHelpers'
import * as baseHelpers from '../helpers/baseHelpers';
import { urls } from '../helpers/urls';


describe("Страница редактирования профиля: ", function() {
    it('отображается корректно в дефолтном состоянии', async function() {
        await this.browser.url(urls.edit);

        await this.browser.assertView('edit-default', 'body');
    });
    
    it('отображается корректно в фокусе на поле имени', async function() {
        await this.browser.url(urls.edit);

        await baseHelpers.checkElement(this.browser, editPageLocators.nameInput, 5000);
        await baseHelpers.click(this.browser, editPageLocators.nameInput);

        await this.browser.assertView('edit-name-input-focused', editPageLocators.nameInput);
    });
    
    it('отображается кнопка "Save Changes"', async function() {
        await this.browser.url(urls.edit);

        await baseHelpers.checkElement(this.browser, editPageLocators.saveChangesButton, 5000);

        await this.browser.assertView('edit-button-save', editPageLocators.saveChangesButton);
    });
    
    it('отображается кнопка "Cancel"', async function() {
        await this.browser.url(urls.edit);

        await baseHelpers.checkElement(this.browser, editPageLocators.cancelButton, 5000);

        await this.browser.assertView('edit-cancel-button', editPageLocators.cancelButton);
    });
    
    it('отображается ошибка при попытке изменить имя на пробел', async function() {
        const newName = ' ';

        await this.browser.url(urls.edit);

        await editName(this.browser, newName, false);

        await this.browser.pause(2000);
        await this.browser.assertView('edit-name-error', editPageLocators.container);
    });

    it('отображается корректно в фокусе на поле имени при ошибке', async function() {
        const newName = ' ';

        await this.browser.url(urls.edit);

        await editName(this.browser, newName, false); // cancel=false

        await this.browser.pause(2000);
        await this.browser.assertView('edit-name-input-focused-error', editPageLocators.nameInput);
    });
    
    it('отрабатывается корректный переход на страницу профиля при отмене редактирования имени', async function() {
        const newName = 'new name';

        await this.browser.url(urls.edit);

        await editName(this.browser, newName, true); // cancel=true

        // проверяем, что произошел возврат на страницу профиля
        await this.browser.waitUntil(async () => {
            const currentUrl = await this.browser.getUrl();
            return currentUrl.includes(urls.profile);
        }, { timeout: 5000 });

        await this.browser.assertView('edit-cancel-profile-redirect', profilePageLocators.containerWithName);
    });
});
import { browserWaitLoadingByMessage, loginUser, logoutUser } from "./utils";

// Тексты ошибок
const textLongName = "Name must be less than 50 characters";
const textSpaceName = "Please check your input and try again";

// Селекторы
const editHeaderSelector = "/html/body/div[1]/div/div/div[2]/div/div/div/div/div/div/div[1]";
const nameHeaderSelector = '//div[contains(text(), "Name")]';
const nameInputSelector = '[data-testid="edit-name-input"]';
const saveButtonSelector = '[data-testid="edit-save-button"]';
const cancelButtonSelector = '[data-testid="edit-cancel-button"]';
const editButtonSelector = '[data-testid="user-edit-profile-button"]';

// View-названия
const editHeaderView = "edit-header";
const editNameHeaderView = "edit-name-header";
const editNameInputView = "edit-name-input";
const editNameFocusedView = "edit-name-focused";
const editSaveButtonView = "edit-save-button";
const editCancelButtonView = "edit-cancel-button";
const editLongNameErrorView = "edit-long-name-error";
const editSpaceNameErrorView = "edit-space-name-error";


describe("Страница редактирвоания профиля", () => {
    beforeEach(async function () {
        await loginUser(this.browser);
        await this.browser.url("");
        const editButton = await this.browser.$(editButtonSelector);
        editButton.click();
        const name = await this.browser.$(nameInputSelector);
        await name.waitForDisplayed({ timeout: 3000 }); 
    });

    afterEach(async function () {
        const cancelButton = await this.browser.$(cancelButtonSelector);
        cancelButton.click();
        await logoutUser(this.browser);
    });

    it("Заголовок страницы", async ({ browser }) => {
        await browser.assertView(editHeaderView, editHeaderSelector);
    });

    it("Заголовок поля ввода имени", async ({ browser }) => {
        await browser.assertView(editNameHeaderView, nameHeaderSelector);
    });

    it("Поле ввода имени", async ({ browser }) => {
        const name = await browser.$(nameInputSelector);
        await name.setValue("");
        const nameHeader = await browser.$(nameHeaderSelector);
        await nameHeader.click();
        await browser.assertView(editNameInputView, nameInputSelector);
    });

    it("Сфокусированное поле ввода имени", async ({ browser }) => {
        const name = await browser.$(nameInputSelector);
        await name.setValue("");
        await name.click();
        await browser.assertView(editNameFocusedView, nameInputSelector);
    });

    it("Кнопка сохранения", async ({ browser }) => {
        await browser.assertView(editSaveButtonView, saveButtonSelector);
    });

    it("Кнопка отмены", async ({ browser }) => {
        await browser.assertView(editCancelButtonView, cancelButtonSelector);
    });

    // Длинное имя
    it(`Отображение сообщения: ${textLongName}`, async ({ browser }) => {
        const name = await browser.$(nameInputSelector);
        await name.setValue("123456789012345678901234567890123456789012345678901");
        const saveButton = await browser.$(saveButtonSelector);
        saveButton.click();
        await browserWaitLoadingByMessage(browser, textLongName);
        await browser.assertView(editLongNameErrorView, `//div[contains(text(), "${textLongName}")]`);
    });

    // Имя из пробелов
    it(`Отображение сообщения: ${textSpaceName}`, async ({ browser }) => {
        const name = await browser.$(nameInputSelector);
        await name.setValue(" ");
        const saveButton = await browser.$(saveButtonSelector);
        saveButton.click();
        await browserWaitLoadingByMessage(browser, textSpaceName);
        await browser.assertView(editSpaceNameErrorView, `//div[contains(text(), "${textSpaceName}")]`);
    });
});

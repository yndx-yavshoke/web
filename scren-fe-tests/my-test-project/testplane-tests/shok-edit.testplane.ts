import { URLS, SELECTORS, VALID_USER, VALID_NAME }  from "../../const/testConst"

describe("Тесты на странице изменения пользователя", () => {
    beforeEach(async ({ browser }) => {
        await browser.openAndWait(URLS.loginURL);
        await (await browser.$(SELECTORS.login_page.login_email_input)).setValue(VALID_USER.email)
        await (await browser.$(SELECTORS.login_page.login_password_input)).setValue(VALID_USER.password)
        await (await browser.$(SELECTORS.login_page.login_submit_button)).click()
        await browser.pause(2000);
        await browser.openAndWait(URLS.editURL);
    })

    it("Дефолтный скрин изменения данных пользователя", async ({browser}) => {
        await browser.assertView("default-edit-page", "body");
    })

    it("Фокусировка на поле ввода имени", async ({browser}) => {
        (await browser.$(SELECTORS.edit_page.edit_input_email)).click();
        await browser.assertView("input_email_editpage", SELECTORS.edit_page.edit_input_email);
    })

    it("Изменяем имя на странице изменений и сверяем с профилем", async ({browser}) => {
        await browser.openAndWait(URLS.editURL);
        (await browser.$(SELECTORS.edit_page.edit_input_email)).setValue(VALID_NAME.newName);
        (await browser.$(SELECTORS.edit_page.edit_save_button)).click();
        await browser.assertView("input_email_editpage_with_name", SELECTORS.edit_page.edit_input_email);
        (await browser.$(SELECTORS.edit_page.edit_cancel_button)).click();
        await browser.assertView("default_user_page", SELECTORS.user_page.new_name, {
            disableAnimation: true, 
            tolerance: 15, 
            antialiasingTolerance: 10, 
            ignoreElements: [
            '.animated-element',
            '[src*=".gif"]',
            '[class*="animation"]'
        ]})
        await browser.openAndWait(URLS.editURL);
        (await browser.$(SELECTORS.edit_page.edit_input_email)).setValue(VALID_NAME.serg);
        (await browser.$(SELECTORS.edit_page.edit_save_button)).click();
        (await browser.$(SELECTORS.edit_page.edit_cancel_button)).click();
        (await browser.$(SELECTORS.user_page.user_logout_button)).click();
    })
})
import { URLS, SELECTORS, VALID_USER, TIMEOUT }  from "../../const/testConst"
import { faker } from "@faker-js/faker"

describe("Тесты страницы логирования", () => {

    beforeEach(async ({ browser }) => {
        await browser.openAndWait(URLS.loginURL);
        await (await browser.$(SELECTORS.login_page.title_login_page)).waitForExist({timeout : 5000});
    })
    it("Получение дефолтной страницы логирования", async({browser}) => {
        await browser.assertView("default-login-page", "body");
    })
    it("Попытка входа с пустыми полями", async ({browser}) => {
        (await browser.$(SELECTORS.login_page.login_submit_button)).click();
        await browser.assertView("empty_email_login", SELECTORS.login_page.login_email_input);
        await browser.assertView("empty_email_error_login", SELECTORS.login_page.login_empty_email);
        await browser.assertView("empty_password_login", SELECTORS.login_page.login_password_input);
        await browser.assertView("empty_password_error_login", SELECTORS.login_page.login_empty_password);
    })
    it("Попытка входа без пароля", async ({browser}) => {
        (await browser.$(SELECTORS.login_page.login_email_input)).setValue(faker.internet.email());
        await browser.keys(['Tab']);
        await browser.pause(TIMEOUT.min);
        (await browser.$(SELECTORS.login_page.login_submit_button)).click();
        await browser.assertView("login_page_error_password", SELECTORS.login_page.login_empty_password)
    })
    it("Попытка входа без email", async ({browser}) => {
        await browser.$(SELECTORS.login_page.login_password_input).setValue(faker.internet.password());
        await browser.$(SELECTORS.login_page.login_submit_button).click();
        await browser.assertView("login_page_error_password", {ignoreElements : SELECTORS.login_page.login_password_input})
    })
    it("Попытка ввода невалидных значений в поля email и password", async ({browser}) => {
        await browser.$(SELECTORS.login_page.login_email_input).setValue(faker.string.sample(6));
        await browser.keys(['Tab']);
        (await browser.$(SELECTORS.login_page.login_password_input)).setValue(faker.string.sample(6));
        await browser.keys(['Tab']);
        await browser.pause(TIMEOUT.min);
        (await browser.$(SELECTORS.login_page.login_submit_button)).click();
        await browser.assertView("error_input_login", SELECTORS.login_page.login_error_input);
    })
})
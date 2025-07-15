import { URLS, SELECTORS, VALID_USER, TIMEOUT }  from "../../const/testConst"
import { faker } from "@faker-js/faker"

describe("Тесты страницы регистрации", () => {
        beforeEach(async ({ browser }) => {
        await browser.openAndWait(URLS.registerURL);
        await (await browser.$(SELECTORS.register_page.title_register_page)).waitForExist({timeout : 5000});
    })

    it("Получение дефолтной страницы регистрации", async({browser}) => {
        await browser.assertView("default-login-page", "body");
    })
    it("Получени ошибок с пустыми полями ввода", async({browser}) => {
        (await browser.$(SELECTORS.register_page.register_submit_button)).click()
        await browser.assertView("empty_email_error_register", SELECTORS.register_page.register_empty_email);
        await browser.assertView("empty_password_error_register", SELECTORS.register_page.register_empty_password);
        await browser.assertView("empty_age_error_register", SELECTORS.register_page.register_empty_age);
    })
    it("Регистрация с неверным email", async({browser}) => {
        const brokenEmail = faker.internet
        .email()
        .replace('@', '_')
        .replace('.', '');
        const password = faker.internet.password();
        const age = faker.number.int({min: 0, max: 100});
        (await browser.$(SELECTORS.register_page.register_email_input)).setValue(brokenEmail);
        (await browser.$(SELECTORS.register_page.register_password_input)).setValue(password);
        (await browser.$(SELECTORS.register_page.register_age_input)).setValue(age);
        (await browser.$(SELECTORS.register_page.register_submit_button)).click()
        await browser.assertView("error_email_register", SELECTORS.register_page.register_error_email);
    })
    it("Регистрация с неверной длиной пароля (<6 символов)", async({browser}) => {
        const email = faker.internet.email();
        const password = faker.internet.password({length: 5});
        const age = faker.number.int({min: 0, max: 100});
        (await browser.$(SELECTORS.register_page.register_email_input)).setValue(email);
        (await browser.$(SELECTORS.register_page.register_password_input)).setValue(password);
        (await browser.$(SELECTORS.register_page.register_age_input)).setValue(age);
        (await browser.$(SELECTORS.register_page.register_submit_button)).click()
        await browser.assertView("error_minlen_password_register", SELECTORS.register_page.register_error_minlen_password);
    })
    it("Регистрация с отрицательным возрастом", async({browser}) => {
        const email = faker.internet.email();
        const password = faker.internet.password({length: 7});
        const age = faker.number.int({min: -100, max: -1});
        (await browser.$(SELECTORS.register_page.register_email_input)).setValue(email);
        (await browser.$(SELECTORS.register_page.register_password_input)).setValue(password);
        (await browser.$(SELECTORS.register_page.register_age_input)).setValue(age);
        (await browser.$(SELECTORS.register_page.register_submit_button)).click()
        await browser.assertView("error_age_register", SELECTORS.register_page.register_error_age);
    })
    it("Регистрация с существующим пользователм", async({browser}) => {
        const age = faker.number.int({min: 0, max: 100});
        (await browser.$(SELECTORS.register_page.register_email_input)).setValue(VALID_USER.email);
        (await browser.$(SELECTORS.register_page.register_password_input)).setValue(VALID_USER.password);
        (await browser.$(SELECTORS.register_page.register_age_input)).setValue(age);
        await browser.pause(TIMEOUT.min);
        (await browser.$(SELECTORS.register_page.register_submit_button)).click()
        await browser.$(SELECTORS.register_page.register_email_using)
        await browser.assertView("error_email_using_register", SELECTORS.register_page.register_email_using)
    })
})
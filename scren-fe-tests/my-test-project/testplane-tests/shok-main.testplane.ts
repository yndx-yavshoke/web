import { URLS, SELECTORS, VALID_USER }  from "../../const/testConst"
import { faker } from "@faker-js/faker"

describe("Тесты стартовой страницы", () => {

    beforeEach(async ({ browser }) => {
        await browser.openAndWait(URLS.homeURL);
        await (await browser.$(SELECTORS.main_page.main_email_input)).waitForExist({timeout : 5000});
    })
    
    it("Проверка исходного скриншота стартовой страницы", async ({ browser }) => {
        await browser.assertView("default-start-page", "body");
    })

    it("Фокусировка на поле ввода email стартовой страницы", async ({browser}) => {
        const email = await browser.$(SELECTORS.main_page.main_email_input);
        await email.click();
        await browser.assertView("login-input-focus-startpage", SELECTORS.main_page.main_email_input);
    })

    it.skip("Фокусировка на кнопке проверки на шоковость при не введенном email или не верном email", async ({browser}) => {
        await browser.assertView(
            "main-check-button-focus-startpage", 
            SELECTORS.main_page.main_check_button, 
            {ignoreElements: SELECTORS.main_page.main_email_input, tolerance: 5});
        await browser.$(SELECTORS.main_page.main_email_input).setValue("12346");
        await browser.keys(['Tab']);
        await browser.assertView(
            "main-check-button-after-invalid-email",
            SELECTORS.main_page.main_check_button,
            {ignoreElements: SELECTORS.main_page.main_email_input, tolerance: 5});
    })

    it("Фокусировка на кнопке проверки шоковости при введенном email", async ({ browser }) => {
        const inputEmail = await browser.$(SELECTORS.main_page.main_email_input);
        await inputEmail.setValue(VALID_USER.email);
        await browser.keys(['Tab']);
        await browser.assertView("main-check-button-true", SELECTORS.main_page.main_check_button)
    })

    it.skip("Успешная проверка email на шоковость", async ({ browser }) => {
        (await browser.$(SELECTORS.main_page.main_email_input)).setValue(VALID_USER.email);
        await browser.keys(['Tab']);
        (await browser.$(SELECTORS.main_page.main_check_button)).click();
        await browser.assertView("exist-text-main", SELECTORS.main_page.exist_main_text_true,
            {ignoreElements: SELECTORS.main_page.gif_main_happy_cat, tolerance: 10, antialiasingTolerance: 3}
        )
    })

    it("Отрицательная проверка email на шоковость", async ({browser}) => {
        (await browser.$(SELECTORS.main_page.main_email_input)).setValue(faker.internet.email());
        await browser.keys(['Tab']);
        (await browser.$(SELECTORS.main_page.main_check_button)).click();
        await browser.assertView("exist-text-main", SELECTORS.main_page.exist_main_text_false,
            {ignoreElements: SELECTORS.main_page.gif_main_happy_cat, tolerance: 15, antialiasingTolerance: 10}
        )
    })

    it("Переход на странице логирования из стартовой страницы", async({browser}) => {
        (await browser.$(SELECTORS.main_page.main_login_button)).click();
        await browser.assertView("default-login-page", "body");
    })
})

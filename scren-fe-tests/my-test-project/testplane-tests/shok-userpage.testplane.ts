import { URLS, SELECTORS, VALID_USER, TIMEOUT }  from "../../const/testConst"

describe("Тесты страницы пользователя", () => {
    beforeEach(async ({ browser }) => {
        await browser.openAndWait(URLS.loginURL);
        await (await browser.$(SELECTORS.login_page.login_email_input)).setValue(VALID_USER.email)
        await (await browser.$(SELECTORS.login_page.login_password_input)).setValue(VALID_USER.password)
        await (await browser.$(SELECTORS.login_page.login_submit_button)).click()
        await browser.pause(2000);
    })

    it("Делаем скрин страницы user", async ({browser}) => {
        await browser.assertView("default_user_page", {
            disableAnimation: true, 
            tolerance: 15, 
            antialiasingTolerance: 10, 
            ignoreElements: [
            '.animated-element',
            '[src*=".gif"]',
            '[class*="animation"]'
        ]})
    })

    it("Фокусировка на кнопке изменения пользователя", async ({browser}) => {
        await browser.assertView("edit_user_button", SELECTORS.user_page.user_edit_button);
    })

    it("Фокусировка на кнопке выхода из аккаунта", async ({browser}) => {
        await browser.assertView("logout_button", SELECTORS.user_page.user_logout_button);
    })

    it("Фокусировка и стабилизаци gif Автара", async ({browser}) => {
        await browser.assertView(
            "avatar_user", 
            SELECTORS.user_page.gif_user_avatar, 
            {disableAnimation: true, tolerance: 30, antialiasingTolerance: 20}
        )
        await browser.pause(TIMEOUT.min);
    })


})
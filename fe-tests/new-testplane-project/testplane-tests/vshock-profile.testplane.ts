describe("Страница профиля", () => {
    beforeEach(async function () {
        await this.browser.openAndWait('https://yavshok.ru/login');
        
        const emailInput = await this.browser.$('[data-testid="login-email-input"]');
        await emailInput.setValue('a@ya.ru');

        const passwordInput = await this.browser.$('[data-testid="login-password-input"]');
        await passwordInput.setValue('123456');

        const loginButton = await this.browser.$('[data-testid="login-submit-button"]');
        await loginButton.click();
    });


    it("Открывается и корректно отображается страница профиля", async ({browser}) => {
          const elementsToIgnore = [
            '//*[@data-testid = "user-avatar"]',
            '//*[@data-testid = "gallery-image-0"]',
            '//*[@data-testid = "gallery-image-1"]',
            '//*[@data-testid = "gallery-image-2"]',
            '//*[@data-testid = "gallery-image-3"]'
          ]; // игнорируем аватарку (ибо гифка) и галерею (на будущее, когда будет меняться; еще надо бы число постов, лайков и подписчиков, но не смогла их выдернуть)

        await browser.assertView("login-default", 'body', {ignoreElements: elementsToIgnore});
    });

    it("Открывается и корректно отображается страница смены имени", async ({browser}) => {
        const changeNameButton = (await browser.$('[data-testid="user-edit-profile-button"]'))
        await changeNameButton.click();

        await browser.assertView("change-name-default", 'body', {ignoreElements: ['//*[@data-testid="edit-name-input"]']});
    });

//     it("Корректно отображается фокус на поле ввода пароля", async ({browser}) => {
//         browser.openAndWait("https://yavshok.ru/login");
//         const passwordInput = (await browser.$('[data-testid="login-password-input"]'));
//         await passwordInput.click();

//         await browser.assertView("login-default", 'body');
//     });

//     it("Корректно отображается ошибка входа", async ({browser}) => {
//         browser.openAndWait("https://yavshok.ru/login");
//         const emailInput = (await browser.$('[data-testid="login-email-input"]'));
//         await emailInput.setValue('a@ya.ru');

//         const passwordInput = (await browser.$('[data-testid="login-password-input"]'));
//         await passwordInput.setValue('12345');

//         const loginButton = (await browser.$('[data-testid="login-submit-button"]'));
//         await loginButton.click();

//         await browser.assertView("login-default", 'body');
//     });
});
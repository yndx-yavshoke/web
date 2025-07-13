describe("Страница логина: Появляются поля подсказки при попытке логина с пустыми полями ввода", () => {
    it("Открываем https://yavshok.ru/login и проверяем поля подсказки", async ({browser}) => {
        await browser.openAndWait("/login");
        (await browser.$('[data-testid = "login-submit-button"]')).click()
        await browser.assertView('login-mail-exeption', '//div[contains(text(), "Введите email")]')
        await browser.assertView('login-password-exeption', '//div[contains(text(), "Введите пароль")]')
    })
});

describe("Страница логина: Появляются полe Введите пароль при попытке логина с пустым полем ввода пароль", () => {
    it("Открываем https://yavshok.ru/login и проверяем поле подсказки", async ({browser}) => {
        await browser.openAndWait("/login");
        (await browser.$('[data-testid = "login-email-input"]')).setValue("someEmail@mail.mail");
        (await browser.$('[data-testid = "login-submit-button"]')).click();
        await browser.assertView('login-mail-exeption', '//div[contains(text(), "Введите пароль")]')
    })
});


describe("Страница логина: Появляются полe Введите email при попытке логина с пустым полем ввода email", () => {
    it("Открываем https://yavshok.ru/login и проверяем поле подсказки", async ({browser}) => {
        await browser.openAndWait("/login");
        (await browser.$('[data-testid = "login-password-input"]')).setValue("123456");
        (await browser.$('[data-testid = "login-submit-button"]')).click();
        await browser.assertView('login-mail-exeption', '//div[contains(text(), "Введите email")]')
    })
});


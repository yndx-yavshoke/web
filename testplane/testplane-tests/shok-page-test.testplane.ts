describe("Начальная страница: Кнопка В шок", () => {
    it("Открываем https://yavshok.ru/ проверяем кнопку В шок", async ({browser}) => {
        await browser.openAndWait("/");
        await browser.assertView('shok-login', '[data-testid = "main-login-button"]')
    })
});

describe("Начальная страница: Кнопка Я в ШОКе? при пустом поле ввода email", () => {
    it("Открываем https://yavshok.ru/ и проверяем кнопку Я в ШОКе? на нужный цвет", async ({browser}) => {
        await browser.openAndWait("/");
        await expect((await browser.$('[data-testid = "main-email-input"]')).getText()).not.toHaveText;
        await browser.assertView('shok-chek-empty', '[data-testid = "main-check-button"]')
    })
});

describe("Начальная страница: Кнопка Я в ШОКе? при заполненом поле ввода email", () => {
    it("Открываем https://yavshok.ru/ и проверяем кнопку Я в ШОКе? на нужный цвет", async ({browser}) => {
        await browser.openAndWait("/");
        await expect((await browser.$('[data-testid = "main-email-input"]')).setValue("SomeMail"));
        await browser.assertView('shok-chek-empty', '[data-testid = "main-check-button"]')
    })
});


describe("Начальная страница: Появляется надпись Ты ещё не в ШОКе, при проверке на шок с несуществующим пользователем", () => {
    it("Открываем https://yavshok.ru/ ,вводим значение в поле ввода, жмём кнопку В ШОК и проверяем поле", async ({browser}) => {
        await browser.openAndWait("/");
        await expect((await browser.$('[data-testid = "main-email-input"]')).setValue("SomeMail"));
        (await browser.$('[data-testid = "main-check-button"]')).click()
        await browser.assertView('shok-not-succes', '//div[contains(text(), "Ты еще не в ШОКе")]')
    })
});

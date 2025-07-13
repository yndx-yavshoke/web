import { loginShock } from "./data";
describe("Страница Профиля: Отоброжается кнопка выхода", async () => {
    it("Открываем https://yavshok.ru/ и проверяем кнопку logout", async ({browser}) => {
        await loginShock(browser)
        await browser.assertView("profile-logout",'[ data-testid="user-logout-button" ]')
    })
});

describe("Страница Профиля: Отоброжается кнопка Edit Profile", async () => {
    it("Открываем https://yavshok.ru/ и проверяем кнопку edit profile", async ({browser}) => {
        await loginShock(browser)
        await browser.assertView("profile-edit",'[ data-testid="user-edit-profile-button" ]')
    })
});


describe("Страница Профиля: Отоброжается гифка", async () => {
    it("Открываем https://yavshok.ru/ проверяем аватарку пользователя в статичном состоянии", async ({browser}) => {
        await loginShock(browser)
        await browser.$(('//div[@data-testid="user-avatar"]//img')).assertView("profile-edit", {disableAnimation: false});
    })
})
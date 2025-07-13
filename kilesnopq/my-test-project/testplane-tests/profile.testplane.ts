describe("Страница профиля — шапка", () => {
    beforeEach(async ({ browser }) => {
        await browser.url("https://yavshok.ru/login");
        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await emailInput.setValue("e.sheluddd@gmail.com");
        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        await passwordInput.setValue("123123");
        const shockButton = await browser.$('[data-testid="login-submit-button"]');
        await shockButton.click();
        await browser.$('img[src*="cat"], img[alt], .r-1awozwy.r-18u37iz img').waitForDisplayed({ timeout: 5000 });
    });

    it("Аватар отображается", async ({ browser }) => {
        const avatar = await browser.$('img[src*="cat"], img[alt], .r-1awozwy.r-18u37iz img');
        await expect(avatar).toBeDisplayed();
    });

    it("Имя пользователя отображается", async ({ browser }) => {
        const username = await browser.$('h2, [class*="css-146c3p1"]');
        await expect(username).toHaveText("укцкцук");
    });

    it("Статус пользователя отображается", async ({ browser }) => {
        const status = await browser.$('div.css-146c3p1.r-1khnkhu.r-15d164r.r-ubezar');
        await expect(status).toHaveText("Ты старый котик");
    });

    it("Счетчики постов, подписчиков и лайков отображаются", async ({ browser }) => {
        const countersBlock = await browser.$('div.css-175oi2r.r-18u37iz.r-a2tzq0.r-156q2ks.r-15m1z73.r-u9wvl5');
        const counterItems = await countersBlock.$$('div.css-175oi2r.r-1awozwy.r-lcslpx');

        const postsBlock = counterItems[0];
        const followersBlock = counterItems[1];
        const likesBlock = counterItems[2];

        const postsValue = await postsBlock.$('div.css-146c3p1.r-vw2c0b.r-evnaw');
        const postsLabel = await postsBlock.$('div.css-146c3p1.r-djgu52.r-ubezar');
        await expect(postsValue).toHaveText("42");
        await expect(postsLabel).toHaveText("Постов");

        const followersValue = await followersBlock.$('div.css-146c3p1.r-vw2c0b.r-evnaw');
        const followersLabel = await followersBlock.$('div.css-146c3p1.r-djgu52.r-ubezar');
        await expect(followersValue).toHaveText("567");
        await expect(followersLabel).toHaveText("Подписчиков");

        const likesValue = await likesBlock.$('div.css-146c3p1.r-vw2c0b.r-evnaw');
        const likesLabel = await likesBlock.$('div.css-146c3p1.r-djgu52.r-ubezar');
        await expect(likesValue).toHaveText("890");
        await expect(likesLabel).toHaveText("Лайков");
    });

    it("Кнопка Logout отображается", async ({ browser }) => {
        const logout = await browser.$('[data-testid="user-logout-button"]');
        await expect(logout).toBeDisplayed();
    });
}); 
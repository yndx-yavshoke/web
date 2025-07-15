
// describe("test", () => {
//     it("example", async ({browser}) => {
//         await browser.url("https://github.com/gemini-testing/testplane");

//         await expect(browser.$(".f4.my-3")).toHaveText("Testplane (ex-hermione) browser test runner based on mocha and wdio");
//     });
// });

describe("Страница входа yavshok.ru", () => {
  it("Проверка страницы входа: дефолтное состояние,фокус,ошибка входа", async ({ browser }) => {
    // 1. Дефолтное состояние
    await browser.url("https://yavshok.ru/login");
   
    await browser.assertView("login_default", "body");

    // 2. Проверка фокуса на email
    const emailInput = await browser.$('[data-testid="login-email-input"]');
    await emailInput.waitForDisplayed();
    await emailInput.click();
    await browser.pause(300);
    await browser.assertView("login_focus_email", '[data-testid="login-email-input"]');

    // 3. Проверка фокуса на password
    const passwordInput = await browser.$('[data-testid="login-password-input"]');
    await passwordInput.waitForDisplayed();
    await passwordInput.click();
    await browser.pause(300);
    await browser.assertView("login_focus_password", '[data-testid="login-password-input"]');

    //4. Проверка на некорректный ввод данных
    await browser.$('[data-testid="login-email-input"]').setValue("invalid@test.com");
    await browser.$('[data-testid="login-password-input"]').setValue("wrongpass");
    await browser.$('[data-testid="login-submit-button"]').click();
    const errorSelector = '.css-146c3p1.r-howw7u.r-1enofrn.r-15d164r';
    const errorMessage = await browser.$(errorSelector);
    
    await errorMessage.waitForDisplayed({ timeout: 5000 });
    await expect(errorMessage).toHaveText("Неправильный логин или пароль");
    await browser.assertView("email_error_style", '[data-testid="login-email-input"]');
    await browser.assertView("password_error_style",'[data-testid="login-password-input"]');
  });
});
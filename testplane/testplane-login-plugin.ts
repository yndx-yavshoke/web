module.exports = ( browser ) => {
    browser.addCommand('loginShok', async () => {
        browser.openAndWait("/login");
        (await browser.$('[data-testid = "login-email-input"]')).setValue("test@mail.ru");
        (await browser.$('[data-testid = "login-password-input"]')).setValue("123456");
    });
}
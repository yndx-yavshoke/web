import { test, expect } from './fixtures/test-data.fixture';
import { LoginPage } from './pages/auth.page.extend';

test.describe('Тесты страницы Авторизации', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }, testInfo) => {
    loginPage = new LoginPage(page);
    await loginPage .open('/login');
    
    
  });

  test('Проверка наличия поля для ввода почты', async () => {
    expect(loginPage.checkLoginEmail)
  });

  test('Проверка наличия поля для ввода пароля', async () => {
    expect(loginPage.checkLoginPassword);
  });

  test('Проверка наличия кнопки в Шок', async () => {
    loginPage.checkSubmitButton;
  });

  test('Проверка наличия кнопки назад', async () => {
   loginPage.checkBackButton;
  });

  test('Проверка наличия кнопки Регистрация', async ({}) => {
  loginPage.checkLoginRegistrButton;
  });
  test ("тест на возраст для залогинненого молоденького котика",async({page,loginUsers})=>{
        await page.getByTestId("login-email-input").fill(loginUsers.young_users.email);
        await page.getByTestId("login-password-input").fill(loginUsers.young_users.password);
        await page.getByTestId("login-submit-button").click();
        await expect(page.getByText('Ты молоденький котик')).toBeVisible();
        await page.context().storageState({path: "./tests/auth-module/userInfo.json"});
})
test ("тест на возраст для залогинненого  старого котика",async({page,loginUsers})=>{
        await page.getByTestId("login-email-input").fill(loginUsers.old_users.email);
        await page.getByTestId("login-password-input").fill(loginUsers.old_users.password);
        await page.getByTestId("login-submit-button").click();
        await expect (page.getByText('Edit Profile')).toBeVisible();
        await expect(page.getByText('Ты старый котик')).toBeVisible();
    }
);
test ("тест на возраст для залогинненого авторизация взрослого котика",async({page,loginUsers})=>{
        await page.getByTestId("login-email-input").fill(loginUsers.adult_users.email);
        await page.getByTestId("login-password-input").fill(loginUsers.adult_users.password);
        await page.getByTestId("login-submit-button").click();
        await expect(page.getByTestId("user-logout-button")).toBeVisible();
});

});
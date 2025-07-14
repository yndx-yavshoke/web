import { test, expect } from '../fixtures/index';
import { generateRandomEmail } from '../utils/dataGenerator';
import { defaultUser } from '../utils/client';


test.describe('Главная страница — проверка email', () => {


  test('Пользователь уже в ШОКе', async ({ mainPage }) => {
    await test.step('Ввод email зарегистрированного пользователя', async () => {
      await mainPage.open();
      await mainPage.fillEmail(defaultUser.email);
      await mainPage.checkEmail();
      await expect(mainPage.successGIF).toBeVisible();
      await mainPage.expectShockStatus('in');
    });
  });  

  test('Пользователь не в ШОКе', async ({ mainPage }) => {
    await test.step('Ввод email несуществующего пользователя', async () => {
      await mainPage.open();
      await mainPage.fillEmail(generateRandomEmail());
      await mainPage.checkEmail();
      await mainPage.expectShockStatus('out');
    });
  });  


  test('Переход к авторизации по кнопке "В ШОК"', async ({ mainPage }) => {
    await test.step('Нажать кнопку входа и проверить переход', async () => {
      await mainPage.open();
      await mainPage.proceedToLogin();
      await expect(mainPage.page).toHaveURL(/login/);
    });
  });  
});

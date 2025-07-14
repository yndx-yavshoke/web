import { test, expect } from '../fixtures/index';
import { EXPERIMENTS_API, mockYoung, mockAdult, mockOld } from './mock';


test.use({ storageState: 'tests/auth/storageState.json' });
test.describe('Профиль', () => {

  test('Молоденький котик', async ({ page, profilePage }) => {
    await test.step('Подменить API и проверить статус Молоденький котик', async () => {
      await page.route(EXPERIMENTS_API, (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockYoung),
        })
      );

      await profilePage.open();
      await expect(profilePage.userStatusYoung).toHaveText('Ты молоденький котик');
    });
  });

  // test('Взрослый котик', async ({ page, profilePage }) => {
  //   await test.step('Подменить API и проверить статус Взрослый котик', async () => {
  //     await page.route(EXPERIMENTS_API, (route) =>
  //       route.fulfill({ 
  //         status: 200, 
  //         contentType: 'application/json', 
  //         body: JSON.stringify(mockAdult) })
  //     );
  //     await profilePage.open();
  //     await expect(profilePage.userStatusAdult).toHaveText('Ты взрослый котик');
  //   });
  // });

  test('Старый котик', async ({ page, profilePage }) => {
    await test.step('Подменить API и проверить статус Старый котик', async () => {
      await page.route(EXPERIMENTS_API, (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockOld),
        })
      );
      await profilePage.open();
      await expect(profilePage.userStatusOld).toHaveText('Ты старый котик');
    });
  });  

  test('Выход из профиля', async ({ profilePage, page }) => {
    await test.step('Нажать на выход', async () => {
      await profilePage.open();
      await profilePage.logoutButton.click();
      await expect(page).toHaveURL('/');
    });
  });  

  test('Переход в редактирование профиля', async ({ profilePage }) => {
    await test.step('Нажать на редактирование', async () => {
      await profilePage.open();
      await profilePage.editProfileButton.click();
      await expect(profilePage.page).toHaveURL(/\/edit/);
    });
  });  
});



import {expect} from '@playwright/test';
import {test} from '../fixtures/index';
import { young_mock, adult_mock, old_mock } from '../helpers/mocks';


test.use({storageState: 'tests/setup/.auth/user.json'})


test("Статус 'Ты молоденький котик'", async ({ page }) => {
    await page.goto('/');
    await test.step('мок молоденького котика', async () => {
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
        status: 200,
        body: JSON.stringify(young_mock)

            });
        });
    });
    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await page.reload();
    await test.step("Проверка отображения статуса 'Ты молоденький котик'", async () => {
        await expect(page.getByText('Ты молоденький котик', {exact: true})).toBeVisible();
    });
});

test.skip("Статус 'Ты взрослый котик'", async ({ page }) => {
    await page.goto('/');
    await test.step('мок взрослого котика', async () => {
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
        status: 200,
        body: JSON.stringify(adult_mock)

            });
        });
    });
    //await page.goto('/');
    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await page.reload();

    await test.step("Проверка отображения статуса 'Ты взрослый котик'", async () => {
        await expect(page.getByText('Ты взрослый котик')).toBeVisible();
    });

});

test("Статус 'Ты старый котик'", async ({ page }) => {
    await page.goto('/');
    await test.step('мок старого котика', async () => {
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
        status: 200,
        body: JSON.stringify(old_mock)

            });
        });
    });
    await page.reload();

    await test.step("Проверка отображения статуса 'Ты старый котик'", async () => {
        await expect(page.getByText('Ты старый котик')).toBeVisible();
    });

});



test('Проверка выхода из личного кабинета по кнопке Logout', async ({ cabinetPage }) => {
  
    await cabinetPage.open();
    await expect(cabinetPage.logoutButton).toBeVisible();
    await test.step('Нажатие на кнопку Logout для перехода на главную страницу', async () => {
  
      await cabinetPage.clickLogout();
    });
  
    await expect(cabinetPage.textMain).toBeVisible();

})

test('Проверка перехода на страницу редактирования имени', async ({ cabinetPage }) => {
  
    await cabinetPage.open();
    await expect(cabinetPage.editNameButton).toBeVisible();
    await test.step('Нажатие на кнопку Edit Profile для перехода на страницу редактирования профиля', async () => {
    
        await cabinetPage.clickEditProfile();
      });
    
    await expect(cabinetPage.textEdit).toBeVisible();
  
  })




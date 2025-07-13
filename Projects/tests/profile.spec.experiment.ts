import {test} from './fixtures/test-data.fixture';
import { expect } from '@playwright/test';
import { ProfilePage } from './pages/profile.page';
import { AuthHelper } from './auth-module/auth-helper';

// Подготовка: авторизация перед всеми тестами
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await AuthHelper.loginAndSaveState(page, {
    //вынести в фикстуру
    email: 'test500@yandex.ru',
    password: 'qwerty'
  });
  await context.close();
});

// Тесты для каждого возраста
test.describe('Проверка возрастных статусов', () => {
  test('Молодой котик (18 лет)', async ({ page, profileData }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.mockAge(profileData.ageGroups.young.age);
    await profilePage.open();
    await expect(profilePage.statusText).toHaveText(profileData.ageGroups.young.status);
  });

  test('Взрослый котик (45 лет)', async ({ page, profileData }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.mockAge(profileData.ageGroups.adult.age);
    await profilePage.open();
    await expect(profilePage.statusText).toHaveText(profileData.ageGroups.adult.status);
  });

  test('Старый котик (75 лет)', async ({ page, profileData }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.mockAge(profileData.ageGroups.senior.age);
    await profilePage.open();
    await expect(profilePage.statusText).toHaveText(profileData.ageGroups.senior.status);
  });
});
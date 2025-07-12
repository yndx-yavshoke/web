import { test } from '../fixtures/index';
import { expect, Page } from '@playwright/test';
import { YOUNG_MOCK, ADULT_MOCK, OLD_MOCK } from '../constants/mocks';
import { API } from '../constants/api';

export const mockAge = async (page: Page, mock: unknown) => {
  await page.route(API.EXPERIMENTS, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mock),
    });
  });
};

test.use({ storageState: 'tests/setup/.auth/user.json' })

test.describe('Проверка UI элементов страницы профиля и навигации', () => {
  test.beforeEach(async ({ profilePage }) => {
    await profilePage.open();
  });

  test('All main UI elements are visible and correct', async ({ profilePage }) => {
    await profilePage.expectUI();
  });

  test('Clicking "Edit Profile" button navigates to edit page', async ({ profilePage }) => {
    await profilePage.clickEditProfileButton();
    await expect(profilePage.page).toHaveURL(/edit/);
  });

  test('Clicking "Logout" button navigates to login page', async ({ profilePage }) => {
    await profilePage.clickLogoutButton();
    await expect(profilePage.page).toHaveURL('/');
  });
});

test.describe('Отображение возрастных статусов пользователя', () => {
  test('status - young cat', async ({ profilePage }) => {
    await mockAge(profilePage.page, YOUNG_MOCK);
    await profilePage.open();

    await expect(profilePage.page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(profilePage.page.getByText('Ты молоденький котик')).toBeVisible();
    await expect(profilePage.page.getByTestId('user-logout-button')).toBeVisible();
  });

  test.skip('status - adult cat', async ({ profilePage }) => {
    await mockAge(profilePage.page, ADULT_MOCK);
    await profilePage.open();

    await expect(profilePage.page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(profilePage.page.getByText('Ты взрослый котик')).toBeVisible();
    await expect(profilePage.page.getByTestId('user-logout-button')).toBeVisible();
  });

  test('status - old cat', async ({ profilePage }) => {
    await mockAge(profilePage.page, OLD_MOCK);
    await profilePage.open();

    await expect(profilePage.page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(profilePage.page.getByText('Ты старый котик')).toBeVisible();
    await expect(profilePage.page.getByTestId('user-logout-button')).toBeVisible();
  });
});
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

test.describe('Проверка UI элементов страницы профиля и навигации', () => {
  test.beforeEach(async ({ profilePage }) => {
    await profilePage.open();
  });

  test('All main UI elements are visible and correct', async ({ profilePage }) => {
    await expect(profilePage.avatar).toBeVisible();
    await expect(profilePage.name).toBeVisible();
    await expect(profilePage.status).toBeVisible();

    await expect(profilePage.toEditProfileButton).toBeVisible();
    await expect(profilePage.editProfileLabel).toBeVisible();

    await expect(profilePage.toLogoutButton).toBeVisible();
    await expect(profilePage.logoutLabel).toBeVisible();

    await expect(profilePage.galleryImageFirst).toBeVisible();
    await expect(profilePage.galleryImageSecond).toBeVisible();
    await expect(profilePage.galleryImageThird).toBeVisible();
    await expect(profilePage.galleryImageFourth).toBeVisible();

    await expect(profilePage.postsLabel).toBeVisible();
    await expect(profilePage.followersLabel).toBeVisible();
    await expect(profilePage.likesLabel).toBeVisible();

    await expect(profilePage.postsCount).toBeVisible();
    await expect(profilePage.followersCount).toBeVisible();
    await expect(profilePage.likesCount).toBeVisible();
  });

  test('Clicking "Edit Profile" button navigates to edit page', async ({ profilePage, page }) => {
    await profilePage.toEditProfileButtonClick();
    await expect(page).toHaveURL(/edit/);
  });

  test('Clicking "Logout" button navigates to login page', async ({ profilePage, page }) => {
    await profilePage.toLogoutButtonClick();
    await expect(page).toHaveURL('/');
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

import { expect } from "@playwright/test";

import { test } from "@common/test";
import { AUTH_PATH_STORAGE } from '@common/constants';

test.describe('Авторизация пользователя', () => {
    test.use({ storageState: AUTH_PATH_STORAGE });

    test('Проверить авторизацию', async ({ profilePage }) => {
        await profilePage.open();

        await expect(profilePage.model.logoutButton).toBeVisible();
    });
});

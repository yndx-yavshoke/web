import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.use({ storageState: 'tests/setup/.auth/user.json' });

const mockYoung = {
    "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "youngFrom": 0
        }
    }
};

const mockOld = {
    "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 0
        }
    }
};


test('Visibility of in-login user profile', async ({ mainPage, userProfilePage }) => {
    await userProfilePage.open();

    await expect(mainPage.inputEmail).not.toBeVisible();

    await expect(userProfilePage.logoutButton).toBeVisible();
});

test('Status - Молодой котик', async ({ page, mainPage, userProfilePage }) => {
    await userProfilePage.open();

    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockYoung)
        })
    });

    await expect(mainPage.inputEmail).not.toBeVisible();

    await expect(userProfilePage.logoutButton).toBeVisible();
    await expect(userProfilePage.statusYoungCat).toBeVisible();
});

// Взрослого (adult) котика пока что не проверить

test('Status - Старый котик', async ({ page, mainPage, userProfilePage }) => {
    await userProfilePage.open();

    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockOld)
        })
    });

    await expect(mainPage.inputEmail).not.toBeVisible();

    await expect(userProfilePage.logoutButton).toBeVisible();
    await expect(userProfilePage.statusOldCat).toBeVisible();
});

test('Redirect to Name Edit page', async ({ mainPage, userProfilePage, editPage }) => {
    await userProfilePage.open();

    await expect(mainPage.inputEmail).not.toBeVisible();

    await userProfilePage.editButton.click();

    await expect(editPage.nameLabel).toBeVisible();
    await expect(editPage.saveButton).toBeVisible();
});

test('Logout from user session', async ({ mainPage, userProfilePage }) => {
    await userProfilePage.open();

    await expect(mainPage.inputEmail).not.toBeVisible();

    await userProfilePage.logout();

    await expect(mainPage.title).toBeVisible();
});
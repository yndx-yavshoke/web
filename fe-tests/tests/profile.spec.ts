import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.use({ storageState: 'tests/setup/.auth/user.json' });

test.beforeEach(async ({ profilePage }) => {
    await profilePage.open();
});

const mock_old = {
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
            "oldFrom": 20,
            "youngFrom": 2
        }
    }
}

test('young kotik state', async ({ profilePage }) => {
    await test.step('Залогинились в профиль', async () => {
        await expect(profilePage.emailInput).not.toBeVisible();
    });

    await test.step('Отображается статус "Ты молоденький котик"', async () => {
        await expect(profilePage.status).toContainText('Ты молоденький котик');
    });
})

test('old kotik state', async ({ profilePage }) => {
    await test.step('Мокаем API для состояния старого котика', async () => {
        await profilePage.page.route('http://localhost:3000/experiments', (route) => {
            route.fulfill({
                status: 200,
                body: JSON.stringify(mock_old)
            })
        })
    });

    await test.step('Залогинились в профиль', async () => {
        await expect(profilePage.emailInput).not.toBeVisible();
    });

    await test.step('Отображается статус "Ты старый котик"', async () => {
        await expect(profilePage.status).toContainText('Ты старый котик');
    });
})


test('hardcode data', async ({ profilePage}) => {
    await test.step('Отображается количество постов "42"', async () => {
        await expect(profilePage.posts).toContainText('42');
    });

    await test.step('Отображается количество подписчиков "567"', async () => {
        await expect(profilePage.subscribers).toContainText('567');
    });

    await test.step('Отображается количество лайков "890"', async () => {
        await expect(profilePage.likes).toContainText('890');
    });
})
import { expect } from '@playwright/test';
import { test } from '@playwright/test';
import mockYoung from './fixture/mocks/experiments/young.json';
import mockAdult from './fixture/mocks/experiments/adult.json';
import mockOld from './fixture/mocks/experiments/old.json';

test.use({ storageState: 'tests/fixture/login/auth/setup/user.json' })

test('Young status is showed', async ({ page }) => {

    await test.step('Open Profile page', async () => {
        await page.goto('/');
    });

    await test.step('Checking page has right url', async () => {
        expect(page.url()).toBe('https://yavshok.ru/');
    });

    await test.step('Mocking response', async () => {
        await page.route('https://yavshok.ru/experiments', (route) => {
            route.fulfill({
                body: JSON.stringify(mockYoung)
            })
        });
    });

    await test.step('Waiting for status title', async () => {
        await page.getByText('Ты молоденький котик').waitFor();
    });

    await test.step('Checking young status is showed', async () => {
        await expect(page.getByText('Ты молоденький котик')).toBeVisible();
    });
});

test.skip('Adult status is showed', async ({ page }) => {

    await test.step('Open Profile page', async () => {
        await page.goto('/');
    });

    await test.step('Checking page has right url', async () => {
        expect(page.url()).toBe('https://yavshok.ru/');
    });

    await test.step('Mocking response', async () => {
        await page.route('https://api.yavshok.ru/experiments', (route) => {
            route.fulfill({
                status: 200,
                body: JSON.stringify(mockAdult),
                headers: {
                    "content-type": "application/json"
                }
            })
        });
    });

    await test.step('Waiting for status title', async () => {
        await page.getByText('Ты взрослый котик').waitFor();
    });

    await test.step('Checking adult status is showed', async () => {
        expect(page.getByText('Ты взрослый котик')).toBeVisible();
    });
});


test('Old status is showed', async ({ page }) => {

    await test.step('Open Profile page', async () => {
        await page.goto('/');
    });

    await test.step('Checking page has right url', async () => {
        expect(page.url()).toBe('https://yavshok.ru/');
    });

    await test.step('Mocking response', async () => {
        await page.route('https://api.yavshok.ru/experiments', (route) => {
            route.fulfill({
                status: 200,
                body: JSON.stringify(mockOld),
                headers: {
                    "content-type": "application/json"
                }
            })
        });
    });

    await test.step('Waiting for status title', async () => {
        await page.getByText('Ты старый котик').waitFor();
    });

    await test.step('Checking adult status is showed', async () => {
        await expect(page.getByText('Ты старый котик')).toBeVisible();
    });
});
import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
    test.use({ storageState: 'tests/setup/.auth/user.json' })

    test.beforeEach(async ({ page }) => {
        await test.step('Открыть страницу https://yavshok.ru/', async () => {
            await page.goto('/')
        })
    })

    const mock = {
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
                "oldFrom": 30,
                "youngFrom": 2
            }
        }
    }

    test('young age test', async ({ page }) => {
        await page.route('https://api.yavshok.ru/experiments', (route) => {
            let mockedAge = mock
            mockedAge.flags.age.youngFrom = 23
            mockedAge.flags.age.oldFrom = 24

            route.fulfill({
                status: 200,
                body: JSON.stringify(mockedAge),
            })
        })

        await expect(page.getByText('Ты молоденький котик')).toBeVisible()
    });

    test('old age test', async ({ page }) => {
        await page.route('https://api.yavshok.ru/experiments', (route) => {
            let mockedAge = mock
            mockedAge.flags.age.youngFrom = 18
            mockedAge.flags.age.oldFrom = 23

            route.fulfill({
                status: 200,
                body: JSON.stringify(mockedAge),
            })
        })

        await expect(page.getByText('Ты старый котик')).toBeVisible()
    });

    test('logout test', async ({ page }) => {
        await expect(page.getByTestId('user-logout-button')).toBeVisible();
        await page.getByTestId('user-logout-button').click();

        await expect(page.getByText('Я в ШОКе', { exact: true })).toBeVisible();
    });

})
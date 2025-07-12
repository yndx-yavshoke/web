import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/setup/.auth/user.json' })

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
            "oldFrom": 15,
            "youngFrom": 2
        }
    }
}


test('zalogin state <30', async ({ page }) =>{
    await page.goto('/');

    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(page.getByTestId('user-logout-button')).toBeVisible();
})

test('zalogin state >30', async ({ page }) =>{
    await page.goto('/');

    await page.route('https://yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200, 
            body: JSON.stringify(mock)
        })
    })

    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
    await expect(page.getByTestId('user-logout-button')).toBeVisible();
})
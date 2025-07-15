import {test, expect} from '@playwright/test';
import {MOCK_OLD, MOCK_ADULT, MOCK_YOUNG} from '../data-mocks/mocks';

test.use({storageState: 'tests/setup/.auth/user.json'});


test('check old cat', async ({ page }) => {
    await test.step('mock age', async () => {
        await page.goto('/');
        await page.route('https://api.yavshok.ru/experiments', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify(MOCK_OLD)

            }          
            )
        })
    })
    await test.step('check status "Ты старый котик"', async () => {
        await expect(page.getByTestId('main-email-input')).not.toBeVisible();
        await expect(page.getByText('Ты старый котик')).toBeVisible();
    })
})

test.skip('check adult cat', async ({ page }) => {

    await test.step('mock age', async () => {
        await page.goto('/');
        await page.route('https://api.yavshok.ru/experiments', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify(MOCK_ADULT)

            }          
            )
        })
    })
    await test.step('check status "Ты взрослый котик"', async () => {
        await expect(page.getByTestId('main-email-input')).not.toBeVisible();
        await expect(page.getByText('Ты взрослый котик')).toBeVisible();
    })
})

test('check young cat', async ({ page }) => {
    await test.step('mock age', async () => {
        await page.goto('/');
        await page.route('https://api.yavshok.ru/experiments', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify(MOCK_YOUNG)

            }          
            )
        })
    })
    await test.step('check status "Ты молоденький котик"', async () => {
        await expect(page.getByTestId('main-email-input')).not.toBeVisible();
        await expect(page.getByText('Ты молоденький котик')).toBeVisible();
    })
})



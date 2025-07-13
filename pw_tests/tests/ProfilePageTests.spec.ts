import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.use({ storageState: 'tests/setup/token/token.json' });

test.beforeEach(async ({ landing }) => {
    await landing.visit();
});

const buildAgeMock = (ageOverrides: Partial<{
    oldFrom: number;
    youngFrom: number;
    adultFrom: number;
}>) => ({
    flags: {
        age: {
            enabled: true,
            young: { from: 0, to: 21 },
            adult: { from: 22, to: 68 },
            old: { from: 69, to: 99 },
            ...ageOverrides,
        }
    }
});

const mockForAdult = buildAgeMock({
    oldFrom: 69,
    youngFrom: 2,
    adultFrom: 20
});

const mockForOld = buildAgeMock({
    oldFrom: 20,
    youngFrom: 2
});

const mockForYoung = buildAgeMock({
    oldFrom: 70,
    adultFrom: 25,
    youngFrom: 0
});

test.skip('Should show "Ты взрослый котик" status after mock', async ({ profile, landing }) => {
    await test.step('Do mock API', async () => {
        await profile.page.route('https://api.yavshok.ru/experiments', route => {
            route.fulfill({ status: 200, body: JSON.stringify(mockForAdult) });
        });
    });

    await test.step('Check status for adult kotik', async () => {
        await expect(profile.profileStatus).toContainText('Ты взрослый котик');
    });
});

test('Should show "Ты старый котик" status after mock', async ({ profile, landing }) => {
    await test.step('Do mock API', async () => {
        await profile.page.route('https://api.yavshok.ru/experiments', route => {
            route.fulfill({ status: 200, body: JSON.stringify(mockForOld) });
        });
    });

    await test.step('Check status for "Старый котик"', async () => {
        await expect(profile.profileStatus).toContainText('Ты старый котик');
    });
});

test('Should show "Ты молоденький котик" status', async ({ landing, profile }) => {
    await test.step('Verify email field is hidden (user is logged in)', async () => {
        await expect(landing.emailBox).not.toBeVisible();
    });

    await test.step('Check status for "Ты молоденький котик"', async () => {
        await expect(profile.profileStatus).toContainText('Ты молоденький котик');
    });
});

test('Check if values are static in profile', async ({ profile }) => {

    await test.step('Check likes amount = 890', async () => {
        await expect(profile.likeCount).toContainText('890');
    });
    await test.step('Check posts amount = 42', async () => {
        await expect(profile.postCount).toContainText('42');
    });
    await test.step('Check followers amount = 567', async () => {
        await expect(profile.followerCount).toContainText('567');
    });
});
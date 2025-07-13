import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.beforeEach(async ({ shokChecker }) => {
    await shokChecker.openWidget();
});

test('Test who is NOT in Shok', async ({ shokChecker }) => {
    await test.step('Insert email of user who is definitely not in SHOK', async () => {
        await shokChecker.submitEmail('thereisnowaysomeoneregistredthisemail@gmailmail.ru');
    });

    await test.step('See failure message that user is not in Shok', async () => {
        await expect(shokChecker.failureMessage).toBeVisible();
    });

    await test.step('We do not see success message and gif with cat', async () => {
        await expect(shokChecker.gifElement).not.toBeVisible();
        await expect(shokChecker.successMessage).not.toBeVisible();
    });
})

test('Test who is already in Shock', async ({ shokChecker }) => {
    await test.step('Firstly we should insert email of one of those who has been registred', async () => {
        await shokChecker.submitEmail('serzh52@list.ru');
    });

    await test.step('Are there success message and gif', async () => {
        await expect(shokChecker.successMessage).toBeVisible();
        await expect(shokChecker.gifElement).toBeVisible();
    });

    await test.step('We do not see any failure messages', async () => {
        await expect(shokChecker.failureMessage).not.toBeVisible();
    });
})

test('Test if there is no inserted email', async ({ shokChecker }) => {
    await test.step('If there is a button Я в ШОКе on page', async () => {
        await expect(shokChecker.button).toBeVisible();
    });

    await test.step('Button can not be pressed if there is no inserted email', async () => {
        await expect(shokChecker.button).toHaveAttribute('tabindex', '-1');
    });
})
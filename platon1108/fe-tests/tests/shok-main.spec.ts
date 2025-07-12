import { expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { test } from "../fixtures/index";

test.describe('Tests without redirect', () => {
        test.beforeEach('Check visibility of elements', async ({ mainPage }) => {
        await mainPage.open();

        await expect(mainPage.header).toBeVisible();
        await expect(mainPage.input).toBeVisible();
        await expect(mainPage.checkButton).toBeVisible();
        await expect(mainPage.toLoginButton).toBeVisible();
    });


    test.afterEach('Check visibility of elements', async ({ mainPage }) => {
        await expect(mainPage.header).toBeVisible();
        await expect(mainPage.input).toBeVisible();
        await expect(mainPage.checkButton).toBeVisible();
        await expect(mainPage.toLoginButton).toBeVisible();
    });


    test('Check exist user', async ({ mainPage }) => {
        await expect(mainPage.happyCatGIF).not.toBeVisible();
        await expect(mainPage.alreadyInShokHeader).not.toBeVisible();
        await expect(mainPage.notInShokHeader).not.toBeVisible();

        await mainPage.checkEmail(process.env.TEST_EMAIL!)

        await expect(mainPage.happyCatGIF).toBeVisible();
        await expect(mainPage.alreadyInShokHeader).toBeVisible();
        await expect(mainPage.notInShokHeader).not.toBeVisible();
    });


    test('Check non-exist user', async ({ mainPage }) => {
        await expect(mainPage.happyCatGIF).not.toBeVisible();
        await expect(mainPage.alreadyInShokHeader).not.toBeVisible();
        await expect(mainPage.notInShokHeader).not.toBeVisible();
        
        await mainPage.checkEmail(faker.internet.email());

        await expect(mainPage.happyCatGIF).not.toBeVisible();
        await expect(mainPage.alreadyInShokHeader).not.toBeVisible();
        await expect(mainPage.notInShokHeader).toBeVisible();
    });


    test('Check avability of buttons', async ({ mainPage }) => {
        await expect(mainPage.checkButton).toHaveAttribute('aria-disabled', 'true');
        await expect(mainPage.toLoginButton).not.toHaveAttribute('aria-disabled', 'true');
        
        await mainPage.checkEmail(faker.internet.email());

        await expect(mainPage.checkButton).not.toHaveAttribute('aria-disabled', 'true');
        await expect(mainPage.toLoginButton).not.toHaveAttribute('aria-disabled', 'true');

        await mainPage.checkEmail('');

        await expect(mainPage.checkButton).toHaveAttribute('aria-disabled', 'true');
        await expect(mainPage.toLoginButton).not.toHaveAttribute('aria-disabled', 'true');
    });
});


test('Check redirect to login page', async ({ mainPage, loginPage }) => {
    await mainPage.open();

    await mainPage.toLoginButton.click();

    await mainPage.page.waitForURL('/login');
    await expect(loginPage.header).toBeVisible();
});
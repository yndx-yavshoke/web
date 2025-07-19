import { expect } from "@playwright/test";
import { test } from '../fixtures/index';

test('first test', async ({ mainPage }) => {
    await mainPage.open();

    await expect(mainPage.title).toBeVisible();

})
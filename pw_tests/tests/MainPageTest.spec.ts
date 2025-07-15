import { expect } from "@playwright/test";
import { test } from '../fixtures';

test('Is main page exists or available test', async ({ landing }) => {
    await landing.visit();
    await expect(landing.heading).toBeVisible();
})
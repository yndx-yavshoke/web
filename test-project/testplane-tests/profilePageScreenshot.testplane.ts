import { createPages } from './helpers/testHelpers';
import { getTestUserEmail, getTestUserPassword } from '../utils/env';
import { it } from '@faker-js/faker/.';
import { describe, beforeEach } from 'node:test';
import { chromium } from 'playwright'; 

describe("Страница профиля", () => {
    let pages: ReturnType<typeof createPages>;
    let browser: chromium.Browser; 
    beforeEach(async () => {
        browser = await chromium.launch(); // Launch the browser
        pages = createPages(browser);
        await pages.loginPage.open();
        await pages.loginPage.login(getTestUserEmail(), getTestUserPassword());
    });
});

    it("Проверка первой половины cтраницы профиля", async ({ browser }) => {
        await browser.assertView(
            'header',
            '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]',
            {
                ignoreElements: [
                    '//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[1]',
                    '[data-testid="user-avatar"]'
                ]
            });
    });

    it("Проверка кнопки Logout", async ({ browser }) => {
        await browser.$('[data-testid="user-logout-button"]').assertView("logout");
    });

    it("Проверка фото котов на странице профиля", async ({ browser }) => {
        for (let i = 0; i < 4; i++) {
            await pages.profilePage.getGalleryImage(i).assertView(`cat-${i + 1}`);
        }
    });
});
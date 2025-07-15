import { createPages } from './helpers/testHelpers';
import { getTestUserEmail, getTestUserPassword } from '../utils/env';
import { it } from '@faker-js/faker';
import { describe, beforeEach } from 'node:test';
import { chromium } from 'playwright';

describe("Страница редактирования профиля", () => {
  let pages: ReturnType<typeof createPages>;
  let browser: chromium.Browser;

  beforeEach(async () => {
    browser = await chromium.launch();
    pages = createPages(browser);
    await pages.loginPage.open();
    await pages.loginPage.login(getTestUserEmail(), getTestUserPassword());
    await pages.editPage.open();
  });

  it("Проверка страницы редактирования профиля", async () => {
    await pages.editPage.fillName('');
    await browser.assertView('full-page', 'body');
  });
});
import { expect } from '@playwright/test';
import { test } from '../fixtures/noAuthFixtures.ts';

test('Валидация зарегистрированного пользователя', async ({ landing }) => {
 await landing.navigate();
 await landing.verifyUser('1@mail.ru');
 await expect(landing.memberLabel).toBeVisible();
});

test('Валидация незарегистрированного пользователя', async ({ landing }) => {
 await landing.navigate();
 await landing.verifyUser('unregistered@test.org');
 await expect(landing.notMemberLabel).toBeVisible();
});


test('Попытка проверки с пустым email', async ({ landing }) => {
 await landing.navigate();
 await landing.verifyUser('');
 await expect(landing.notMemberLabel).not.toBeVisible();
 await expect(landing.cheerfulPet).not.toBeVisible();
});

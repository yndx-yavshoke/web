import { test, expect } from '../fixtures/registration';
import { generateTestUser } from '../test-data/users';

const testNames = [
  { label: 'кириллица', value: 'Тест' },
  { label: 'латиница', value: 'TestUser' },
  { label: 'диакритика', value: 'Élève' },
  { label: 'спецсимволы', value: '@User#1!' },
];

for (const { label, value } of testNames) {
  test(`Изменение имени — ${label}`, async ({ page, registerNewUser }) => {
    const user = generateTestUser();

    // Регистрация
    await registerNewUser(user.email, user.password, user.age);

    // Переход в профиль (происходит автоматически после регистрации)
    await page.waitForSelector('[data-testid="user-edit-profile-button"]');

    // Переход в редактирование профиля
    await page.locator('[data-testid="user-edit-profile-button"]').click();

    // Ждём загрузку формы редактирования
    const nameInput = page.locator('[data-testid="edit-name-input"]');
    await expect(nameInput).toBeVisible();

    // Меняем имя
    await nameInput.fill(value);

    // Сохраняем
    await page.locator('[data-testid="edit-save-button"]').click();

    // Проверяем, что имя отобразилось в профиле
    const profileName = page.locator('div.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw');
    await expect(profileName).toHaveText(value);
  });
}

import { test, expect } from '../fixtures/mock';
import { faker } from '@faker-js/faker';

test.describe('Проверка статуса котика на профиле', () => {
  // Общий локатор для всех тестов
  const statusLocator = 'div.css-146c3p1.r-1khnkhu.r-15d164r.r-ubezar';

  test('Для молодого возраста (0-21) отображается "Ты молоденький котик"', async ({ page, mockExperiments, registerUser }) => {
    const age = faker.number.int({ min: 0, max: 21 });
    await mockExperiments(page);
    await registerUser(page, age);
    
    await expect(page.locator(statusLocator))
      .toHaveText('Ты молоденький котик');
  });

  test('Для взрослого возраста (22-68) отображается "Ты взрослый котик"', async ({ page, mockExperiments, registerUser }) => {
    const age = faker.number.int({ min: 22, max: 68 });
    await mockExperiments(page);
    await registerUser(page, age);
    
    await expect(page.locator(statusLocator))
      .toHaveText('Ты взрослый котик');
  });

  test('Для пожилого возраста (69-99) отображается "Ты старый котик"', async ({ page, mockExperiments, registerUser }) => {
    const age = faker.number.int({ min: 69, max: 99 });
    await mockExperiments(page);
    await registerUser(page, age);
    
    await expect(page.locator(statusLocator))
      .toHaveText('Ты старый котик');
  });
});
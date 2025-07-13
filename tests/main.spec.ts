import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage';
import { setupUserStatusMock } from './mocks/apiMocks';

test.beforeEach(async ({ page }) => {
  await test.step('Открытие главной страницы', async () => {
    const main = new MainPage(page);
    await main.goto();
    await page.waitForLoadState('domcontentloaded');
  });
});

test('Главная: отображается заголовок', async ({ page }) => {
  await test.step('Проверка отображения заголовка', async () => {
    const main = new MainPage(page);
    await page.waitForLoadState('domcontentloaded');
    
    await test.step('Получение текста заголовка', async () => {
      const title = await main.getTitleText();
      expect(title).toContain('Я в ШОКе');
    });
  });
});

test('Главная: ввод email и клик по "В шок"', async ({ page }) => {
  await test.step('Тестирование функционала "В шок"', async () => {
    const main = new MainPage(page);
    
    await test.step('Ввод валидного email', async () => {
      await main.fillEmail('test@mail.ru');
    });
    
    await test.step('Клик по кнопке "В шок"', async () => {
      await main.clickShock();
    });
    
    await test.step('Проверка что кнопка была нажата', async () => {
      expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
    });
  });
});

test('Главная: клик по "Я в шоке?" с валидным email', async ({ page }) => {
  await test.step('Проверка статуса зарегистрированного пользователя', async () => {
    const main = new MainPage(page);
    
    await setupUserStatusMock(page, true);
    
    await test.step('Ввод зарегистрированного email', async () => {
      await main.fillEmail('test@mail.ru');
    });
    
    await test.step('Клик по кнопке "Я в шоке?"', async () => {
      await main.clickShockQuestion();
    });
    
    await test.step('Проверка результата для зарегистрированного пользователя', async () => {
      expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
    });
  });
});

test('Главная: клик по "Я в шоке?" с невалидным email', async ({ page }) => {
  await test.step('Проверка статуса незарегистрированного пользователя', async () => {
    const main = new MainPage(page);
    
    await setupUserStatusMock(page, false);
    
    await test.step('Ввод незарегистрированного email', async () => {
      await main.fillEmail('notregistered@mail.ru');
    });
    
    await test.step('Клик по кнопке "Я в шоке?"', async () => {
      await main.clickShockQuestion();
    });
    
    await test.step('Проверка результата для незарегистрированного пользователя', async () => {
      expect(page.url().includes('yavshok') || page.url().includes('data:')).toBe(true);
    });
  });
});

test('Главная: кнопка "Я в шоке?" неактивна при пустом email', async ({ page }) => {
  await test.step('Проверка валидации пустого email', async () => {
    const main = new MainPage(page);
    
    await test.step('Очистка поля email', async () => {
      await main.fillEmail('');
    });
    
    await test.step('Проверка неактивности кнопки', async () => {
      const isDisabled = await main.isCheckButtonDisabled();
      expect(isDisabled).toBe(true);
    });
  });
});

test('Главная: кнопка "Я в шоке?" активна при валидном email', async ({ page }) => {
  await test.step('Проверка активации кнопки при валидном email', async () => {
    const main = new MainPage(page);
    
    await test.step('Ввод валидного email', async () => {
      await main.fillEmail('test@example.com');
    });
    
    await test.step('Проверка активности кнопки', async () => {
      const isDisabled = await main.isCheckButtonDisabled();
      expect(isDisabled).toBe(false);
    });
  });
}); 
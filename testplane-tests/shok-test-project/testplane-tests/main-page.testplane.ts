describe('Main Page Visual', () => {

  it('should display email input', async ({browser}) => {
    await browser.runStep('Открыть главную страницу', async () => {
      await browser.openAndWait('https://yavshok.ru');
    });
    await browser.runStep('Проверить отображение поля email', async () => {
        await browser.assertView('main-default', '[data-testid="main-email-input"]');
      });
  });

  it('should display login button', async ({browser}) => {
    await browser.runStep('Открыть главную страницу', async () => {
      await browser.openAndWait('https://yavshok.ru');
    });
    await browser.runStep('Проверить отображение кнопки "В шок"', async () => {
      await browser.assertView('main-default', '[data-testid="main-login-button"]');
    });
  });

  it('should display check button', async ({browser}) => {
    await browser.runStep('Открыть главную страницу', async () => {
      await browser.openAndWait('https://yavshok.ru');
    });
    await browser.runStep('Проверить отображение кнопки "Я в шоке?"', async () => {
      await browser.assertView('main-default', '[data-testid="main-check-button"]');
    });
  });

  it('should display email input focus', async ({browser}) => {
    await browser.runStep('Открыть главную страницу', async () => {
      await browser.openAndWait('https://yavshok.ru');
    });
    await browser.runStep('Фокус на поле email', async () => {
        await browser.$('[data-testid="main-email-input"]').click();
      });
    await browser.runStep('Проверить отображение поля email с фокусом', async () => {
      await browser.assertView('main-email-focus', '[data-testid="main-email-input"]');
    });
  });

  it('should display not-exist email state', async ({browser}) => {
    await browser.runStep('Открыть главную страницу', async () => {
      await browser.openAndWait('https://yavshok.ru');
    });
    await browser.runStep('Ввести несуществующий email', async () => {
      await browser.$('[data-testid="main-email-input"]').setValue('notexist@example.com');
    });
    await browser.runStep('Нажать кнопку проверки', async () => {
      await browser.$('[data-testid="main-check-button"]').click();
      await browser.waitUntil(async () => {
        const text = await browser.$('//*[text()="Ты еще не в ШОКе"]').getText();
        return text === 'Ты еще не в ШОКе';
      }, { timeout: 10000 });
    });
    await browser.runStep('Проверить отображение состояния "Ты не в ШОКе"', async () => {
      await browser.assertView('main-email-not-exist', '//*[text()="Ты еще не в ШОКе"]');
    });
  });

  it('should display exist email state', async ({browser}) => {
    await browser.runStep('Открыть главную страницу', async () => {
      await browser.openAndWait('https://yavshok.ru');
    });
    await browser.runStep('Ввести существующий email', async () => {
      await browser.$('[data-testid="main-email-input"]').setValue('user123@yandex.ru');
    });
    await browser.runStep('Кликаем на кнопку "Я в шоке?"', async () => {
      await browser.$('[data-testid="main-check-button"]').click();
      await browser.pause(5000);
    });
    await browser.runStep('Ждем загрузки гифки и скрываем ее', async () => {
        const container = await browser.$('div[data-expoimage="true"]');
        await container.waitForDisplayed({ timeout: 10000 });
        await browser.execute(() => {
            const gif = document.querySelector('img[src*="happyCat"]');
            if (gif && gif instanceof HTMLElement) gif.style.display = 'none';
          });
    });
    await browser.runStep('Проверить отображения состояния "Ты уже в ШОКе"', async () => {
      await browser.assertView('main-email-exist', '//*[text()="Ты уже в ШОКе"]');
    });
  });
});

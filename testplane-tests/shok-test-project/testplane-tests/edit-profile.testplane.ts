describe('Edit profile page', () => {
  it('default state', async ({browser}) => {
    await browser.runStep('Открыть страницу редактирования', async () => {
      await browser.url('https://yavshok.ru/edit');
    });
    await browser.runStep('Проверить дефолтное состояние', async () => {
      await browser.assertView('edit-profile-default', 'body');
    });
  });

  it('focus on name', async ({browser}) => {
    await browser.runStep('Открыть страницу редактирования', async () => {
      await browser.url('https://yavshok.ru/edit');
    });
    await browser.runStep('Фокус на поле имени', async () => {
      await browser.$('[data-testid="edit-name-input"]').click();
    });
    await browser.runStep('Проверить отображение поля имени с фокусом', async () => {
      await browser.assertView('edit-profile-name-focus', 'body');
    });
  });

  it('error state', async ({browser}) => {
    await browser.runStep('Открыть страницу редактирования', async () => {
      await browser.url('https://yavshok.ru/edit');
    });
    await browser.runStep('Очистить поле имени', async () => {
      await browser.$('[data-testid="edit-name-input"]').setValue('');
    });
    await browser.runStep('Нажать кнопку сохранения', async () => {
      await browser.$('[data-testid="edit-save-button"]').click();
      await browser.pause(500);
    });
    await browser.runStep('Проверить отображение ошибки', async () => {
      await browser.assertView('edit-profile-error', 'body');
    });
  });
}); 
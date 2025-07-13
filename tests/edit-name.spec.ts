import { test, expect } from '../fixtures/index';
import { ProfilePage } from '../pages/ProfilePage';
import { generateRandomName } from '../utils/dataGenerator';

test.use({ storageState: 'tests/auth/storageState.json' });

test.describe('Редактирование имени', () => {
 
  test('Успешное изменение имени', async ({ editPage, profilePage }) => {
    await test.step('Изменить имя и сохранить', async () => {
      await editPage.open();
      const newName = generateRandomName();
      await editPage.changeName(newName);
      await editPage.saveButton.click();
      await editPage.cancelButton.click();
      await expect(profilePage.editProfileButton).toBeVisible();
      const actualName = await profilePage.nameDisplay.textContent(); 
      await expect(actualName?.trim()).toBe(newName);   
    });  
  });

  test('Ошибка при пустом имени', async ({ editPage }) => {
    await test.step('Очистить поле имени и сохранить', async () => {
      await editPage.open();
      await editPage.changeName('');
      await expect(editPage.nameRequiredMessage).toBeVisible();
    });  
  });

  test('Отмена изменений', async ({ editPage, profilePage }) => {
    await test.step('Отменить введённое имя', async () => {
      await profilePage.open();
      const nameBefore = (await profilePage.nameDisplay.textContent()) ?? '';

      await editPage.open();
      await editPage.nameInput.fill(generateRandomName());
      await editPage.cancelButton.click();
      await expect(profilePage.nameDisplay).toBeVisible();

      await expect(profilePage.nameDisplay).toHaveText(nameBefore);
    });
  });  
});
import { expect } from '@playwright/test';
import { test } from './fixtures/withAuth';

test('Изменение имени пользователя', async ({ personalPage, editNamePage }) => {
  await personalPage.open();
  await personalPage.editName();
  await editNamePage.open();
  await editNamePage.inputName.clear();
  await editNamePage.inputName.fill('Измененный Котик');
  await editNamePage.saveButton.click();
  await personalPage.open();
  await personalPage.userName.waitFor({ state: 'visible' });
  await expect(personalPage.userName).toHaveText('Измененный Котик');
});

test('Отмена изменения имени пользователяэ', async ({ personalPage, editNamePage }) => {
  await personalPage.open();
  await personalPage.editName();
  await editNamePage.open();
  await editNamePage.inputName.clear();
  await editNamePage.inputName.fill('Отмененный Котик');
  await editNamePage.cancelEdit();
  await personalPage.open();
  await expect(personalPage.userName).not.toHaveText('Отмененный Котик');
});

test('Проверка валидации: пустое имя не сохраняется', async ({ personalPage, editNamePage }) => {
  await personalPage.open();
  await personalPage.editName();
  await editNamePage.open();
  await editNamePage.inputName.clear();
  await editNamePage.saveButton.click();
  await expect(editNamePage.nameValidationMessage).toHaveText('Name is required');
  await personalPage.open();
  await expect(personalPage.userName).not.toHaveText('');
});
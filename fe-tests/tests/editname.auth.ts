import { expect } from '@playwright/test';
import { test } from '../fixtures/authFixtures';

//test.use({ storageState: 'tests/authorization/cookies.json' });

test('Изменение имени пользователя', async ({ profile, nameEditor }) => {
  const newName = 'Новое имя';

  await profile.navigateTo();
  await profile.modifyProfile();

  await nameEditor.nameField.clear();
  await nameEditor.updateProfileName(newName);
  
  await profile.navigateTo();
  await profile.displayName.waitFor({ state: 'visible' });
  await expect(profile.displayName).toHaveText(newName);
});

test('Отмена изменения имени пользователя', async ({ profile, nameEditor }) => {
  const newName = 'Новейшее имя';

  await profile.navigateTo();
  await profile.modifyProfile();

  await nameEditor.nameField.clear();
  await nameEditor.nameField.fill(newName);
  await nameEditor.abortChanges();
  
  await profile.navigateTo();
  await profile.displayName.waitFor({ state: 'visible' });
  await expect(profile.displayName).not.toHaveText(newName);
});

test('Пустое имя пользователя', async ({ profile, nameEditor }) => {

  await profile.navigateTo();
  await profile.modifyProfile();

  await nameEditor.nameField.clear();
  await nameEditor.confirmBtn.click();
  
  await profile.navigateTo();
  await profile.displayName.waitFor({ state: 'visible' });
  await expect(profile.displayName).not.toHaveText('');
});
import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { generateUserName, generateLongUserName } from '../helpers/helpers';

test.use({storageState: 'tests/setup/.auth/user.json'})

test('Проверка переименования юзера и успешного отображения нового имени', async ({ renamePage, cabinetPage, page }) => {

  const nickname = generateUserName();
  
  await renamePage.open();
  await test.step('Ввод нового имени в поле и возврат на страницу личного профиля', async () => {

    await renamePage.enterName(nickname, true);
    await renamePage.clickCancel();
    await expect(page).toHaveURL('/');

  });

  await expect(cabinetPage.userName).toHaveText(nickname);

})

test('Проверка ввода имени больше 50 символов в поле переименования', async ({ renamePage }) => {

  const nickname = generateLongUserName();

  await renamePage.open();
  await test.step('Ввод значения в поле больше чем 50 символов (51 символ) и нажатие Сохранить', async () => {
  

      await renamePage.enterName(nickname, true);

  
    });
  

    await expect(renamePage.page.getByText('Name must be less than 50 characters')).toBeVisible();

  
  })

test('Проверка ввода пустого значения в поле переименования', async ({ renamePage }) => {


  await renamePage.open();
  await test.step('Ввод пустого значения в поле и нажатие Сохранить', async () => {
  

    await renamePage.enterName('', true);

  
    });
  

    await expect(renamePage.page.getByText('Name is required')).toBeVisible();

  
  })

  test('Проверка что при не нажатии на Save новое имя в поле ввода не сохраняется', async ({ renamePage, cabinetPage }) => {

    const nickname = generateUserName();

    await cabinetPage.open();
    const actualUserName = await cabinetPage.getUserName();
    if (actualUserName === null) {
      throw new Error('User name is null');
    }
    await renamePage.open();
    await test.step('Ввод нового имени в поле и нажатие Отмена без сохранения', async () => {
  

      await renamePage.enterNameButNotSave(nickname, true);
      await renamePage.clickCancel();

  
    });
  

    await expect(cabinetPage.userName).toHaveText(actualUserName);

  
  })
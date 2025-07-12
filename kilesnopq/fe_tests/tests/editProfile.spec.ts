import { test, expect } from '../src/fixtures/mainPage.fixture';
import { LoginPage } from '../src/pages/LoginPage';
import { EditProfilePage } from '../src/pages/EditProfilePage';
import { generateRandomNickname } from '../src/utils/nicknameGenerator';

test.describe('Редактирование профиля', () => {
  test('Изменение имени и сохранение', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.login('e.sheluddd+145@gmail.com', '123123');
    await login.goToEditProfile();

    const editProfile = new EditProfilePage(mainPage.page);
    const newName = generateRandomNickname();
    await editProfile.nameInput.fill(newName);
    await editProfile.saveButton.click();
    await mainPage.page.waitForTimeout(5000);
    await mainPage.page.goto('https://yavshok.ru/');
    const nameLocator = mainPage.page.locator('xpath=//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[1]');
    await expect(nameLocator).toHaveText(newName);
  });

  test('Изменение имени и отмена', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.login('e.sheluddd+145@gmail.com', '123123');
    const nameLocator = mainPage.page.locator('xpath=//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[1]');
    const currentName = await nameLocator.innerText();
    await login.goToEditProfile();

    const editProfile = new EditProfilePage(mainPage.page);
    const newName = generateRandomNickname();
    await editProfile.nameInput.fill(newName);
    await editProfile.cancelButton.click();

    await expect(nameLocator).toHaveText(currentName);
  });

  test('Пустое имя — ошибка', async ({ mainPage }) => {
    const login = new LoginPage(mainPage.page);
    await mainPage.page.goto('/login');
    await login.login('e.sheluddd+145@gmail.com', '123123');
    await login.goToEditProfile();

    const editProfile = new EditProfilePage(mainPage.page);
    await editProfile.nameInput.fill('');
    await editProfile.saveButton.click();

    await expect(mainPage.page.locator('text=Name is required')).toBeVisible();
  });
}); 
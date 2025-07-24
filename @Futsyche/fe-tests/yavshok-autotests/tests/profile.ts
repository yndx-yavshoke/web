import { test, expect } from './fixtures/pages';

test.describe('Редактирование профиля', () => {
    test('Успешное изменение имени профиля', async ({ profilePage }) => {
        const newName = "НовоеИмяКотика";
        
        await profilePage.goto();
        await profilePage.openEditProfile();
        await profilePage.editName(newName);
        await profilePage.saveChanges();
        await profilePage.verifyNameChanged(newName);
    });

    test('Отмена редактирования профиля', async ({ profilePage, page }) => {
        await profilePage.goto();
        
        // Получаем исходное имя
        const nameElement = page.locator('.profile-name');
        const originalName = await nameElement.textContent();
        const tempName = "ВременноеИмя";
        
        await profilePage.openEditProfile();
        await profilePage.editName(tempName);
        await page.click('button:has-text("Cancel")');
        
        // Проверяем, что имя осталось прежним
        await expect(nameElement).toHaveText(originalName!);
    });
});
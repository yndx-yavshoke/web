# Проверка кнопки редактирования - Кнопка редактирования должна быть. При нажатии происходит переход на экран редактирования.

def test_edit_profile_button(logged_in_page):
    logged_in_page.goto("https://yavshok.ru/")

    logged_in_page.locator('[data-testid="user-edit-profile-button"]').wait_for(state="visible")
    assert logged_in_page.locator('[data-testid="user-edit-profile-button"]').is_visible(), "Кнопка 'Edit Profile' не видна на странице"

    logged_in_page.locator('[data-testid="user-edit-profile-button"]').click()

    assert logged_in_page.url.startswith("https://yavshok.ru/edit"), f"Ожидался переход на https://yavshok.ru/edit, но текущий URL: {logged_in_page.url}"
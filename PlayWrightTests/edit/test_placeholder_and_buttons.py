# Проверка плейсхолдеров и кнопок - На экране должны быть инпут редактирования и кнопки отмены и сохранения.

def test_placeholder_and_buttons(logged_in_page):
    logged_in_page.goto("https://yavshok.ru/")

    logged_in_page.locator('[data-testid="user-edit-profile-button"]').click()

    assert logged_in_page.locator('[data-testid="edit-name-input"]').is_visible(), "Поле ввода имени не отображается"
    assert logged_in_page.locator('[data-testid="edit-save-button"]').is_visible(), "Поле сохранения изменений не отображается"
    assert logged_in_page.locator('[data-testid="edit-cancel-button"]').is_visible(), "Поле отмены не отображается"


# Проверка закрытия редактирования имени

from playwright.sync_api import expect

def test_exit_edit(logged_in_page):
    logged_in_page.goto("https://yavshok.ru/")

    logged_in_page.locator('[data-testid="user-edit-profile-button"]').click()
    logged_in_page.locator('[data-testid="edit-cancel-button"]').click()

    expect(logged_in_page).to_have_url("https://yavshok.ru/")


# проверка появления ошибки при отсуствии имени

def test_exit_edit(logged_in_page):
    logged_in_page.goto("https://yavshok.ru/")

    logged_in_page.locator('[data-testid="user-edit-profile-button"]').click()
    logged_in_page.locator('[data-testid="edit-name-input"]').fill("")
    logged_in_page.locator('[data-testid="edit-save-button"]').click()

    logged_in_page.locator('div.r-kb0oh3.r-1b43r93.r-14gqq1x', has_text="Name is required").wait_for(state="visible", timeout=3000)



# Проверка статуса котика по возрасту - Статус должен меняться. Молоденький котик (0-21 год), Взрослый котик (22-68 лет), Старый котик (69-99 лет)

import time
import json

# Старое состояние
def test_age_conditions(logged_in_page):
    def mock_experiments(route, request):
        mock_data = {
            "flags": {
                "age": {
                    "enabled": True,
                    "young": {"from": 0, "to": 21},
                    "adult": {"from": 22, "to": 68},
                    "old": {"from": 69, "to": 99},
                    "oldFrom": 19,  
                    "youngFrom": 2
                }
            }
        }
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps(mock_data)
        )

    logged_in_page.route("**/experiments", mock_experiments)

    logged_in_page.goto("https://yavshok.ru/")

    element = logged_in_page.locator('div.css-146c3p1.r-1khnkhu.r-15d164r.r-ubezar')
    element.wait_for(state="visible", timeout=5000)

    start_time = time.time()
    while "Ты старый котик" not in (text := element.text_content()) and time.time() - start_time < 10:
        time.sleep(0.5)

    assert "Ты старый котик" in text, f"Статус 'Старый' не отобразился, вместо этого: {text}"

    # Взрослое состояние
    def mock_experiments(route, request):
        mock_data = {
            "flags": {
                "age": {
                    "enabled": True,
                    "young": {"from": 0, "to": 21},
                    "adult": {"from": 22, "to": 68},
                    "old": {"from": 69, "to": 99},
                    "oldFrom": 30,  
                    "youngFrom": 2,
                    "adultFrom": 19
                }
            }
        }
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps(mock_data)
        )

    logged_in_page.route("**/experiments", mock_experiments)

    logged_in_page.goto("https://yavshok.ru/")

    element = logged_in_page.locator('div.css-146c3p1.r-1khnkhu.r-15d164r.r-ubezar')
    element.wait_for(state="visible", timeout=5000)

    start_time = time.time()
    while "Ты взрослый котик" not in (text := element.text_content()) and time.time() - start_time < 10:
        time.sleep(0.5)

    assert "Ты взрослый котик" in text, f"Статус 'Взрослый' не отобразился, вместо этого: {text}"

    # Молоденькое состояние
    logged_in_page.goto("https://yavshok.ru/")

    element = logged_in_page.locator('div.css-146c3p1.r-1khnkhu.r-15d164r.r-ubezar')
    element.wait_for(state="visible", timeout=5000)

    start_time = time.time()
    while "Ты молоденький котик" not in (text := element.text_content()) and time.time() - start_time < 10:
        time.sleep(0.5)

    assert "Ты молоденький котик" in text, f"Статус 'Молоденький' не отобразился, вместо этого: {text}"
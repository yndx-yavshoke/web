import pytest
import requests

BASE_URL = "https://yavshok.ru"
CORRECT_EMAIL = "test@example.com"
INCORRECT_EMAIL = "newtest@example.com"


def test_vshok_successful():
    response = requests.post(
        f"{BASE_URL}",
        json={"email": CORRECT_EMAIL},
    )
    assert response.status_code == 200
    assert "token" in response.json()


def test_vshok_fail():
    response = requests.post(
        f"{BASE_URL}",
        json={"email": INCORRECT_EMAIL},
    )
    assert response.status_code == 401

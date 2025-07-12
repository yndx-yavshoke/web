import pytest
import requests

BASE_URL = "http://localhost:3000"
CORRECT_EMAIL = "user@example.com"
INCORRECT_EMAIL = "newtest@example.com"
CORRECT_PASSWORD = "string"


def test_vshok_successful():
    register_response = requests.post(
        f"{BASE_URL}/auth/register",
        json={
            "email": CORRECT_EMAIL,
            "password": CORRECT_PASSWORD,
            "name": "Test User",
        },
    )

    vshok_response = requests.post(
        f"{BASE_URL}/exist",
        json={"email": CORRECT_EMAIL},
    )
    assert vshok_response.status_code == 200
    assert vshok_response.json().get("exist") is True


def test_vshok_fail():
    response = requests.post(
        f"{BASE_URL}",
        json={"email": INCORRECT_EMAIL},
    )
    assert response.status_code == 404

import pytest
import requests

BASE_URL = "http://localhost:3000"
CORRECT_EMAIL = "user@example.com"
CORRECT_PASSWORD = "string"


def test_name_changing():
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": CORRECT_EMAIL, "password": CORRECT_PASSWORD},
    )

    assert login_response.status_code == 200
    assert "token" in login_response.json()
    token = login_response.json()["token"]

    headers = {"Authorization": f"Bearer {token}"}

    update_data = {"name": "New Name"}
    update_response = requests.patch(
        f"{BASE_URL}/user/name",
        json=update_data,
        headers=headers,
    )
    assert update_response.status_code == 200

    response_json = update_response.json()


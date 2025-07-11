import { test } from '../../fixtures/index';
import { getTestUserEmail, getTestUserPassword, getApiBaseUrl } from '../../utils/env';
import * as fs from 'fs';

test('auth via API', async ({ loginPage }) => {
    const response = await loginPage.page.request.post(`${getApiBaseUrl()}/auth/login`, {
        data: {
            email: getTestUserEmail(),
            password: getTestUserPassword()
        }
    });

    const body = await response.json();
    const token = body.token;
    const user = body.user;

    const storage = {
        cookies: [],
        origins: [
            {
                origin: "https://yavshok.ru",
                localStorage: [
                    {
                        name: "UserData",
                        value: JSON.stringify(user)
                    },
                    {
                        name: "AuthToken",
                        value: token
                    }
                ]
            }
        ]
    };

    fs.writeFileSync('./tests/setup/auth/user.json', JSON.stringify(storage, null, 2), 'utf-8');
});
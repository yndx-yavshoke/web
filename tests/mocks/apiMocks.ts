import { Page } from '@playwright/test';

export interface ApiMock {
  url: string;
  method: string;
  response: any;
  status?: number;
}

export const API_MOCKS = {
  USER_STATUS: {
    REGISTERED: {
      url: '**/api/user/status*',
      method: 'GET',
      response: { status: 'registered', message: 'Ты уже в ШОКе' },
      status: 200
    },
    NOT_REGISTERED: {
      url: '**/api/user/status*',
      method: 'GET',
      response: { status: 'not_registered', message: 'Ты еще не в ШОКе' },
      status: 200
    }
  },
  AUTH: {
    SUCCESS: {
      url: '**/api/auth/login*',
      method: 'POST',
      response: { success: true, token: 'mock-jwt-token', user: { id: 1, email: 'test@mail.ru' } },
      status: 200
    },
    FAILURE: {
      url: '**/api/auth/login*',
      method: 'POST',
      response: { success: false, error: 'Invalid credentials' },
      status: 401
    }
  },
  REGISTER: {
    SUCCESS: {
      url: '**/api/auth/register*',
      method: 'POST',
      response: { success: true, user: { id: 1, email: 'test@mail.ru', age: 25 } },
      status: 201
    },
    EMAIL_EXISTS: {
      url: '**/api/auth/register*',
      method: 'POST',
      response: { success: false, error: 'Email already exists' },
      status: 409
    }
  },
  PROFILE: {
    UWU: {
      url: '**/api/profile*',
      method: 'GET',
      response: { status: 'UwU', age: 0, message: 'UwU статус' },
      status: 200
    },
    YOUNG: {
      url: '**/api/profile*',
      method: 'GET',
      response: { status: 'молоденький котик', age: 20, message: 'молоденький котик статус' },
      status: 200
    },
    OLD: {
      url: '**/api/profile*',
      method: 'GET',
      response: { status: 'старый котик', age: 40, message: 'старый котик статус' },
      status: 200
    }
  }
};

export async function setupApiMocks(page: Page, mocks: ApiMock[]) {
  for (const mock of mocks) {
    await page.route(mock.url, async route => {
      await route.fulfill({
        status: mock.status || 200,
        contentType: 'application/json',
        body: JSON.stringify(mock.response)
      });
    });
  }
}

export async function setupUserStatusMock(page: Page, isRegistered: boolean) {
  const mock = isRegistered ? API_MOCKS.USER_STATUS.REGISTERED : API_MOCKS.USER_STATUS.NOT_REGISTERED;
  await setupApiMocks(page, [mock]);
}

export async function setupAuthMock(page: Page, success: boolean) {
  const mock = success ? API_MOCKS.AUTH.SUCCESS : API_MOCKS.AUTH.FAILURE;
  await setupApiMocks(page, [mock]);
}

export async function setupRegisterMock(page: Page, success: boolean) {
  const mock = success ? API_MOCKS.REGISTER.SUCCESS : API_MOCKS.REGISTER.EMAIL_EXISTS;
  await setupApiMocks(page, [mock]);
}

export async function setupProfileMock(page: Page, age: number) {
  let mock;
  if (age === 0) {
    mock = API_MOCKS.PROFILE.UWU;
  } else if (age >= 1 && age <= 29) {
    mock = API_MOCKS.PROFILE.YOUNG;
  } else {
    mock = API_MOCKS.PROFILE.OLD;
  }
  await setupApiMocks(page, [mock]);
} 
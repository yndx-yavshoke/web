import { test } from '../Pages/fixtures';

test.describe('Login Page', () => {
  test('successful login', async ({ logging }) => {
    await logging.open();
    await logging.login('abogsysa@yandex.ru', '12345678m');
    await logging.allInOneExpection();
  });

  test('invalid data', async ({ logging }) => {
    await logging.open();
    await logging.login('wrong@yandex.ru', '123456marvel');
    await logging.expectInvalidCredentials();
  });

  test('missing email', async ({ logging }) => {
    await logging.open();
    await logging.login('', '12345678m');
    await logging.expectMissingEmail();
  });

  test('missing password', async ({ logging }) => {
    await logging.open();
    await logging.login('abogsysa@yandex.ru', '');
    await logging.expectMissingPassword();
  });

});
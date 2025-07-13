import { test } from '../Pages/fixtures';

test.describe('checking if the users already in shok app', () => {
 
  test('valid email', async ({ checking }) => {
    await checking.open();
    await checking.checkEmail('abogsysa@yandex.ru', true);
  });
  test('invalid email', async ({checking}) => {
    await checking.open();
    await checking.checkEmail('invalid', false);
  });

});
import { faker } from '@faker-js/faker';

export const generateTestUser = () => ({
  email: `test-${faker.string.uuid()}@ya.com`,
  password: faker.internet.password({ length: 14, pattern: /[A-Za-z0-9!@#$%^&*]/ }),
  age: faker.number.int({ min: 1, max: 99 })
});

export const generateUnregisteredEmail = () =>
  `unreg-${faker.string.uuid()}@ya.com`;

export const generateInvalidEmails = () => ([
  'plainstring',
  'missing@.com',
  '@missingusername.com',
  'spaces in@email.com',
  `${faker.string.alphanumeric(256)}@ya.com`
]);

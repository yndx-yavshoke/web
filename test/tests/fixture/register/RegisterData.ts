import { faker } from '@faker-js/faker';

export const registerData = {
    email: faker.internet.email({ lastName: "@yavshok.ru" }),
    password: faker.internet.password({ length: 6 }),
    age: faker.number.int({ min: 0, max: 99 }).toString()
}
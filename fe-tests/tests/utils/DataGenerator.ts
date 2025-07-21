import { faker } from '@faker-js/faker';


export class DataGenerator {
    public static GenerateEmail() {
        return faker.internet.email();
    }

    public static GeneratePassword() {
        return faker.internet.password();
    }

    public static GenerateFullUsername() {
        return faker.internet.username();
    }

    public static GenerateFakeUserData() {
        return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 6, pattern: /[A-Za-z0-9!@#$%^&*]/ }),
            age: faker.number.int({ min: 0, max: 100 }).toString()
        };
    }

    public static GenerateInvalidUserData() {
        return {
            email: faker.internet.username(), 
            password: faker.internet.password({ length: 3 }), 
            age: faker.string.alpha(3), 
        };
    }

    public static GenerateEmptyUserData() {
        return {
            email: '',
            password: '',
            age: ''
        };
    }
}

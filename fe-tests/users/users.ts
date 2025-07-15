export function generateRandomEmail(): string {
    return `test${Math.floor(Math.random() * 10000)}@example.com`;
}

export function generateRandomPassword(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export function generateRandomAge(): number {
    return Math.floor(Math.random() * 100);
}

export const generateRandomName = () => Math.random().toString(36).substring(2, Math.floor(Math.random() * 5) + 3);

export const newUser = {
    email: generateRandomEmail(),
    password: generateRandomPassword(),
    age: generateRandomAge()
 };

 export const oldUser = {
    email: 'example@domen.ru',
    password: '12345678',
    age: 22
 };
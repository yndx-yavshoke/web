import { faker } from '@faker-js/faker';

export const LOGIN_EMAIL = 'dfdf@cs.su';
export const LOGIN_PASSWORD = 'qwerty';
export const LOGIN_AGE = '66';
export const LOGIN_AGE_STRING = 'два';


// Генерация почты
export function generateEmail(domain = 'example.com'): string {
    const timestamp = Date.now();
    return `user${timestamp}@${domain}`;
  }

  //генерация пароля

  export function generatePassword(minLength = 5, maxLength = 20): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      password += chars[idx];
    }
    return password;
  }

  // Генерация имени меньше 50 символов
export function generateUserName(): string {
  const minLength = 1;
  const maxLength = 50;

  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  // Генерируем слово и обрезаем до нужной длины
  const word = faker.internet.userName();

  return word.substring(0, length);
}

// Генерация имени больше 50 символов
function randomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for(let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  export function generateLongUserName(): string {
    const minLength = 51;
    const maxLength = 100;
  
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
    return randomString(length);
  }

  export function generateAge(minLength = 1, maxLength = 2): string {
    const chars = '0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      password += chars[idx];
    }
    return password;
  }
  
  
import { test as base } from '@playwright/test';

// Определение типов для фикстур
interface CustomFixtures {
  testUsersMainPage: {
    valid: { email: string },
    invalid: { email: string }
  };
  authData: {
    valid: { email: string; password: string },
    invalid: { email: string; password: string }
  };
  profileData: {
    ageGroups: {
      young: { age: number; status: string },
      adult: { age: number; status: string },
      senior: { age: number; status: string }
    }
  };
  loginUsers:{
    young_users:{email:string;password:string},
    adult_users:{email:string;password:string},
    old_users:{email:string;password:string}
  };
}

// Создаем и сразу экспортируем кастомный test
export const test = base.extend<CustomFixtures>({
  testUsersMainPage: async ({}, use) => {
    await use({
      valid: { email: 'test@yandex.ru' },
      invalid: { email: 'invalid-email@gmail' }
    });
  },
  
  authData: async ({}, use) => {
    await use({
      valid: { email: 'auth-valid@yandex.ru', password: 'ValidPass123!' },
      invalid: { email: 'auth-invalid@test.com', password: 'wrong' }
    });
  },

  //для входа в профиль
  loginUsers:async({},use)=>{
    await use({
   young_users:{email:"test500@yandex.ru",password:"qwerty"},
   old_users:{email:"al.colesnicov@gmail.com",password:"qwerty"},
   adult_users:{email:"test100@yandex.ru",password:"qwerty"}

    });
  },


  
  profileData: async ({}, use) => {
    await use({
      ageGroups: {
        young: { age: 18, status: 'Ты молоденький котик' },
        adult: { age: 45, status: 'Ты взрослый котик' },
        senior: { age: 75, status: 'Ты старый котик' }
      }
    });
  }
});

// Экспортируем expect
export { expect } from '@playwright/test';

//фикстуры не забудь в .gitignore
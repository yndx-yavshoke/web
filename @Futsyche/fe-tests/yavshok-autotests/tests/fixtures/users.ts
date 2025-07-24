// tests/fixtures/users.ts
// Интерфейсы для типизации
export interface AuthUser {
    email: string;
    password: string;
}

export interface RegUser extends AuthUser {
    age: number;
}

// Данные для АВТОРИЗАЦИИ (существующие пользователи)
export const authUsers = {
    youngCat: {
        email: "new_young@yavshok.ru",  
        password: "new_young_pass"           
    },
    adultCat: {
        email: "qwerty@yandex.ru", 
        password: "123456"          
    },
    oldCat: {
        email: "qw@qw.qw",    
        password: "qwqwqw"             
    }
};

// Данные для РЕГИСТРАЦИИ (новые пользователи)
export const regUsers = {
    youngCat: {
        email: "new_young2@yavshok.ru",      
        password: "new_young_pass",          
        age: 20                             // Возраст 0-21
    },
    adultCat: {
        email: "new_adult2@yavshok.ru",       
        password: "new_adult_pass",         
        age: 35                              // Возраст 22-68
    },
    oldCat: {
        email: "new_old2@yavshok.ru",         
        password: "new_old_pass",            
        age: 70                              // Возраст 69-99
    }
};
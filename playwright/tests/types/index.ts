export interface User {
    email: string;
    password: string;
    name?: string;
    age?: number;
}

export interface TestData {
    validUser: User;
    invalidUser: User;
    randomUser: User;
}

export type ShockStatus = 'in' | 'out';

export interface PageElements {
    title: string;
    emailInput: string;
    passwordInput?: string;
    submitButton: string;
    errorMessage?: string;
}

export interface RegistrationData {
    email: string;
    password: string;
    age: string;
    name?: string;
} 
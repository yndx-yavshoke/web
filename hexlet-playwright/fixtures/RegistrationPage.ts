import {Page, Locator} from '@playwright/test';


export class RegistrationPage {
    public userEmail: Locator;
    public userPassword: Locator;
    public userAge: Locator;
    public registrationButton: Locator;
    public backButton: Locator;
    public title: Locator;
    public textCountWord: Locator;
    public emailNull: Locator;
    public passwordNull: Locator;
    public ageNull: Locator;
    public alreadyRegister: Locator;
    public login: Locator;

    constructor (public readonly page: Page) {
        
        this.title = this.page.getByText('Регистрация в ШОКе', {exact: true});
        this.userEmail = this.page.getByTestId('register-email-input');
        this.userPassword = this.page.getByTestId('register-password-input');
        this.userAge = this.page.getByTestId('register-age-input');
        this.registrationButton = this.page.getByTestId('register-submit-button');
        this.backButton = this.page.getByTestId('register-back-button');
        this.textCountWord = this.page.getByText('Возраст должен быть числом', {exact: true});
        this.emailNull = this.page.getByText('Введите email', {exact: true});
        this.passwordNull = this.page.getByText('Введите пароль', {exact: true});
        this.ageNull = this.page.getByText('Введите возраст', {exact: true});
        this.alreadyRegister = this.page.getByText('Пользователь с таким email уже существует', {exact: true});
        this.login = this.page.getByText('Войти в ШОК', {exact: true});
 
            
          
        }
    
    public async open() {
        await this.page.goto('/register');
    
            
        }
    
    public async registration(email: string, password: string, age: string, valid: boolean) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.userAge.fill(age.toString());
        await this.registrationButton.click();
    
         
        }
    
    public async clickBack() {
    
        await this.backButton.click();
    
         
        }
    
    }
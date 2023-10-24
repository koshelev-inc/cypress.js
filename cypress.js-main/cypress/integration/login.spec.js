// Импорт библиотеки Cypress
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

// Задаем URL для тестируемой страницы
const loginUrl = 'http://login.qa.studio';

// Определяем правильные логин и пароль
const validLogin = 'german@dolnikov.ru';
const validPassword = 'iLoveqastudio1';

// Позитивный кейс авторизации
When('ввести правильный логин', () => {
  cy.visit(loginUrl);
  cy.get('#login-input').type(validLogin);
});

When('ввести правильный пароль', () => {
  cy.get('#password-input').type(validPassword);
});

When('нажать войти', () => {
  cy.get('#login-button').click();
});

Then('проверить нужный текст и наличие кнопки крестик', () => {
  cy.get('#success-message').should('contain', 'Авторизация успешна');
  cy.get('#close-button').should('exist');
});

// Тест логики восстановления пароля
When('нажать "Забыли пароль"', () => {
  cy.get('#forgot-password-link').click();
});

When('ввести любой имейл', () => {
  cy.get('#email-input').type('example@example.com');
});

Then('проверить, что получили нужный текст и есть кнопка крестика', () => {
  cy.get('#reset-password-message').should('contain', 'Письмо с инструкциями отправлено на вашу почту');
  cy.get('#close-button').should('exist');
});

// Негативный кейс авторизации (неправильный пароль)
When('ввести НЕ правильный пароль', () => {
  cy.visit(loginUrl);
  cy.get('#login-input').type(validLogin);
  cy.get('#password-input').type('wrongpassword');
  cy.get('#login-button').click();
});

Then('проверить нужный текст и наличие кнопки крестик', () => {
  cy.get('#error-message').should('contain', 'Неверный логин или пароль');
  cy.get('#close-button').should('exist');
});

// Негативный кейс авторизации (неправильный логин)
When('ввести НЕ правильный логин', () => {
  cy.visit(loginUrl);
  cy.get('#login-input').type('wrongemail');
  cy.get('#password-input').type(validPassword);
  cy.get('#login-button').click();
});

Then('проверить нужный текст и наличие кнопки крестик', () => {
  cy.get('#error-message').should('contain', 'Неверный логин или пароль');
  cy.get('#close-button').should('exist');
});

// Негативный кейс валидации (логин без @)
When('ввести логин без @', () => {
  cy.visit(loginUrl);
  cy.get('#login-input').type('invalidemail');
  cy.get('#password-input').type(validPassword);
  cy.get('#login-button').click();
});

Then('проверить, что получаем текст с ошибкой', () => {
  cy.get('#error-message').should('contain', 'Некорректный адрес электронной почты');
});

// Проверка на приведение к строчным буквам в логине
When('ввести логин GerMan@Dolnikov.ru', () => {
  cy.visit(loginUrl);
  cy.get('#login-input').type('GerMan@Dolnikov.ru');
  cy.get('#password-input').type(validPassword);
  cy.get('#login-button').click();
});

Then('проверить, что авторизация успешна', () => {
  cy.get('#success-message').should('contain', 'Авторизация успешна');
  cy.get('#close-button').should('exist');
});

// Завершение тестового сценария

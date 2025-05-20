import { loginPage } from '../support/pages/loginPage';

describe('Fitur Login OrangeHRM - POM Version', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('TC01 - Login dengan username & password valid', () => {
  cy.intercept('POST', '**/auth/login').as('postLogin');

  loginPage.fillUsername('Admin');
  loginPage.fillPassword('admin123');
  loginPage.submit();

  cy.wait('@postLogin').then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });

  cy.url().should('include', '/dashboard');
});


  it('TC02 - Gagal login: username tidak valid', () => {
    loginPage.enterUsername('salahuser');
    loginPage.enterPassword('admin123');
    loginPage.clickLogin();

    loginPage.getAlertMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC03 - Gagal login: password tidak valid', () => {
    loginPage.enterUsername('Admin');
    loginPage.enterPassword('salahpass');
    loginPage.clickLogin();

    loginPage.getAlertMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC04 - Gagal login: username & password tidak valid', () => {
    loginPage.enterUsername('wrong');
    loginPage.enterPassword('wrong');
    loginPage.clickLogin();

    loginPage.getAlertMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC05 - Validasi: username & password kosong', () => {
    loginPage.clickLogin();

    loginPage.getValidationMessage()
      .should('have.length.at.least', 1)
      .and('contain', 'Required');
  });

  it('TC06 - Validasi: username kosong', () => {
    loginPage.enterPassword('admin123');
    loginPage.clickLogin();

    loginPage.getValidationMessage()
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC07 - Validasi: password kosong', () => {
    loginPage.enterUsername('Admin');
    loginPage.clickLogin();

    loginPage.getValidationMessage()
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC08 - Tetap di halaman login saat gagal login', () => {
    loginPage.enterUsername('wrong');
    loginPage.enterPassword('wrong');
    loginPage.clickLogin();

    loginPage.getAlertMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });
});

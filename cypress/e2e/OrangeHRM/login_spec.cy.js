describe('Fitur Login OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
  });

  it('TC01 - Login sukses dengan username dan password valid', () => {
  // Ganti intercept target ke request yang muncul setelah login sukses
  cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('dashboardRequest');

  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.wait('@dashboardRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.url().should('include', '/dashboard');
});

  it('TC02 - Login gagal: username tidak valid, password valid', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('loginRequest');

    cy.get('input[name="username"]').type('userinvalid');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

   cy.get('.oxd-alert-content-text')
  .should('be.visible')
  .and('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC03 - Login gagal: username valid, password tidak valid', () => {
   
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salahpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC04 - Login gagal: username dan password tidak valid', () => {
    cy.get('input[name="username"]').type('invalid');
    cy.get('input[name="password"]').type('invalid');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC05 - Validasi muncul saat username dan password kosong', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 1)
      .and('contain', 'Required');
  });

  it('TC06 - Validasi muncul saat username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC07 - Validasi muncul saat password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC08 - Tetap di halaman login saat gagal login', () => {
    cy.get('input[name="username"]').type('salahuser');
    cy.get('input[name="password"]').type('salahpass');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });
});
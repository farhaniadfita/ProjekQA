class LoginPage {
  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  enterUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  getAlertMessage() {
    return cy.get('.oxd-alert-content-text');
  }

  getValidationMessage() {
    return cy.get('.oxd-input-field-error-message');
  }
}

export const loginPage = new LoginPage();

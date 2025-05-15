export const dashboardPage = {
  verifyUrl() {
    cy.url().should('include', '/dashboard');
  },

  checkWidgetTimeAtWork() {
    cy.get('p.oxd-text--title').contains('Time at Work').should('be.visible');
  },

  checkWidgetQuickLaunch() {
    cy.get('.oxd-text--widget-title').contains('Quick Launch').should('be.visible');
  },

  checkWidgetMyActions() {
    cy.get('.oxd-text--widget-title').contains('My Actions').should('be.visible');
  }
};

describe('Summary Page', function() {
  it('connects to ipa', function() {
    cy.visit('https://ipa.ucdavis.edu');
  });

  it('has a login button', () => {
    cy.contains('Log in').click();
  });

  it('redirects to CAS login', () => {
    cy.location().should(loc => {
      expect(loc.origin).to.eq('https://cas.ucdavis.edu');
    });
  });

  it('accepts user login', () => {
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#submit').click();
  });

  it('redirects to summary after login', () => {
    cy.get('h3').contains('Summary');
    cy.contains(new Date().getFullYear());
  });
});

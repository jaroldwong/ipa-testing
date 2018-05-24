describe('courses page', () => {
  before(() => {
    cy.loginAndVisit();
  });

  it('navigates to Courses page from Summary', () => {
    cy.contains('Courses').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.contain('courses');
    });
  });

  it('contains a courses table', () => {
    cy.get('table[course-table]');
  });
});

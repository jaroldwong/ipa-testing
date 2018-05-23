describe('instructors page', () => {
  before(() => {
    cy.login();
  });

  it('navigates to the Assign Instructors page', () => {
    cy.contains('Instructors').click();
    cy.contains('Assign Instructors').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.contains('assignments');
    });
    cy.contains('Assignments');
  });

  it('assign instructor to ECS10', () => {
    cy
      .contains('ECS 010')
      .parents('div.course-list-row')
      .within($row => {
        cy.get('.dropdown').click();
      });
  });
});

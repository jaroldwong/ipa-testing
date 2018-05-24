describe('instructors page', () => {
  before(() => {
    cy.loginAndVisit();
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
        cy.contains('Jarold Wong').click();
        cy.get('div.alert').contains('Jarold Wong');
      });

    // cy.get('.toast').contains('Assigned Instructor');
  });
});

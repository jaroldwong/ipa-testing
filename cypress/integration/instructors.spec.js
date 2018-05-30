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

  it('assigns instructor to ECS10', () => {
    cy
      .contains('ECS 010')
      .parents('div.course-list-row')
      .as('row')
      .within($row => {
        cy.get('.dropdown').click();
        cy.contains('Jarold Wong').click();
      });

    cy.get('@row').contains('Jarold Wong');

    // cy.get('.toast').contains('Assigned instructor to course');
  });

  it('removes assigned instructor from ECS10', () => {
    cy
      .contains('ECS 010')
      .parents('div.course-list-row')
      .contains('Jarold Wong')
      .find('.assignment-remove')
      .click();

    cy.get('[data-event-type=deleteAssignment]').click();

    // cy.get('.toast').contains('Removed instructor from course');
  });
});

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

  it('removes ECS courses from 2018-19', () => {
    cy.get('[data-event-type=selectAllCourseRows].checkbox-container').click();
    cy.get('span.tool-icon.glyphicon.glyphicon-trash').click();
    cy.get('.delete-course-modal-footer').within($modal => {
      cy.server();
      cy.route('PUT', '**/courseView/**').as('deleteCourses');
      cy.get('button.btn-danger').click();
    });
    cy.wait('@deleteCourses');
  });

  it('adds ECS courses from 2015-16', () => {
    cy.get('.glyphicon-plus').click();
    cy.contains('Add Multiple Courses');

    cy
      .contains('Source')
      .next('.col-sm-4')
      .within($col => {
        cy.get('.selectize-control').click();
        cy.get('[data-value=Banner]').click();
      });

    cy
      .contains('Subject Code')
      .next('.col-sm-4')
      .within($col => {
        cy.get('.selectize-control').click();
        cy.get('[data-value=ECS]').click();
      });

    cy
      .contains('Academic Year')
      .next('.col-sm-4')
      .within($col => {
        cy.get('.selectize-control').click();
        cy.get('[data-value=2015]').click();
      });

    //https://dw.dss.ucdavis.edu/sections/search?subjectCode=ECS&academicYear=2015&token=dssit
    cy.server();
    cy.route('GET', '**/sections/**').as('getSections');
    cy.contains('Search Banner').click();
    cy.wait('@getSections');

    cy.server();
    //https://api.ipa.ucdavis.edu/api/courseView/workgroups/20/years/2018/sectionGroups?importTimes=false&importAssignments=false
    cy.route('POST', '**/courseView/**').as('postCourses');

    cy.contains('Import courses').click();
    cy.wait('@postCourses');

    // div.toast-title
    cy.get('.toast-title').contains('Created');

    cy.contains('ECS 010 - A');
  });
});

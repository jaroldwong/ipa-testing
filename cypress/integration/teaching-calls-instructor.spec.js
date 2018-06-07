describe('instructor can respond to a teaching call', () => {
  before(() => {
    cy.loginAndVisit('summary/20/2019?mode=instructor');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  // TODO: decouple tests
  it('shows active teaching calls', () => {
    cy.contains('Teaching Call for Review');
  });

  it('loads active teaching call form', () => {
    cy.get('.teaching-calls-table__button').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/teachingCalls/20/2019/teachingCall');
    });
    cy.contains('Teaching Call');
    cy.contains('Teaching Preferences');
    cy.contains('Academic Term');
  });

  it('shows all three configured quarters', () => {
    cy.get('.teaching-call--academic-term-sidebar li').as('list');

    cy.get('@list').should('have.length', 3);
  });

  it('should be able to add a preference', () => {
    cy.get('.search-course-container').click();
    cy.contains('ECS 010 Intro to Programming').click();

    cy.get('.preference-cell.outline > div').should(
      'contain',
      'ECS 010 Intro to Programming'
    );
  });

  it('should be able to remove a preference', () => {
    cy.get('.remove-preference-btn')
      .first()
      .click();
    cy.get('.confirmbutton-yes').click();
    cy.get('.preference-cell.outline > div').should(
      'not.contain',
      'ECS 010 Intro to Programming'
    );
  });

  it('should be able to re-order a preference', () => {
    cy.visit('/teachingCalls/20/2019/teachingCall');

    // TODO: use routes instead of UI to build up state

    // Add three courses
    cy.get('.search-course-container').click();
    cy.contains('ECS 010 Intro to Programming').click();
    cy.get('.preference-cell.outline > div').should(
      'contain',
      'ECS 010 Intro to Programming'
    );

    cy.get('.search-course-container').click();
    cy.contains('ECS 020 Discrete Math for CS').click();
    cy.get('.preference-cell.outline > div').should(
      'contain',
      'ECS 020 Discrete Math for CS'
    );

    cy.get('.search-course-container').click();
    cy.contains('ECS 030 Programming&Prob Solving').click();

    cy.get('.preference-cell.outline > div').should(
      'contain',
      'ECS 030 Programming&Prob Solving'
    );

    // Find ECS30 and click up twice
    cy.contains('ECS 030')
      .closest('.preference-row')
      .within($row => {
        cy.get('.glyphicon-chevron-up').as('upArrow');
      });

    cy.server();
    cy.route('PUT', '**/teachingAssignments').as('putReorder');
    cy.get('@upArrow').click();
    cy.wait('@putReorder');

    cy.server();
    cy.route('PUT', '**/teachingAssignments').as('putReorder');
    cy.get('@upArrow').click();
    cy.wait('@putReorder');

    // Final order is ECS30, ECS20, ECS10
    cy.get(':nth-child(2) > .preference-cell > div').should(
      'contain',
      'ECS 030 Programming&Prob Solving'
    );
    cy.get(':nth-child(3) > .preference-cell > div').should(
      'contain',
      'ECS 010 Intro to Programming'
    );
    cy.get(':nth-child(4) > .preference-cell > div').should(
      'contain',
      'ECS 020 Discrete Math for CS'
    );

    // remove courses after
    cy.server();
    cy.route('DELETE', '**/preferences/**').as('deletePref');
    cy.get('.remove-preference-btn')
      .first()
      .click();
    cy.get('.confirmbutton-yes').click();
    cy.wait('@deletePref');

    cy.server();
    cy.route('DELETE', '**/preferences/**').as('deletePref');
    cy.get('.remove-preference-btn')
      .first()
      .click();
    cy.get('.confirmbutton-yes').click();
    cy.wait('@deletePref');

    cy.server();
    cy.route('DELETE', '**/preferences/**').as('deletePref');
    cy.get('.remove-preference-btn')
      .first()
      .click();
    cy.get('.confirmbutton-yes').click();
    cy.wait('@deletePref');
  });

  it('should be able to indicate unavailabilities', () => {
    cy.visit('/teachingCalls/20/2019/teachingCall');

    cy.get('.left')
      .contains('7')
      .parent('tr')
      .within($row => {
        cy.get('td').click({ multiple: true });
      });

    cy.get('.left')
      .contains('8')
      .parent('tr')
      .within($row => {
        cy.get('td').click({ multiple: true });
      });

    cy.get('.left')
      .contains('7')
      .parent('tr')
      .within($row => {
        cy.get('td')
          .filter('.unavailable')
          .should('have.length', '5');
      });

    cy.get('.left')
      .contains('8')
      .parent('tr')
      .within($row => {
        cy.get('td')
          .filter('.unavailable')
          .should('have.length', '5');
      });
  });

  it('should be able to leave a comment', () => {
    cy.get('textarea').type('{selectall}This is a comment');
    cy.get('textarea').should('have.value', 'This is a comment');
  });

  it('should be able to leave different preferences on different terms', () => {});
  it('should be able to submit preferences', () => {});

  it('should be able to reload the page and see all information saved', () => {
    cy.visit('/teachingCalls/20/2019/teachingCall');
    cy.get('.table.availability-grid').then($grid => {
      const grid = $grid;
      cy.reload().then(() => {
        cy.get('.table.availability-grid').should($grid => {
          expect(grid.is('.table.availability-grid')).to.be.true;
        });
      });
    });
  });

  it('should be able to see on the instructor summary screen that they have responded to a teaching call', () => {});
});

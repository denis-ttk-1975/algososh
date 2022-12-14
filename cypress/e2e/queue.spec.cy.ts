import * as constants from './constant';

describe('Queue component tests', function () {
  beforeEach(() => {
    cy.visit('queue');
  });

  it('should open queue page', () => {
    cy.contains('Очередь');
  });

  it('button should be inactive while no value in input', () => {
    cy.get(constants.ID_INPUT).should('has.value', '');
    cy.get(constants.ID_BUTTON_ADD).should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get(constants.ID_INPUT).type('5');
    cy.get(constants.ID_BUTTON_ADD).should('be.enabled');
  });

  it('click add button and queue adding correctly', () => {
    cy.clock();
    cy.get(constants.ID_INPUT).type('A');

    cy.get(constants.ID_BUTTON_ADD).click();
    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index > 0) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
        cy.wrap(elem).should('value', '');
      }
    });
    cy.tick(500);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index > 0) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
        cy.wrap(elem).should('value', '');
      }
    });

    cy.get(constants.ID_INPUT).type('B');
    cy.get(constants.ID_BUTTON_ADD).click();

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains('B');
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index > 1) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
        cy.wrap(elem).should('value', '');
      }
    });

    cy.tick(500);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains('B');
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index > 1) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
        cy.wrap(elem).should('value', '');
      }
    });

    cy.clock().invoke('restore');
  });

  it('click delete button and queue remove element correctly', () => {
    cy.get(constants.ID_INPUT).type('A');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.get(constants.ID_INPUT).type('B');
    cy.get(constants.ID_BUTTON_ADD).click();

    cy.clock();

    cy.get(constants.ID_BUTTON_DELETE).click();
    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('value', '');
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains('B');
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index > 1) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
        cy.wrap(elem).should('value', '');
      }
    });

    cy.tick(500);

    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_INPUT).type('C');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.get(constants.ID_CLASS_CIRCLE).eq(2).contains('C');

    cy.clock().invoke('restore');
  });

  it('click clear button and queue cleared correctly', () => {
    cy.get(constants.ID_INPUT).type('A');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.get(constants.ID_INPUT).type('B');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.get(constants.ID_BUTTON_PURGE).click();
    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
      cy.wrap(elem).should('value', '');
    });
  });
});

import * as constants from './constant';

describe('Fibonacci component tests', function () {
  beforeEach(() => {
    cy.visit('fibonacci');
  });

  it('should open fibonacci page', () => {
    cy.contains('Фибоначчи');
  });

  it('button should be inactive while no value in input', () => {
    cy.get(constants.ID_INPUT).should('has.value', '');
    cy.get(constants.ID_BUTTON).should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get(constants.ID_INPUT).type('5');
    cy.get(constants.ID_BUTTON).should('be.enabled');
  });

  it('click button and fibonacci row rendered correсtly', () => {
    cy.get(constants.ID_INPUT).type('5');
    cy.clock();
    cy.get(constants.ID_BUTTON).click();
    cy.tick(1001);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 1);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains(1);
    cy.tick(1000);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 2);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains(1);
    cy.tick(1000);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 3);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(2).contains(2);
    cy.tick(1000);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 4);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(2).contains(2);
    cy.get(constants.ID_CLASS_CIRCLE).eq(3).contains(3);
    cy.tick(1000);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 5);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(2).contains(2);
    cy.get(constants.ID_CLASS_CIRCLE).eq(3).contains(3);
    cy.get(constants.ID_CLASS_CIRCLE).eq(4).contains(5);
    cy.tick(1000);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 6);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains(1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(2).contains(2);
    cy.get(constants.ID_CLASS_CIRCLE).eq(3).contains(3);
    cy.get(constants.ID_CLASS_CIRCLE).eq(4).contains(5);
    cy.get(constants.ID_CLASS_CIRCLE).eq(5).contains(8);

    cy.clock().invoke('restore');
  });
});

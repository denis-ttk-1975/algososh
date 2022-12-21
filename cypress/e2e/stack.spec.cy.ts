import * as constants from './constant';

describe('Stack component tests', function () {
  beforeEach(() => {
    cy.visit('stack');
  });

  it('should open string page', () => {
    cy.contains('Стек');
  });

  it('button should be inactive while no value in input', () => {
    cy.get(constants.ID_INPUT).should('has.value', '');
    cy.get(constants.ID_BUTTON_ADD).should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get(constants.ID_INPUT).type('5');
    cy.get(constants.ID_BUTTON_ADD).should('be.enabled');
  });

  it('click add button and stack add elem correсtly', () => {
    cy.clock();
    cy.get(constants.ID_INPUT).type('A');
    cy.get(constants.ID_BUTTON_ADD).click();

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 1);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');

    cy.tick(500);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 1);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');

    cy.get(constants.ID_INPUT).type('B');
    cy.get(constants.ID_BUTTON_ADD).click();

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 2);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).contains('B');

    cy.clock().invoke('restore');
  });

  it('click delete button and stack delete elem correсtly', () => {
    cy.clock();
    cy.get(constants.ID_INPUT).type('A');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.tick(501);
    cy.get(constants.ID_INPUT).type('B');
    cy.get(constants.ID_BUTTON_ADD).click();

    cy.get(constants.ID_BUTTON_DELETE).click();
    cy.tick(500);

    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 1);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).contains('A');
    cy.clock().invoke('restore');
  });

  it('click clear button and stack cleared correсtly', () => {
    cy.clock();
    cy.get(constants.ID_INPUT).type('A');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.tick(501);
    cy.get(constants.ID_INPUT).type('B');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.tick(501);
    cy.get(constants.ID_INPUT).type('C');
    cy.get(constants.ID_BUTTON_ADD).click();
    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 3);
    cy.tick(1);
    cy.get(constants.ID_BUTTON_PURGE).click();
    cy.tick(501);
    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 0);

    cy.clock().invoke('restore');
  });
});

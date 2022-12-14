import * as constants from './constant';

describe('String component tests', function () {
  beforeEach(() => {
    cy.visit('recursion');
  });

  it('should open string page', () => {
    cy.contains('Строка');
  });

  it('button should be inactive while no value in input', () => {
    cy.get(constants.ID_INPUT_STRING).should('has.value', '');
    cy.get(constants.ID_BUTTON).should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get(constants.ID_INPUT_STRING).type('1234');
    cy.get(constants.ID_BUTTON).should('be.enabled');
  });

  it('click button and string unwrapping correсtly', () => {
    cy.get(constants.ID_INPUT_STRING).type('123');
    cy.clock();
    cy.get(constants.ID_BUTTON).click();

    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
      if (index === 0) cy.wrap(elem).contains('1');
      if (index === 1) cy.wrap(elem).contains('2');
      if (index === 2) cy.wrap(elem).contains('3');
    });

    cy.tick(1000);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index === 0) cy.wrap(elem).contains('1') && cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
      if (index === 1) cy.wrap(elem).contains('2') && cy.wrap(elem).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES);
      if (index === 2) cy.wrap(elem).contains('3') && cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
    });

    cy.tick(1000);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index === 0) cy.wrap(elem).contains('3') && cy.wrap(elem).should('have.css', 'border', constants.ID_MODIFIED_ATTRIBUTES);
      if (index === 1) cy.wrap(elem).contains('2') && cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
      if (index === 2) cy.wrap(elem).contains('1') && cy.wrap(elem).should('have.css', 'border', constants.ID_MODIFIED_ATTRIBUTES);
    });

    cy.tick(1000);
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index === 0) cy.wrap(elem).contains('3') && cy.wrap(elem).should('have.css', 'border', constants.ID_MODIFIED_ATTRIBUTES);
      if (index === 1) cy.wrap(elem).contains('2') && cy.wrap(elem).should('have.css', 'border', constants.ID_MODIFIED_ATTRIBUTES);
      if (index === 2) cy.wrap(elem).contains('1') && cy.wrap(elem).should('have.css', 'border', constants.ID_MODIFIED_ATTRIBUTES);
    });

    cy.clock().invoke('restore');
  });
});

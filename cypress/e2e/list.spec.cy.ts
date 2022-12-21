import * as constants from './constant';

describe('List component tests', function () {
  beforeEach(() => {
    cy.visit('list');
  });

  it('should open List page', () => {
    cy.contains('Связный список');
  });

  it('button should be inactive while no value in input', () => {
    cy.get(constants.ID_VALUE_INPUT).should('has.value', '');
    cy.get(constants.ID_BUTTON_ADD_FIRST).should('be.disabled');
    cy.get(constants.ID_BUTTON_ADD_LAST).should('be.disabled');
    cy.get(constants.ID_BUTTON_ADD_WITH_INDEX).should('be.disabled');
    cy.get(constants.ID_BUTTON_DELETE_WITH_INDEX).should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get(constants.ID_VALUE_INPUT).type('A');
    cy.get(constants.ID_BUTTON_ADD_FIRST).should('be.enabled');
    cy.get(constants.ID_BUTTON_ADD_LAST).should('be.enabled');
    cy.get(constants.ID_BUTTON_ADD_WITH_INDEX).should('be.disabled');
    cy.get(constants.ID_BUTTON_DELETE_WITH_INDEX).should('be.disabled');
    cy.get(constants.ID_INDEX_INPUT).type('2');
    cy.get(constants.ID_BUTTON_ADD_WITH_INDEX).should('be.enabled');
    cy.get(constants.ID_BUTTON_DELETE_WITH_INDEX).should('be.enabled');
  });

  it('default list parsing', () => {
    cy.get(constants.ID_CLASS_CIRCLE).should('have.length', 7);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('3');
    cy.get(constants.ID_CLASS_CIRCLE).eq(3).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('75');
    cy.get(constants.ID_CLASS_CIRCLE).eq(6).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('2007');
  });

  it('add first element', () => {
    cy.clock();
    cy.get(constants.ID_VALUE_INPUT).type('BB');
    cy.get(constants.ID_BUTTON_ADD_FIRST).click();

    cy.get(constants.ID_CLASS_CIRCLE_CONTENT).find(constants.ID_CLASS_CIRCLE_SMALL).eq(0).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES).contains('BB');
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('3');
    cy.tick(1005);
    cy.wait(5);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('BB');
    cy.get(constants.ID_CLASS_CIRCLE).eq(1).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('3');

    cy.clock().invoke('restore');
  });

  it('add last element', () => {
    cy.clock();
    cy.get(constants.ID_VALUE_INPUT).type('CC');
    cy.get(constants.ID_BUTTON_ADD_LAST).click();

    cy.get(constants.ID_CLASS_CIRCLE_CONTENT).find(constants.ID_CLASS_CIRCLE_SMALL).eq(0).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES).contains('CC');
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index < 7) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
      }
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(7).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('2007');
    cy.tick(1005);
    cy.wait(5);
    cy.get(constants.ID_CLASS_CIRCLE).eq(7).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('CC');
    cy.get(constants.ID_CLASS_CIRCLE).eq(6).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('2007');

    cy.clock().invoke('restore');
  });

  it('add third element', () => {
    cy.clock();
    cy.get(constants.ID_VALUE_INPUT).type('DD');
    cy.get(constants.ID_INDEX_INPUT).type('3');
    cy.get(constants.ID_BUTTON_ADD_WITH_INDEX).click();

    cy.get(constants.ID_CLASS_CIRCLE_CONTENT).find(constants.ID_CLASS_CIRCLE_SMALL).eq(0).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES).contains('DD');
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index < 4) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
      }
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(4).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('75');
    cy.tick(1005);
    cy.wait(5);
    cy.get(constants.ID_CLASS_CIRCLE).eq(3).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('DD');
    cy.get(constants.ID_CLASS_CIRCLE).eq(4).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('75');

    cy.clock().invoke('restore');
  });

  it('delete first element', () => {
    cy.clock();

    cy.get(constants.ID_BUTTON_DELETE_FIRST).click();

    cy.get(constants.ID_CLASS_CIRCLE_CONTENT).find(constants.ID_CLASS_CIRCLE_SMALL).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES).contains('3');
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).should('value', '');
    cy.get(constants.ID_CLASS_CIRCLE).eq(2).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('8');
    cy.tick(1005);
    cy.wait(5);
    cy.get(constants.ID_CLASS_CIRCLE).eq(0).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('8');

    cy.clock().invoke('restore');
  });

  it('delete last element', () => {
    cy.clock();

    cy.get(constants.ID_BUTTON_DELETE_LAST).click();

    cy.get(constants.ID_CLASS_CIRCLE_CONTENT).find(constants.ID_CLASS_CIRCLE_SMALL).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES).contains('2007');
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index < 6) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
      }
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(6).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).should('value', '');
    cy.tick(1005);
    cy.wait(5);
    cy.get(constants.ID_CLASS_CIRCLE).eq(5).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('03');

    cy.clock().invoke('restore');
  });

  it('delete third element', () => {
    cy.clock();

    cy.get(constants.ID_INDEX_INPUT).type('3');
    cy.get(constants.ID_BUTTON_DELETE_WITH_INDEX).click();

    cy.get(constants.ID_CLASS_CIRCLE_CONTENT).find(constants.ID_CLASS_CIRCLE_SMALL).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES).contains('75');
    cy.get(constants.ID_CLASS_CIRCLE).each((elem, index) => {
      if (index < 3) {
        cy.wrap(elem).should('have.css', 'border', constants.ID_CHANGING_ATTRIBUTES);
      }
    });
    cy.get(constants.ID_CLASS_CIRCLE).eq(3).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).should('value', '');
    cy.tick(1005);
    cy.wait(5);
    cy.get(constants.ID_CLASS_CIRCLE).eq(3).should('have.css', 'border', constants.ID_DEFAULT_ATTRIBUTES).contains('7');

    cy.clock().invoke('restore');
  });
});

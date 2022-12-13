describe('Stack component tests', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('should open string page', () => {
    cy.contains('Стек');
  });

  it('button should be inactive while no value in input', () => {
    cy.get('[data-testid=input]').should('has.value', '');
    cy.get('[data-testid=add]').should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get('[data-testid=input]').type('5');
    cy.get('[data-testid=add]').should('be.enabled');
  });

  it('click add button and stack add elem correсtly', () => {
    cy.clock();
    cy.get('[data-testid=input]').type('A');
    cy.get('[data-testid=add]').click();

    cy.get('[class^="circle_circle"]').should('have.length', 1);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains('A');

    cy.tick(500);

    cy.get('[class^="circle_circle"]').should('have.length', 1);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains('A');

    cy.get('[data-testid=input]').type('B');
    cy.get('[data-testid=add]').click();

    cy.get('[class^="circle_circle"]').should('have.length', 2);
    cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('[class^="circle_circle"]').eq(0).contains('A');
    cy.get('[class^="circle_circle"]').eq(1).contains('B');

    cy.clock().invoke('restore');
  });

  it('click delete button and stack delete elem correсtly', () => {
    cy.clock();
    cy.get('[data-testid=input]').type('A');
    cy.get('[data-testid=add]').click();
    cy.get('[data-testid=input]').type('B');
    cy.get('[data-testid=add]').click();

    cy.get('[data-testid=delete]').click();
    cy.tick(500);

    cy.get('[class^="circle_circle"]').should('have.length', 1);
    cy.get('[class^="circle_circle"]').eq(0).contains('A');
    cy.clock().invoke('restore');
  });

  it('click clear button and stack cleared correсtly', () => {
    cy.clock();
    cy.get('[data-testid=input]').type('A');
    cy.get('[data-testid=add]').click();
    cy.get('[data-testid=input]').type('B');
    cy.get('[data-testid=add]').click();
    cy.get('[data-testid=input]').type('C');
    cy.get('[data-testid=add]').click();
    cy.get('[class^="circle_circle"]').should('have.length', 3);
    cy.tick(1);
    cy.get('[data-testid=purge]').click();
    cy.tick(501);
    cy.get('[class^="circle_circle"]').should('have.length', 0);

    cy.clock().invoke('restore');
  });
});

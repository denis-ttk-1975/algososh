describe('Fibonacci component tests', function () {
  beforeEach(() => {
    cy.visit('fibonacci');
  });

  it('should open fibonacci page', () => {
    cy.contains('Фибоначчи');
  });

  it('button should be inactive while no value in input', () => {
    cy.get('[data-testid=input]').should('has.value', '');
    cy.get('[data-testid=button]').should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get('[data-testid=input]').type('5');
    cy.get('[data-testid=button]').should('be.enabled');
  });

  it('click button and fibonacci row rendered correсtly', () => {
    cy.get('[data-testid=input]').type('5');
    cy.clock();
    cy.get('[data-testid=button]').click();
    cy.tick(1001);

    cy.get('[class^="circle_circle"]').should('have.length', 1);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains(1);
    cy.tick(1000);

    cy.get('[class^="circle_circle"]').should('have.length', 2);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains(1);
    cy.get('[class^="circle_circle"]').eq(1).contains(1);
    cy.tick(1000);

    cy.get('[class^="circle_circle"]').should('have.length', 3);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains(1);
    cy.get('[class^="circle_circle"]').eq(1).contains(1);
    cy.get('[class^="circle_circle"]').eq(2).contains(2);
    cy.tick(1000);

    cy.get('[class^="circle_circle"]').should('have.length', 4);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains(1);
    cy.get('[class^="circle_circle"]').eq(1).contains(1);
    cy.get('[class^="circle_circle"]').eq(2).contains(2);
    cy.get('[class^="circle_circle"]').eq(3).contains(3);
    cy.tick(1000);

    cy.get('[class^="circle_circle"]').should('have.length', 5);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains(1);
    cy.get('[class^="circle_circle"]').eq(1).contains(1);
    cy.get('[class^="circle_circle"]').eq(2).contains(2);
    cy.get('[class^="circle_circle"]').eq(3).contains(3);
    cy.get('[class^="circle_circle"]').eq(4).contains(5);
    cy.tick(1000);

    cy.get('[class^="circle_circle"]').should('have.length', 6);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[class^="circle_circle"]').eq(0).contains(1);
    cy.get('[class^="circle_circle"]').eq(1).contains(1);
    cy.get('[class^="circle_circle"]').eq(2).contains(2);
    cy.get('[class^="circle_circle"]').eq(3).contains(3);
    cy.get('[class^="circle_circle"]').eq(4).contains(5);
    cy.get('[class^="circle_circle"]').eq(5).contains(8);

    cy.clock().invoke('restore');
  });
});

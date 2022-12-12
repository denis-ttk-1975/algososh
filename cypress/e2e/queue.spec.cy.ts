describe('Queue component tests', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it('should open queue page', () => {
    cy.contains('Очередь');
  });

  it('button should be inactive while no value in input', () => {
    cy.get('[data-testid=input]').should('has.value', '');
    cy.get('[data-testid=add]').should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get('[data-testid=input]').type('5');
    cy.get('[data-testid=add]').should('be.enabled');
  });

  it('click add button and queue adding correctly', () => {
    cy.clock();
    cy.get('[data-testid=input]').type('A');

    cy.get('[data-testid=add]').click();
    cy.get('[class^="circle_circle"]').should('have.length', 7);
    cy.get('[class^="circle_circle"]').eq(0).contains('A');
    cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index > 0) {
        cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.wrap(elem).should('value', '');
      }
    });
    cy.tick(500);

    cy.get('[class^="circle_circle"]').should('have.length', 7);
    cy.get('[class^="circle_circle"]').eq(0).contains('A');
    cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index > 0) {
        cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.wrap(elem).should('value', '');
      }
    });

    cy.get('[data-testid=input]').type('B');
    cy.get('[data-testid=add]').click();

    cy.get('[class^="circle_circle"]').should('have.length', 7);
    cy.get('[class^="circle_circle"]').eq(0).contains('A');
    cy.get('[class^="circle_circle"]').eq(1).contains('B');
    cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index > 1) {
        cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.wrap(elem).should('value', '');
      }
    });

    cy.tick(500);

    cy.get('[class^="circle_circle"]').should('have.length', 7);
    cy.get('[class^="circle_circle"]').eq(0).contains('A');
    cy.get('[class^="circle_circle"]').eq(1).contains('B');
    cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index > 1) {
        cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.wrap(elem).should('value', '');
      }
    });

    cy.clock().invoke('restore');
  });

  it('click delete button and queue remove element correctly', () => {
    cy.get('[data-testid=input]').type('A');
    cy.get('[data-testid=add]').click();
    cy.get('[data-testid=input]').type('B');
    cy.get('[data-testid=add]').click();

    cy.clock();

    cy.get('[data-testid=delete]').click();
    cy.get('[class^="circle_circle"]').should('have.length', 7);
    cy.get('[class^="circle_circle"]').should('have.length', 7);
    cy.get('[class^="circle_circle"]').eq(0).should('value', '');
    cy.get('[class^="circle_circle"]').eq(1).contains('B');
    cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index > 1) {
        cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.wrap(elem).should('value', '');
      }
    });

    cy.tick(500);

    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
    cy.get('[data-testid=input]').type('C');
    cy.get('[data-testid=add]').click();
    cy.get('[class^="circle_circle"]').eq(2).contains('C');

    cy.clock().invoke('restore');
  });

  it('click clear button and queue cleared correctly', () => {
    cy.get('[data-testid=input]').type('A');
    cy.get('[data-testid=add]').click();
    cy.get('[data-testid=input]').type('B');
    cy.get('[data-testid=add]').click();
    cy.get('[data-testid=purge]').click();
    cy.get('[class^="circle_circle"]').should('have.length', 7);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      cy.wrap(elem).should('value', '');
    });
  });
});

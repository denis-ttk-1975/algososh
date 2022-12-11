describe('List component tests', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('should open List page', () => {
    cy.contains('Связный список');
  });

  it('button should be inactive while no value in input', () => {
    cy.get('[data-testid=value-input]').should('has.value', '');
    cy.get('[data-testid=addFirst]').should('be.disabled');
    cy.get('[data-testid=addLast]').should('be.disabled');
    cy.get('[data-testid=addWithIndex]').should('be.disabled');
    cy.get('[data-testid=deleteWithIndex]').should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get('[data-testid=value-input]').type('A');
    cy.get('[data-testid=addFirst]').should('be.enabled');
    cy.get('[data-testid=addLast]').should('be.enabled');
    cy.get('[data-testid=addWithIndex]').should('be.disabled');
    cy.get('[data-testid=deleteWithIndex]').should('be.disabled');
    cy.get('[data-testid=index-input]').type('2');
    cy.get('[data-testid=addWithIndex]').should('be.enabled');
    cy.get('[data-testid=deleteWithIndex]').should('be.enabled');
  });

  it('default list parsing', () => {
    cy.get('[class^="circle_circle"]').should('have.length', 7);
  });

  it('add first element', () => {
    cy.clock();
    cy.get('[data-testid=value-input]').type('BB');
    cy.get('[data-testid=addFirst]').click();

    cy.get('[class^="circle_content"]').find('[class*="small"]').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('BB');
    cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('3');
    cy.tick(1005);
    cy.wait(5);
    cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('BB');
    cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('3');

    // cy.get(CIRCLE_CIRCLE).each(($div, index) => {
    //   if (index === 0) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('50');
    // });
    // //проверка курсора head
    // cy.get(CIRCLE_CONTENT).each(($div, index) => {
    //   if (index === 0) {
    //     cy.wrap($div).first().contains('head');
    //   }
    // });
    // cy.get(CIRCLE_CIRCLE).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    // cy.get(INPUT__PLACEHOLDER_TEXT).clear();
    cy.clock().invoke('restore');
  });

  // it('click button and string unwrapping correсtly', () => {
  //   cy.clock();
  //   cy.get('[data-testid=input]').type('A');

  //   cy.get('[data-testid=add]').click();
  //   cy.get('[class^="circle_circle"]').should('have.length', 7);
  //   cy.get('[class^="circle_circle"]').eq(0).contains('A');
  //   cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //   cy.get('[class^="circle_circle"]').each((elem, index) => {
  //     if (index > 0) {
  //       cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //       cy.wrap(elem).should('value', '');
  //     }
  //   });
  //   cy.tick(500);

  //   cy.get('[class^="circle_circle"]').should('have.length', 7);
  //   cy.get('[class^="circle_circle"]').eq(0).contains('A');
  //   cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //   cy.get('[class^="circle_circle"]').each((elem, index) => {
  //     if (index > 0) {
  //       cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //       cy.wrap(elem).should('value', '');
  //     }
  //   });

  //   cy.get('[data-testid=input]').type('B');
  //   cy.get('[data-testid=add]').click();

  //   cy.get('[class^="circle_circle"]').should('have.length', 7);
  //   cy.get('[class^="circle_circle"]').eq(0).contains('A');
  //   cy.get('[class^="circle_circle"]').eq(1).contains('B');
  //   cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //   cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //   cy.get('[class^="circle_circle"]').each((elem, index) => {
  //     if (index > 1) {
  //       cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //       cy.wrap(elem).should('value', '');
  //     }
  //   });

  //   cy.tick(500);

  //   cy.get('[class^="circle_circle"]').should('have.length', 7);
  //   cy.get('[class^="circle_circle"]').eq(0).contains('A');
  //   cy.get('[class^="circle_circle"]').eq(1).contains('B');
  //   cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //   cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //   cy.get('[class^="circle_circle"]').each((elem, index) => {
  //     if (index > 1) {
  //       cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //       cy.wrap(elem).should('value', '');
  //     }
  //   });

  //   cy.get('[data-testid=delete]').click();
  //   cy.get('[class^="circle_circle"]').should('have.length', 7);

  //   cy.get('[class^="circle_circle"]').should('have.length', 7);
  //   cy.get('[class^="circle_circle"]').eq(0).should('value', '');
  //   cy.get('[class^="circle_circle"]').eq(1).contains('B');
  //   cy.get('[class^="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //   cy.get('[class^="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //   cy.get('[class^="circle_circle"]').each((elem, index) => {
  //     if (index > 1) {
  //       cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //       cy.wrap(elem).should('value', '');
  //     }
  //   });

  //   cy.tick(500);
  //   cy.get('[class^="circle_circle"]').each((elem, index) => {
  //     cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //   });

  //   cy.get('[data-testid=input]').type('C');
  //   cy.get('[data-testid=add]').click();

  //   cy.get('[class^="circle_circle"]').eq(2).contains('C');

  //   cy.tick(1000);
  //   cy.get('[data-testid=purge]').click();
  //   cy.get('[class^="circle_circle"]').should('have.length', 7);
  //   cy.get('[class^="circle_circle"]').each((elem, index) => {
  //     cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //     cy.wrap(elem).should('value', '');
  //   });

  //   cy.clock().invoke('restore');
  // });
});

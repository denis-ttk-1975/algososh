describe('String component tests', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('should open string page', () => {
    cy.contains('Строка');
  });

  it('button should be inactive while no value in input', () => {
    cy.get('[data-testid=word]').should('has.value', '');
    cy.get('[data-testid=button]').should('be.disabled');
  });

  it('fill input with some value should activate button', () => {
    cy.get('[data-testid=word]').type('1234');
    cy.get('[data-testid=button]').should('be.enabled');
  });

  it('click button and string unwrapping correсtly', () => {
    cy.get('[data-testid=word]').type('123');
    cy.clock();
    cy.get('[data-testid=button]').click();

    cy.get('[class^="circle_circle"]').each((elem, index) => {
      cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      if (index === 0) cy.wrap(elem).contains('1');
      if (index === 1) cy.wrap(elem).contains('2');
      if (index === 2) cy.wrap(elem).contains('3');
    });

    cy.tick(1000);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index === 0) cy.wrap(elem).contains('1') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      if (index === 1) cy.wrap(elem).contains('2') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      if (index === 2) cy.wrap(elem).contains('3') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    });

    cy.tick(1000);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index === 0) cy.wrap(elem).contains('3') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      if (index === 1) cy.wrap(elem).contains('2') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      if (index === 2) cy.wrap(elem).contains('1') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    });

    cy.tick(1000);
    cy.get('[class^="circle_circle"]').each((elem, index) => {
      if (index === 0) cy.wrap(elem).contains('3') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      if (index === 1) cy.wrap(elem).contains('2') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      if (index === 2) cy.wrap(elem).contains('1') && cy.wrap(elem).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    });
  });
});

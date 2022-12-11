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
    cy.get('[data-testid=word]').type('1234');
    cy.get('[data-testid=button]').click();

    cy.get('[data-testid=circle]').each(($elem, index) => {
      cy.wrap($elem).should('have.css', 'border', '4px solid #0032ff');
      if (index === 0) cy.wrap($elem).contains('1');
      if (index === 1) cy.wrap($elem).contains('2');
      if (index === 2) cy.wrap($elem).contains('3');
      if (index === 3) cy.wrap($elem).contains('4');
    });
  });
});

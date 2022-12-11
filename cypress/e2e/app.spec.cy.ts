describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

describe('spec visit', () => {
  it('Does not do much!', () => {
    expect(true).equal(true);
  });
});

describe('Site MBOU ALGOSOSH is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
    cy.contains('МБОУ АЛГОСОШ');
  });
});

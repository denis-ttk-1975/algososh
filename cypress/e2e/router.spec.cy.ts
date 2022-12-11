describe('All 6 pages with algorithm are available', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open string page', () => {
    cy.get('[href*="/recursion"]').click();
    cy.contains('Строка');
  });

  it('should open Fibonacci page', () => {
    cy.get('[href*="/fibonacci"]').click();
    cy.contains('Фибоначчи');
  });

  it('should open sorting page', () => {
    cy.get('[href*="/sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('should open stack page', () => {
    cy.get('[href*="/stack"]').click();
    cy.contains('Стек');
  });

  it('should open queue page', () => {
    cy.get('[href*="/queue"]').click();
    cy.contains('Очередь');
  });

  it('should open list page', () => {
    cy.get('[href*="/list"]').click();
    cy.contains('Связный список');
  });
});

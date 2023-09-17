
describe("AdminPage", () => {

  it("displays the title", () => {
    cy.visit('http://localhost:3000/admin');
    cy.get('[data-cy="admin-container"]').should('contain.text', "Admin");
  });

  it("navigates to /addMovie once New Movie link is clicked", () => {
    cy.visit('http://localhost:3000/admin');
    cy.contains('New Movie').click();
    cy.url().should('include', '/addMovie');
  });

  it("navigates to /addShareholder once New Shareholder link is clicked", () => {
    cy.visit('http://localhost:3000/admin');
    cy.contains('New Shareholder').click();
    cy.url().should('include', '/addShareholder');
  });

  it("navigates to /addTransfer once New Transfer link is clicked", () => {
    cy.visit('http://localhost:3000/admin');
    cy.contains('New Transfer').click();
    cy.url().should('include', '/addTransfer');
  });
});

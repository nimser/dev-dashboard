describe("login", () => {
  it("should login and redirect to home page", () => {
    cy.visit("http://localhost:3000/login");
  });
});
// should show delete/edit buttons when logged in
// should not show delete/edit buttons when not logged in
// should redirect to home when visiting edit page without auth

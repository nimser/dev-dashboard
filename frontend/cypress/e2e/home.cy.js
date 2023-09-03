import resources from "../fixtures/resources.json";

describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("loads the navbar", () => {
    cy.get("nav").contains("Home");
    cy.get("nav").contains("Register");
    cy.get("nav").contains("Login");
  });

  it("loads as many resources as returned from the backend", () => {
    const cardSel = "main > ._card_jok5e_1";

    cy.intercept("GET", "/resources", resources);
    cy.get(cardSel).should("have.length", resources.length);
    cy.get(`${cardSel}:last-of-type`)
      .find("h1 > a")
      .should("have.text", "React GG");
  });
});

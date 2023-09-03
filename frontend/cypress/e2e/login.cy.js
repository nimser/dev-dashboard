const editSel = `[aria-label=edit]`;
const deleteSel = `[aria-label=delete]`;

describe("without logging in", () => {
  it("should not show delete/edit buttons on home page", () => {
    cy.visit("http://localhost:3000/");
    cy.get(editSel).should("not.exist");
    cy.get(deleteSel).should("not.exist");
  });
  it("should redirect to login when visiting edit page without auth", () => {
    cy.visit("http://localhost:3000/update/1");
    cy.url().should("be.equal", "http://localhost:3000/login");
  });
});

describe("trying to log in", () => {
  const userToCreate = {
    username: "Jason",
    email: "jason@home.ai",
    password: "Robber",
  };
  let createdId;
  const usernameSel = `[name=username]`;
  const passwordSel = `[name=password]`;
  const submitSel = `[type=submit]`;

  before(() => {
    cy.request("POST", "http://localhost:5000/users", userToCreate).then(
      (res) => {
        createdId = res.body.id;
      }
    );
  });
  after(() => {
    cy.request("DELETE", `http://localhost:5000/users/${createdId}`);
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should login and redirect to a logged-in version of the home page", () => {
    cy.get(usernameSel).type(userToCreate.username);
    cy.get(passwordSel).type(userToCreate.password);
    cy.get(submitSel).click();
    cy.url().should("be.equal", "http://localhost:3000/");
    cy.contains("Logout");
  });

  it("should show error message if password is incorrect", () => {
    cy.get(usernameSel).type(userToCreate.username);
    cy.get(passwordSel).type("bad password");
    cy.get(submitSel).click();
    cy.contains("Invalid credentials. Try again.");
  });
  it("should show delete/edit buttons when logged in", () => {
    cy.login(userToCreate.username, userToCreate.password);
    cy.get(editSel);
    cy.get(deleteSel);
  });
});

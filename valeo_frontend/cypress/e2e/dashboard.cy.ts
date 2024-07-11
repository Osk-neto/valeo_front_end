describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("123123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("should display the dashboard", () => {
    cy.get("h4").should("contain", "Welcome, user@example.com");
  });

  it("should logout and redirect to login page", () => {
    cy.contains("Logout").click();
    cy.get("form").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should persist authentication after page reload", () => {
    cy.reload();
    cy.url().should("include", "/dashboard");
    cy.get("h4").should("contain", "Welcome, user@example.com");
  });
});

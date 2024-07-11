describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display the login form", () => {
    cy.get("form").should("be.visible");
  });

  it("should show validation messages for empty fields", () => {
    cy.get('button[type="submit"]').click();
    cy.get("#email-helper-text").should("contain", "Required");
    cy.get("#password-helper-text").should("contain", "Required");
  });

  it("should show validation message for invalid email format", () => {
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('button[type="submit"]').click();
    cy.get("#email-helper-text").should("contain", "Invalid email address");
  });

  it("should login successfully with valid credentials", () => {
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("123123");
    cy.get('button[type="submit"]').click();

    // Verifique se a navegação após o login ocorreu
    cy.url().should("include", "/dashboard");
    cy.get("h4").should("contain", "Welcome, user@example.com");
  });

  it("should show error message for invalid credentials", () => {
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.get(".MuiAlert-message").should("contain", "Invalid email or password");
  });
});

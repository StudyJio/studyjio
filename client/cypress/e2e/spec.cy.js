describe("Signed Out Page", () => {
  // When the user visits the website, it should first display the sign-in page.
  it("SignedOutPage.jsx is correctly displayed.", () => {
    cy.visit('http://localhost:3000')
    cy.contains('Log In')
    cy.contains('Sign Up')
  })
})

describe("Logging in", () => {
  // Try logging in using an incorrect email and password combination.
  it("Cannot log in with incorrect email and password", () => {
    cy.visit('http://localhost:3000')

    cy.get("[data-cy=log-in-card-email-input]") // Select the text field for email.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("obviously@wrong.email")
    cy.get("[data-cy=log-in-card-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("obviously-wrong-password")
    cy.get("[data-cy=log-in-card-submit-button]") // Select the submit button.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .click()
    cy.contains("Invalid login credentials") // This string should appear.
  })

  // Try logging in using a correct email and password combination.
  it("Can log in with incorrect email and password", () => {
    cy.visit('http://localhost:3000')

    cy.get("[data-cy=log-in-card-email-input]") // Select the text field for email.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("testing-account@test.com")
    cy.get("[data-cy=log-in-card-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("testing-account-password")
    cy.get("[data-cy=log-in-card-submit-button]") // Select the submit button.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .click()
    cy.contains("Meetup Scheduler") // We should be able to see the logged in area.
  })
})

describe('Signed In Area', () => {
  it('All pages are working', () => {
    // Find the magical admin log in button and click it.
    cy.contains('Magical Admin Log In Button').click()
    cy.contains('My Team Members').click().root().contains('(You)')
    cy.contains('My Team\'s Tasks').click().root().contains('Week')
    cy.contains('Meetup Scheduler').click().root().contains('Time of Day')
    cy.contains('Team Preferences').click().root()
    cy.root().contains('My Modules')
    cy.root().contains('NEXT').click()
    cy.root().contains('Sensing')
    cy.root().contains('NEXT').click()
    cy.root().contains('campus')
    cy.root().contains('My Account').click()
  });
})

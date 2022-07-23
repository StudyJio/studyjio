/* eslint-disable no-undef */
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
  it("Can log in with correct email and password", () => {
    cy.visit('http://localhost:3000')

    cy.get("[data-cy=log-in-card-email-input]") // Select the text field for email.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("abraham-lincoln@gmail.com")
    cy.get("[data-cy=log-in-card-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("asdlkjasdlkj")
    cy.get("[data-cy=log-in-card-submit-button]") // Select the submit button.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .click()
    cy.contains("Meetup Scheduler") // We should be able to see the logged in area.
  })
})

describe("Signing up", () => {

  it("Cannot sign up using an email that already belongs to an account", () => {
    cy.visit('http://localhost:3000')

    cy.get("[data-cy=sign-up-card-email-input]") // Select the text field for email.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("this-account-exists-already@mail.com")
    cy.get("[data-cy=sign-up-card-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("example-password")
    cy.get("[data-cy=sign-up-card-confirm-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("example-password")
    cy.get("[data-cy=sign-up-card-submit-button]") // Select the submit button.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .click()
    cy.contains("User already registered") // This string should appear.
  })

  it("Cannot sign up if passwords entered do not match", () => {
    cy.visit('http://localhost:3000')

    cy.get("[data-cy=sign-up-card-email-input]") // Select the text field for email.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("email@domain.com")
    cy.get("[data-cy=sign-up-card-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("example-password")
    cy.get("[data-cy=sign-up-card-confirm-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("a-non-matching-password")
    cy.get("[data-cy=sign-up-card-submit-button]") // Select the submit button.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .click()
    cy.contains("Passwords do not match") // This string should appear.
  })
})

describe("Logged in area", () => {
  it("Logs in to access logged in area", () => {
    cy.visit('http://localhost:3000')

    cy.get("[data-cy=log-in-card-email-input]") // Select the text field for email.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("abraham-lincoln@gmail.com")
    cy.get("[data-cy=log-in-card-password-input]") // Select the text field for password.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .type("asdlkjasdlkj")
    cy.get("[data-cy=log-in-card-submit-button]") // Select the submit button.
      .eq(1) // For some reason, this yields two elements. The correct one is the second one.
      .click()
    cy.contains("Meetup Scheduler") // We should be able to see the logged in area.
  });
});
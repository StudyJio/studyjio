describe("Signed Out Page", () => {
  // When the user visits the website, it should first display the sign-in page.
  it("SignedOutPage.jsx is correctly displayed.", () => {
    cy.visit('http://localhost:3000')
    cy.contains('Log In')
    cy.contains('Sign Up')
  })
})

describe("Signing Up", () => {
  // Try logging in using an incorrect email and password combination.
  it("Cannot log in with incorrect email and password", () => {
    cy.visit('http://localhost:3000')

    // Note: cy.get("...") always two elements for some reason.
    // We select the second element (index 1) to be able to type the email in.
    cy.get("[id=log-in-card-email-input]")
      .eq(1).
      type("obviously@wrong.email")
    cy.get("[id=log-in-card-password-input]")
      .eq(1)
      .type("obviously-wrong-password")

    let spy = cy.spy(window, 'alert');

    // When the 'LOG IN' button is pressed, an alert should appear.
    cy.get("[id=log-in-card-submit-button]")
      .eq(1)
      .click()
      .then(() => {
        expect(spy).to.be.called;
      });
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

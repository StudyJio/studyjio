
describe('User Account Control', () => {
  // When the user visits the website, it should first display the sign-in page.
  it('The sign-in page is displayed', () => {
    cy.visit('https://studyjio.netlify.app')
    cy.contains('Log In')
    cy.contains('Sign Up')
  });
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

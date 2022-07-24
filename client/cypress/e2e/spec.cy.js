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
  it("Can log in with correct email and password and sign out", () => {
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
    
    cy.get("[data-cy=sign-out-button]") // Select the sign out button.
      .click();
    cy.contains("Log In") // We should be able to see the sign in area again.
  });
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
  beforeEach(() => { // Log in before each test.
    cy.visit('http://localhost:3000')

    cy.get("[data-cy=log-in-card-email-input]").eq(1).type("abraham-lincoln@gmail.com")
    cy.get("[data-cy=log-in-card-password-input]").eq(1).type("asdlkjasdlkj")
    cy.get("[data-cy=log-in-card-submit-button]").eq(1).click()
  });
  
  describe("My Team's Tasks", () => {
    beforeEach(() => { // Click on the "My Team's Tasks" button.
      cy.get("[data-cy=my-team-tasks-button]").click()
    });

    const randomTaskName1 = String(Math.floor(Math.random() * 1000000));
    const randomTaskWeek1 = String(Math.floor(Math.random() * 1000000));
    const randomTaskName2 = String(Math.floor(Math.random() * 1000000));
    const randomTaskWeek2 = String(Math.floor(Math.random() * 1000000));

    it("Can create a task", () => {
      cy.get("[data-cy=create-task-button]") // Select the button.
        .click()
      cy.get("[data-cy=create-task-name-input]") // Select the text field for task name.
        .type(randomTaskName1)
      cy.get("[data-cy=create-task-week-input]") // Select the text field for task week.
        .type(randomTaskWeek1)
      cy.get("[data-cy=create-task-confirm-button]") // Select the confirm button.
        .click()
      cy.contains(randomTaskName1) // This string should appear.
      cy.contains(randomTaskWeek1) // This string should appear.
    });

    it("Can edit a task", () => {

      cy.contains(randomTaskName1) // Select the table cell.
        .parent() // Select the parent element -- the table row.
        .within($tr => {
          cy.get("[data-cy=edit-task-button]").click()
        });

      // Edit the task.
      cy.get("[data-cy=edit-task-name-input]").clear().type(randomTaskName2)
      cy.get("[data-cy=edit-task-week-input]").clear().type(randomTaskWeek2)
      cy.get("[data-cy=edit-task-confirm-button]").click()

      // Check that the task was edited.
      cy.contains(randomTaskName2)
      cy.contains(randomTaskWeek2)
    });

    it("Can only complete the task for 'myself'", () => {
      cy.contains(randomTaskName2)
        .parent() // Select the parent element -- the table row.
        .within($tr => {
          cy.get("[data-cy=task-checkbox]")
            .should('have.length', 5) // There should be five checkboxes in total.
            .children().filter('input')
            .not('[disabled]')
            .should('have.length', 1) // There should be only one checkbox that is not disabled.
            .check()
            .should('be.checked')
        });  
    });

    it("Can delete a task", () => {
      // Find the task we want to delete.
      cy.contains(randomTaskName2)
        .parent() // Select the parent element of the task -- the table row.
        .within( $tr => {
          cy.get("[data-cy=delete-task-button]").click() // Click the delete icon.
        } );

      cy.get("[data-cy=delete-task-confirm-button]").click() // Click the confirm delete button.
      
      // Check that the task was deleted.
      cy.contains(randomTaskName2).should('not.exist') // This string should not appear.
      cy.contains(randomTaskWeek2).should('not.exist') // This string should not appear.
    })
  });

  describe("Meetup Scheduler", () => {
    beforeEach(() => { // Click on the "Meetup Scheduler" button.
      cy.get("[data-cy=meetup-scheduler-button]").click()
    });

    /*
      TO DO:
      Randomly choose a table cell among the 24 * 7 displayed.
      Check that when the checkbox is toggled, the numerator of the cell
      either increases by one or decreases by one.
    */

    it("shows the correct dates for the week selected", () => {
      // Change the week currently selected to Recess Week.
      cy.get("[data-cy=meetup-scheduler-week-selector]").click();
      cy.contains("Recess Week").click();
      
      // Check that all the days in Recess Week are displayed.
      const daysInRecessWeek = ["19 Sep", "20 Sep", "21 Sep", "22 Sep", "23 Sep", "24 Sep", "25 Sep"];
      daysInRecessWeek.forEach( day => { cy.contains(day).should('exist'); } );
    
      // Change the week currently selected to Recess Week.
      cy.get("[data-cy=meetup-scheduler-week-selector]").click();
      cy.contains("Examination Week 1").click();
      
      // Check that all the days in Recess Week are displayed.
      const daysInExaminationWeek1 = ["21 Nov", "22 Nov", "23 Nov", "24 Nov", "25 Nov", "26 Nov", "27 Nov"];
      daysInExaminationWeek1.forEach( day => { cy.contains(day).should('exist'); } );
    });
  });

  describe("Team Preferences", () => {
    beforeEach(() => { // Click on the "Team Preferences" button.
      cy.get("[data-cy=team-preferences-button]").click()
    });

    // Four random "module codes".
    const randomModule1 = String(Math.floor(Math.random() * 1000000));
    const randomModule2 = String(Math.floor(Math.random() * 1000000));
    const randomModule3 = String(Math.floor(Math.random() * 1000000));
    const randomModule4 = String(Math.floor(Math.random() * 1000000));

    // Four random odd numbers between -11 and 11, inclusive.
    const learningStyleDim0 = Math.floor((Math.random() * 22) - 11);
    const learningStyleDim1 = Math.floor((Math.random() * 22) - 11);
    const learningStyleDim2 = Math.floor((Math.random() * 22) - 11);
    const learningStyleDim3 = Math.floor((Math.random() * 22) - 11);

    /* it("can input team preferences", () => {

      // Input the module codes.
      cy.get("[data-cy=team-preferences-module-input]")
        .clear()
        .type(randomModule1 + '{enter}' + randomModule2 + '{enter}' + randomModule3 + '{enter}' + randomModule4)

      // Check that the modules were added.
      cy.contains(randomModule1)
      cy.contains(randomModule2)
      cy.contains(randomModule3)
      cy.contains(randomModule4)

      // Navigate to the second page.
      cy.get("[data-cy=team-preferences-next-save-button]").click();

      // TODO: Input the learning style dimensions.

      // TODO: Input the user's location.

      // TODO: Navigate away from the current page and check that the
      //       team preferences across all three pages have been saved.
    }); */
  });
});
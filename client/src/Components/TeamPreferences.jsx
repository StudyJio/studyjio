import { Typography, Paper, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import MyLearningStyle from "./TeamPreferencesComponents/MyLearningStyle";
import MyModules from "./TeamPreferencesComponents/MyModules";
import MyLocation from "./TeamPreferencesComponents/MyLocation";


function TeamPreferences() {

    /** ===========================================================================================
     * Variables used to keep track of the user's inputs across the three stepper pages.
     * These variables are stored in the database when the user clicks on the SAVE button.
     */ 

    // A string of module codes delimited by newline characters, e.g. "IS1103\nIS1104".
    // (The newline character is \n or \r\n depending on the operating system.)
    // This string will be input sanitised and converted into a set in `saveTeamPreferencesToServer()`.
    const [userModules, setUserModules] = useState(); // The default value is null, I think.

    // Four odd integers within the range [-11, 11], e.g. [3, -11, 1, 5].
    // Represents the user's learning style in the four following dimensions, in order:
    //           (-11 <-----> 11)
    // [0]     Active <-----> Reflective
    // [1]    Sensing <-----> Intuitive
    // [2]     Visual <-----> Verbal
    // [3] Sequential <-----> Global
    const [userLearningStyleDimension0, setUserLearningStyleDimension0] = useState(1); // The default values are 1.
    const [userLearningStyleDimension1, setUserLearningStyleDimension1] = useState(1);
    const [userLearningStyleDimension2, setUserLearningStyleDimension2] = useState(1);
    const [userLearningStyleDimension3, setUserLearningStyleDimension3] = useState(1);

    // A string representing whether the user lives on campus or off campus.
    // The only two possible values are "on campus" and "off campus".
    const [userOnOrOffCampus, setUserOnOrOffCampus] = useState("on campus"); // The default option is "on campus".

    // A string representing the user's location. This variable is used no matter the user lives on campus or off campus.
    // e.g. "Residential College 4" or "Bencoolen"
    const [userLocation, setUserLocation] = useState();

    /** ===========================================================================================
     * Variables and functions used by the Stepper.
     */
    
    // Labels for each step in the stepper.
    const steps = ["My modules", "My learning style", "My location"];

    // The index of the step that is currently displayed to the user.
    const [activeStep, setActiveStep] = useState(0); // By default, display step one (index 0).

    // The three pages which will be shown to the user.
    const pages = [<MyModules       userModules={userModules} setUserModules={setUserModules} />,
                   <MyLearningStyle userLearningStyleDimension0={userLearningStyleDimension0} setUserLearningStyleDimension0={setUserLearningStyleDimension0}
                                    userLearningStyleDimension1={userLearningStyleDimension1} setUserLearningStyleDimension1={setUserLearningStyleDimension1}
                                    userLearningStyleDimension2={userLearningStyleDimension2} setUserLearningStyleDimension2={setUserLearningStyleDimension2}
                                    userLearningStyleDimension3={userLearningStyleDimension3} setUserLearningStyleDimension3={setUserLearningStyleDimension3} />,
                   <MyLocation      userOnOrOffCampus={userOnOrOffCampus} setUserOnOrOffCampus={setUserOnOrOffCampus}
                                    userLocation={userLocation} setUserLocation={setUserLocation} />
                  ];

    function handleClickBackButton() {
        setActiveStep(activeStep - 1); // Display the previous page.
    }

    function handleClickNextSaveButton() { // (This button says either "NEXT" (first and second page) or "SAVE" (last page).)
        if (activeStep === 2) {
            saveTeamPreferencesToServer(); // Save the user's team preferences. 
        } else {
            setActiveStep(activeStep + 1); // Display the next page.
        }
    }

    function saveTeamPreferencesToServer() {
        // TODO

        // Given a string, return a set of its substrings as delimited using the newline character.
        // Ignores spaces as input sanitisation.
        // e.g. "I S1103\n IS1104 " => { "IS1103", "IS1104" }
        function stringToSet(string) {
            const arrayOfStrings = string.split(/\r?\n/);
            return new Set(arrayOfStrings);
        }
    
    }

    /** ===========================================================================================
     * Return statement
     */

    return (
        <>
            <Typography variant="h4" gutterBottom>
                My Team Preferences
            </Typography>

            <Typography gutterBottom>
                Your new preferences will take effect in the next round of matching.
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>

                {/* For each step, display a step. */}

                {steps.map((label, index) => {
                    const stepProps = {}; // Keeps track of whether this step is completed.
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel> {label} </StepLabel>
                        </Step>
                    );
                })}

            </Stepper>

            <Paper sx={{ mt: 2, p: 2 }}>
                {pages[activeStep]}
            </Paper>

            {/* A button that is hidden for the first step, and displays "BACK" for all other steps. */}
            {(activeStep !== 0) && <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleClickBackButton}
            >
                BACK
            </Button>}

            {/* A button that displays "NEXT" for the first two steps, and "SAVE" for the last step. */}
            <Button
                variant="contained"
                sx={{ mt: 2, ml: 2 }}
                onClick={handleClickNextSaveButton}
            >
                {(activeStep === 2) ? "SAVE" : "NEXT"}
            </Button>

        </>
    );
}

export default TeamPreferences;
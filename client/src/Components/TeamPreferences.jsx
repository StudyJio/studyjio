import {
  Typography,
  Paper,
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useState } from "react";
import MyLearningStyle from "./TeamPreferencesComponents/MyLearningStyle";
import MyModules from "./TeamPreferencesComponents/MyModules";
import MyLocation from "./TeamPreferencesComponents/MyLocation";
import { supabase } from "../supabase";
import { isBrowser } from "@emotion/utils";

function TeamPreferences() {

  const user = supabase.auth.user();

  /** ===========================================================================================
   * Variables used to keep track of the user's inputs across the three stepper pages.
   * These variables are stored in the database when the user clicks on the SAVE button.
   */

  // TODO: Load the user's current team preferences from the database.
  //       These values will be displayed to the user in the UI to provide confirmation that the
  //       user's team preferences have been saved to the server when the user revisits the
  //       "My Team Preferences" page.
  //
  //       Sample values are coded in.

  const currentTeamPreferences = {
    modules_taken: "",
    learningstyle_d0: 1,
    learningstyle_d1: 1,
    learningstyle_d2: 1,
    learningstyle_d3: 1,
    on_or_off_campus: "on campus",
    location: "Residential College 4"
  }

  // A string of module codes delimited by newline characters, e.g. "IS1103\nIS1104".
  // (The newline character is \n or \r\n depending on the operating system.)
  const [userModules, setUserModules] = useState(); // The default value is null, I think.

  // Four odd integers within the range [-11, 11], e.g. [3, -11, 1, 5].
  // Represents the user's learning style in the four following dimensions, in order:
  //           (-11 <-----> 11)
  // [0]     Active <-----> Reflective
  // [1]    Sensing <-----> Intuitive
  // [2]     Visual <-----> Verbal
  // [3] Sequential <-----> Global
  const [userLearningStyleDimension0, setUserLearningStyleDimension0] =
    useState(currentTeamPreferences.learningstyle_d0 ?? 1); // The default values are 1.
  const [userLearningStyleDimension1, setUserLearningStyleDimension1] =
    useState(currentTeamPreferences.learningstyle_d1 ?? 1);
  const [userLearningStyleDimension2, setUserLearningStyleDimension2] =
    useState(currentTeamPreferences.learningstyle_d1 ?? 1);
  const [userLearningStyleDimension3, setUserLearningStyleDimension3] =
    useState(currentTeamPreferences.learningstyle_d1 ?? 1);

  // A string representing whether the user lives on campus or off campus.
  // The only two possible values are "on campus" and "off campus".
  const [userOnOrOffCampus, setUserOnOrOffCampus] = useState(currentTeamPreferences.on_or_off_campus ?? "on campus"); // The default option is "on campus".

  // A string representing the user's location. This variable is used no matter the user lives on campus or off campus.
  // e.g. "Residential College 4" or "Bencoolen"
  const [userLocation, setUserLocation] = useState(currentTeamPreferences.location ?? null);

  /** ===========================================================================================
   * Variables and functions used by the Stepper.
   */

  // Labels for each step in the stepper.
  const steps = ["My modules", "My learning style", "My location"];

  // The index of the step that is currently displayed to the user.
  const [activeStep, setActiveStep] = useState(0); // By default, display step one (index 0).

  // The three pages which will be shown to the user.
  const pages = [
    <MyModules userModules={userModules} setUserModules={setUserModules} />,
    <MyLearningStyle
      userLearningStyleDimension0={userLearningStyleDimension0}
      setUserLearningStyleDimension0={setUserLearningStyleDimension0}
      userLearningStyleDimension1={userLearningStyleDimension1}
      setUserLearningStyleDimension1={setUserLearningStyleDimension1}
      userLearningStyleDimension2={userLearningStyleDimension2}
      setUserLearningStyleDimension2={setUserLearningStyleDimension2}
      userLearningStyleDimension3={userLearningStyleDimension3}
      setUserLearningStyleDimension3={setUserLearningStyleDimension3}
    />,
    <MyLocation
      userOnOrOffCampus={userOnOrOffCampus}
      setUserOnOrOffCampus={setUserOnOrOffCampus}
      userLocation={userLocation}
      setUserLocation={setUserLocation}
    />,
  ];

  function handleClickBackButton() {
    setActiveStep(activeStep - 1); // Display the previous page.
  }

  function handleClickNextSaveButton() {
    // (This button says either "NEXT" (first and second page) or "SAVE" (last page).)
    if (activeStep === 2) {
      saveTeamPreferencesToServer(); // Save the user's team preferences.
    } else {
      setActiveStep(activeStep + 1); // Display the next page.
    }
  }

  const saveTeamPreferencesToServer = async () => {
    // TODO
    alert("Your preferences have been saved.")
    
    const teamPreferences = {
      updated_at: new Date(),
      modules_taken: userModules,
      learningstyle_d0: userLearningStyleDimension0,
      learningstyle_d1: userLearningStyleDimension1,
      learningstyle_d2: userLearningStyleDimension2,
      learningstyle_d3: userLearningStyleDimension3,
      on_or_off_campus: userOnOrOffCampus,
      location: userLocation,
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(teamPreferences) // Don't return the value after inserting
      .match({ id: user.id });

  };

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

      <Paper sx={{ mt: 2, p: 2 }}>{pages[activeStep]}</Paper>

      {/* A button that is hidden for the first step, and displays "BACK" for all other steps. */}
      {activeStep !== 0 && (
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleClickBackButton}
        >
          BACK
        </Button>
      )}

      {/* A button that displays "NEXT" for the first two steps, and "SAVE" for the last step. */}
      <Button
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
        onClick={handleClickNextSaveButton}
      >
        {activeStep === 2 ? "SAVE" : "NEXT"}
      </Button>
    </>
  );
}

export default TeamPreferences;

import {
  Typography,
  Paper,
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import {
  useState,
  useEffect
} from "react";
import MyLearningStyle from "./TeamPreferencesComponents/MyLearningStyle";
import MyModules from "./TeamPreferencesComponents/MyModules";
import MyLocation from "./TeamPreferencesComponents/MyLocation";
import { supabase } from "../supabase";

function TeamPreferences() {

  const user = supabase.auth.user();

  /** ===========================================================================================
   * Variables used to keep track of the user's inputs across the three stepper pages.
   * These variables are stored in the database when the user clicks on the SAVE button.
   */

  // A string of module codes delimited by newline characters, e.g. "IS1103\nIS1104".
  // (The newline character is \n or \r\n depending on the operating system.)
  const [userModules, setUserModules] = useState(""); // The default value is null, I think.

  // Four odd integers within the range [-11, 11].
  // Represents the user's learning style in the four following dimensions, in order:
  //           (-11 <-----> 11)
  // [0]     Active <-----> Reflective
  // [1]    Sensing <-----> Intuitive
  // [2]     Visual <-----> Verbal
  // [3] Sequential <-----> Global
  const [userLearningStyleDimension0, setUserLearningStyleDimension0] = useState(1);
  const [userLearningStyleDimension1, setUserLearningStyleDimension1] = useState(1);
  const [userLearningStyleDimension2, setUserLearningStyleDimension2] = useState(1);
  const [userLearningStyleDimension3, setUserLearningStyleDimension3] = useState(1);

  // A string representing whether the user lives on campus or off campus.
  // The only two possible values are "on campus" and "off campus".
  const [userOnOrOffCampus, setUserOnOrOffCampus] = useState("");

  // A string representing the user's location. This variable is used no matter the user lives on campus or off campus.
  // e.g. "Residential College 4" or "Bencoolen"
  const [userLocation, setUserLocation] = useState("");

  /** ============================================================================================
   * Load the user's current team preferences from the database when the component is mounted.
   */

  useEffect( () => {
    async function fetchTeamPreferences() {
      let { data, error } = await supabase
        .from('user_team_preferences')
        .select('*')
        .eq("id", user.id);
      return data[0];
    }
    
    fetchTeamPreferences()
      .then(data => {
        setUserModules(data.modules_taken);
        setUserLearningStyleDimension0(data.learning_style_dimension_0);
        setUserLearningStyleDimension1(data.learning_style_dimension_1);
        setUserLearningStyleDimension2(data.learning_style_dimension_2);
        setUserLearningStyleDimension3(data.learning_style_dimension_3);
        setUserOnOrOffCampus(data.on_or_off_campus);
        setUserLocation(data.location);
      })
      .catch(console.error)
  }, []) 

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

    alert("Your preferences have been saved.")
    
    const teamPreferences = {
      id: user.id,
      updated_at: new Date(),
      modules_taken: userModules,
      learning_style_dimension_0: userLearningStyleDimension0,
      learning_style_dimension_1: userLearningStyleDimension1,
      learning_style_dimension_2: userLearningStyleDimension2,
      learning_style_dimension_3: userLearningStyleDimension3,
      on_or_off_campus: userOnOrOffCampus,
      location: userLocation,
    };

    const { data, error } = await supabase
      .from("user_team_preferences")
      .upsert(teamPreferences)
      .eq('id', user.id);

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

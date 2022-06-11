import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { Button } from "@mui/material";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";

const MyModules = (
    <>
        <Typography variant="h5">
            My Modules
        </Typography>

        <TextField
            fullWidth
            multiline
            placeholder={"Module codes separated by line breaks"}>

        </TextField>
    </>
);

const MyStudyingPersonality = (
    <>
        <Typography variant="h5">
            My Studying Personality
        </Typography>

        <Typography>
            Please visit this website to find out your studying personality...
        </Typography>
    </>
);

const MyLocation = (
    <>
        <Typography variant="h5">
            My Location
        </Typography>

        <Typography>
            Please enter your location...
        </Typography>
    </>
);

const pages = [MyModules, MyStudyingPersonality, MyLocation];

function TeamPreferences() {

    const steps = ["My modules",
        "My studying personality",
        "My location"];

    // Step one (index 0) is first displayed to the user.
    const [activeStep, setActiveStep] = useState(0);

    function handleClickBackButton() {
        setActiveStep(activeStep - 1);
    }

    function handleClickNextSaveButton() {
        if (activeStep === 2) {
            saveTeamPreferencesToServer();
        } else {
            setActiveStep(activeStep + 1);
        }
    }

    function saveTeamPreferencesToServer() {
        // TODO
    }

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
            <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleClickBackButton}
            >
                HIDDEN/BACK
            </Button>

            {/* A button that displays "NEXT" for the first two steps, and "SAVE" for the last step. */}
            <Button
                variant="contained"
                sx={{ mt: 2, ml: 2 }}
                onClick={handleClickNextSaveButton}
            >
                NEXT/SAVE
            </Button>

        </>
    );
}

export default TeamPreferences;
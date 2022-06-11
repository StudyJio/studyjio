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
import { Link } from "@mui/material";
import { Grid } from "@mui/material";
import { Slider } from "@mui/material";
import { withStyles } from "@mui/material";

const MyModules = (
    <>
        <Typography variant="h5" sx={{mb: 1}}>
            My Modules
        </Typography>

        <TextField
            fullWidth
            multiline
            placeholder={"Full module codes separated by line breaks"}>

        </TextField>
    </>
);

function StudyingPersonalityColumnGenerator(leftLabel, rightLabel) {

    const marks = [
        { value: -11, label: leftLabel },
        { value: 11, label: rightLabel },
    ];

    // sx={{mx: 2}} behaves goofily within a Slider, so I had to uglyly wrap it in a Box.

    return (
        <Box sx={{mx: 4, my: 2}}>
            <Slider
                defaultValue={1}
                step={2}
                marks={marks}
                min={-11}
                max={11}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => Math.abs(v)}
                track={false}
                sx={{}}
            >
            </Slider>
        </Box>

    );

}

const MyStudyingPersonality = (
    <>
        <Typography variant="h5" sx={{mb: 1}}>
            My Studying Personality
        </Typography>

        <Typography sx={{mb: 5}}>
            Please visit <Link href="https://www.webtools.ncsu.edu/learningstyles/">this website</Link> to find out your studying personality through a quick five-minute questionnaire.
        </Typography>

        <Typography variant="h6">
            Enter your results
        </Typography>

        {StudyingPersonalityColumnGenerator("Active", "Reflective")}

        {StudyingPersonalityColumnGenerator("Sensing", "Intuitive")}

        {StudyingPersonalityColumnGenerator("Visual", "Verbal")}

        {StudyingPersonalityColumnGenerator("Sequential", "Global")}
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
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { Button } from "@mui/material";

const TeamPreferences = () => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                My Team Preferences
            </Typography>
            
            <Typography gutterBottom>
                Your new preferences will take effect in the next round of matching.
            </Typography>

            <Typography gutterBottom>
                (The following question is a dummy question.)
            </Typography>

            <Paper sx={{marginTop: "20px", padding: "20px"}}>
                <FormControl>
                    <FormLabel id="personality"> I study the best when I wear... </FormLabel>
                    <RadioGroup>
                        <FormControlLabel
                            value="red"
                            control={<Radio />}
                            label="a red shirt."
                        />

                        <FormControlLabel
                            value="blue"
                            control={<Radio />}
                            label="a blue shirt."
                        />
                    </RadioGroup>
                </FormControl>
            </Paper>

            <Button variant="contained" onClick={() => alert("We have not yet implemented saving these preferences into the database.")} sx={{marginTop: "20px"}}> Save </Button>
        </div>
    );
};

export default TeamPreferences;
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
import { Fragment, useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import { Grid } from "@mui/material";
import { Slider } from "@mui/material";
import { withStyles } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { ListSubheader } from "@mui/material";

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

    // sx={{mx: 4, my: 2}} behaves goofily within a Slider, so I had to uglily wrap it in a Box.

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

const hallsOfResidence = ["Eusoff Hall", "Kent Ridge Hall", "King Edward VII Hall", "Raffles Hall", "Sheares Hall", "Temasek Hall"];
const residentialColleges = ["Ridge View Residential College", "College of Alice & Peter Tan", "NUS College", "Residential College 4", "Tembusu College"];
const studentResidences = ["UTown Residence", "Prince George's Park Residence"];

function stringToMenuItem(string) {
    return (<MenuItem value={string}>{string}</MenuItem>);
}

const mrtStations = ["Admiralty", "Aljunied", "Ang Mo Kio", "Aviation Park", "Bahar Junction", "Bartley", "Bayfront", "Bayshore", "Beauty World", "Bedok", "Bedok North", "Bedok Reservoir", "Bedok South", "Bencoolen", "Bendemeer", "Bishan", "Boon Keng", "Boon Lay", "Botanic Gardens", "Braddell", "Bras Basah", "Brickland", "Bright Hill", "Buangkok", "Bugis", "Bukit Batok", "Bukit Batok West", "Bukit Brown", "Bukit Gombak", "Bukit Panjang", "Buona Vista", "Caldecott", "Canberra", "Cantonment", "Cashew", "Changi Airport", "Changi Airport Terminal 5", "Chinatown", "Chinese Garden", "Choa Chu Kang", "Choa Chu Kang West", "City Hall", "Clarke Quay", "Clementi", "Commonwealth", "Corporation", "Dakota", "Defu", "Dhoby Ghaut", "Dover", "Downtown", "Elias", "Enterprise", "Esplanade", "Eunos", "Expo", "Farrer Park", "Farrer Road", "Fort Canning", "Founders' Memorial", "Gardens by the Bay", "Gek Poh", "Geylang Bahru", "Great World", "Gul Circle", "HarbourFront", "Havelock", "Haw Par Villa", "Hillview", "Holland Village", "Hong Kah", "Hougang", "Hume", "Jalan Besar", "Joo Koon", "Jurong East", "Jurong Hill", "Jurong Pier", "Jurong Town Hall", "Jurong West", "Kaki Bukit", "Kallang", "Katong Park", "Kembangan", "Kent Ridge", "Keppel", "Khatib", "King Albert Park", "Kovan", "Kranji", "Labrador Park", "Lakeside", "Lavender", "Lentor", "Little India", "Lorong Chuan", "Loyang", "MacPherson", "Marina Bay", "Marina South", "Marina South Pier", "Marine Parade", "Marine Terrace", "Marsiling", "Marymount", "Mattar", "Maxwell", "Mayflower", "Mount Pleasant", "Mountbatten", "Nanyang Crescent", "Nanyang Gateway", "Napier", "Newton", "Nicoll Highway", "Novena", "one-north", "Orchard", "Orchard Boulevard", "Outram Park", "Pandan Reservoir", "Pasir Panjang", "Pasir Ris", "Pasir Ris East", "Paya Lebar", "Peng Kang Hill", "Pioneer", "Potong Pasir", "Prince Edward Road", "Promenade", "Punggol", "Punggol Coast", "Queenstown", "Raffles Place", "Redhill", "Riviera", "Rochor", "Sembawang", "Sengkang", "Serangoon", "Serangoon North", "Shenton Way", "Siglap", "Simei", "Sixth Avenue", "Somerset", "Springleaf", "Stadium", "Stevens", "Sungei Bedok", "Sungei Kadut", "Tai Seng", "Tampines", "Tampines East", "Tampines North", "Tampines West", "Tan Kah Kee", "Tanah Merah", "Tanjong Katong", "Tanjong Pagar", "Tanjong Rhu", "Tavistock", "Tawas", "Teck Ghee", "Telok Ayer", "Telok Blangah", "Tengah", "Tengah Park", "Tengah Plantation", "Tiong Bahru", "Toa Payoh", "Toh Guan", "Tuas Crescent", "Tuas Link", "Tuas West Road", "Tukang", "Ubi", "Upper Changi", "Upper Thomson", "West Coast Extension", "Woodlands", "Woodlands North", "Woodlands South", "Woodleigh", "Xilin", "Yew Tee", "Yio Chu Kang", "Yishun"];

const CampusLocationMenuItems = [
    <ListSubheader>Halls of Residence</ListSubheader>,
    hallsOfResidence.map(stringToMenuItem),
    <ListSubheader>Residential Colleges</ListSubheader>,
    residentialColleges.map(stringToMenuItem),
    <ListSubheader>Student Residences</ListSubheader>,
    studentResidences.map(stringToMenuItem)
];

const MRTStationMenuItems = mrtStations.map(stringToMenuItem);

function MyLocation(onOrOffCampus, setOnOrOffCampus, locationSelected, setLocationSelected) {
    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>
                My Location
            </Typography>

            <FormControl sx={{ display: 'block' }}>
                <FormLabel id="on-campus-or-off-campus">I stay...</FormLabel>
                <RadioGroup
                    defaultValue="on campus"
                    value={onOrOffCampus}
                    name="radio-buttons-group"
                    onChange={(event) => {setOnOrOffCampus(event.target.value); setLocationSelected(null)}}
                >
                    <FormControlLabel value="on campus" control={<Radio />} label="...on campus..." />
                    <FormControlLabel value="off campus" control={<Radio />} label="...off campus..." />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel id="location-selection">
                    {onOrOffCampus === "on campus" ? "...at..." : "...nearest to..."}
                </FormLabel>
                <Select
                    value={locationSelected}
                    onChange={(event) => {setLocationSelected(event.target.value)}}
                >
                    {onOrOffCampus === "on campus" ? CampusLocationMenuItems : MRTStationMenuItems}
                </Select>
            </FormControl>
        </>
    );
}


function TeamPreferences() {

    const steps = ["My modules",
        "My studying personality",
        "My location"];

    // Step one (index 0) is first displayed to the user.
    const [activeStep, setActiveStep] = useState(0);

    function handleClickBackButton() {
        setActiveStep(activeStep - 1);
    }

    const [onOrOffCampus, setOnOrOffCampus] = useState("on campus"); // Either "on campus" or "off campus".
    const [locationSelected, setLocationSelected] = useState(); // Either an MRT station or a hostel.

    const pages = [MyModules, MyStudyingPersonality, MyLocation(onOrOffCampus, setOnOrOffCampus, locationSelected, setLocationSelected)];

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
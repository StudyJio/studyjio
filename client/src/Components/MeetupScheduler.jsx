import { Typography } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../supabase";
import SaveIcon from '@mui/icons-material/Save';
import MeetupSchedulerTable from "./MeetupSchedulerTable.jsx";
import { Fab } from "@mui/material"

function getCurrentWeek() {
    // Based on the server date/time, return a string representing the current academic week.
    // e.g. "week_0", "week_7", "recess_week", "examination_week_2"
    return "week_0";
}

export default function MeetupScheduler() {

    // A string representing which 'page' of the table the user is currently viewing.
    // This string is one of the columns of the table user_meetup_availability in our database.
    // e.g. "week_0", "week_7", "recess_week", "examination_week_2"
    // By default, the user sees the current week.
    const [currentWeekSelected, setCurrentWeekSelected] = useState(getCurrentWeek());

    // An array of seven strings representing the dates in the week the user is currently viewing.
    // e.g. ["1 Aug", "2 Aug" ..., "7 Aug"].
    const [datesForWeek, setDatesForWeek] = useState([]);

    async function getDatesForWeek() {
        // Fetch the dates for the week the user is currently viewing.
        const {data, error} = await supabase.from("weeks").select("*").eq("key", currentWeekSelected);
        console.log(JSON.stringify(data[0].value));
        setDatesForWeek(data[0].value);
    }

    const emptyUserAvailability = {   // This default value will eventually be replaced by the
        0: Array(24).fill(false),     // response from the database.
        1: Array(24).fill(false),
        2: Array(24).fill(false),
        3: Array(24).fill(false),
        4: Array(24).fill(false),
        5: Array(24).fill(false),
        6: Array(24).fill(false),
    }

    const emptyTeamAvailability = {   // This default value will eventually be replaced by the
        0: Array(24).fill(0),         // response from the database.
        1: Array(24).fill(0),
        2: Array(24).fill(0),
        3: Array(24).fill(0),
        4: Array(24).fill(0),
        5: Array(24).fill(0),
        6: Array(24).fill(0),
    }

    // A JSON object with 7 keys. Each value is an array of 24 booleans.
    const [userAvailability, setUserAvailability] = useState(emptyUserAvailability)

    // A JSON object with 7 keys. Each value is an array of 24 integers.
    const [teamAvailability, setTeamAvailability] = useState(emptyTeamAvailability)

    const user = supabase.auth.user();

    async function fetchUserAvailability(week) {

        // If the user is not signed in, do nothing.
        if (user === null) {
            return;
        }

        let { data, error } = await supabase
            .from('user_meetup_availability')
            .select(week)
            .eq("id", user.id);

        // If this is the first time the user visits this page, then data will be [].
        // In this case, we will use the emptyUserAvailability object.
        setUserAvailability(data?.[0]?.[week] ?? emptyUserAvailability);

    }

    async function saveUserAvailability(week) {

        let objectToWrite = {
            id: user.id
        };

        objectToWrite[week] = userAvailability;

        const { data, error } = await supabase
            .from('user_meetup_availability')
            .upsert(objectToWrite)
            .eq("id", user.id)
    }

    const [teamMembers, setTeamMembers] = useState([]);

    /**
    * Get an array of JSON objects. Each JSON object is a team member.
    */
    async function fetchTeamMembers() {
        // Determine the team_id of the user.
        const user = supabase.auth.user();
        let response = await supabase.from('user_profiles').select('team_id').eq('id', user.id);
        let teamID = response.data[0].team_id ?? null;

        console.log("In fetchTeamMembers, teamID is: ", teamID);

        // If the user is not in a team, return an empty array.
        if (teamID == null) {
            setTeamMembers([]);
            return;
        }

        // Get all users with a matching team_id.
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('team_id', teamID);
        setTeamMembers(data);
    }

    async function calculateTeamAvailability(currentWeekSelected) {
        // This function calculates the other team members' availability for the week the user is currently viewing.
        // It does this by iterating through each team member and calculating their availability.
        // It then produces a JSON object with 7 keys. Each value is an array of 24 integers.

        const jsonObjectToReturn = {
            0: Array(24).fill(0),
            1: Array(24).fill(0),
            2: Array(24).fill(0),
            3: Array(24).fill(0),
            4: Array(24).fill(0),
            5: Array(24).fill(0),
            6: Array(24).fill(0),
        }

        for (let i = 0; i < teamMembers.length; i++) {
            const teamMember = teamMembers[i];
            
            // Skip the member if they are the user.
            if (teamMember.id === user.id) {
                continue;
            }

            // Fetch this team member's availability for currentWeekSelected from the database.
            const response = await supabase.from('user_meetup_availability').select(currentWeekSelected).eq("id", teamMember.id);
            const teamMemberAvailability = response.data?.[0]?.[currentWeekSelected]; // A JSON object with 7 keys and 24 boolean values per key.
            
            // Iterate through each day of the week.
            for (let day = 0; day < 7; day++) {
                    
                    // Iterate through each hour of the day.
                    for (let hour = 0; hour < 24; hour++) {
    
                        // If this team member is available at this hour, add one to the team availability for this hour.
                        if (teamMemberAvailability?.[day]?.[hour] ?? false) {
                            jsonObjectToReturn[day][hour]++;
                        }
                    }
                }
            }
        setTeamAvailability(jsonObjectToReturn);
    }

    useEffect(() => {
        // When the page first loads and when the week selected is changed,
        // get the user's availability and user's team's availability from the database.
        
        getDatesForWeek().catch(console.error);

        fetchUserAvailability(currentWeekSelected).then(() => {
            fetchTeamMembers().then(() => {
                calculateTeamAvailability(currentWeekSelected);
            })
        }).catch(console.error);

    }, [currentWeekSelected]);

    function handleSaveAndRefresh(week) {
        // Save the JSON object userAvailability to the database.
        saveUserAvailability(week)
            .catch(console.error);
    }

    useEffect(() => {
        setDatesForWeek(getDatesForWeek(currentWeekSelected));
    }, [currentWeekSelected])

    function handleChangeWeekSelected(e) {
        setCurrentWeekSelected(e.target.value);
    }

    // If the user is not in a team, show a message.
    if (teamMembers.length === 0) {
        return (
            <Box>
                <Typography variant="h4" gutterBottom>
                    Meetup Scheduler
                </Typography>

                <Typography py={3}>
                    You are not a member of any team.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Meetup Scheduler
            </Typography>

            <FormControl sx={{ pb: 2 }} display="block">
                <InputLabel id="week-selector">Week</InputLabel>
                <Select
                    id="week-selector"
                    value={currentWeekSelected}
                    label="Week"
                    defaultValue="week_0"
                    onChange={handleChangeWeekSelected}
                >
                    <MenuItem value={"week_0"}>Week 0</MenuItem>
                    <MenuItem value={"week_1"}>Week 1</MenuItem>
                    <MenuItem value={"week_2"}>Week 2</MenuItem>
                    <MenuItem value={"week_3"}>Week 3</MenuItem>
                    <MenuItem value={"week_4"}>Week 4</MenuItem>
                    <MenuItem value={"week_5"}>Week 5</MenuItem>
                    <MenuItem value={"week_6"}>Week 6</MenuItem>
                    <MenuItem value={"recess_week"}>Recess Week</MenuItem>
                    <MenuItem value={"week_7"}>Week 7</MenuItem>
                    <MenuItem value={"week_8"}>Week 8</MenuItem>
                    <MenuItem value={"week_9"}>Week 9</MenuItem>
                    <MenuItem value={"week_10"}>Week 10</MenuItem>
                    <MenuItem value={"week_11"}>Week 11</MenuItem>
                    <MenuItem value={"week_12"}>Week 12</MenuItem>
                    <MenuItem value={"week_13"}>Week 13</MenuItem>
                    <MenuItem value={"reading_week"}>Reading Week</MenuItem>
                    <MenuItem value={"examination_week_1"}>Examination Week 1</MenuItem>
                    <MenuItem value={"examination_week_2"}>Examination Week 2</MenuItem>
                </Select>
            </FormControl>

            <MeetupSchedulerTable
                teamMembers={teamMembers}
                userAvailability={userAvailability}
                setUserAvailability={setUserAvailability}
                teamAvailability={teamAvailability}
                datesForWeek={datesForWeek}
            />

            <Fab
                color="primary"
                aria-label="save"
                onClick={() => handleSaveAndRefresh(currentWeekSelected)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                }}
            >
                <SaveIcon />
            </Fab>
        </Box>
    );
}
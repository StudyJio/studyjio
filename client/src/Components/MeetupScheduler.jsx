import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableBody } from "@mui/material";
import { Checkbox } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableHead } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../supabase";

const hours = ["12 A.M.", "1 A.M.", "2 A.M.", "3 A.M.", "4 A.M.", "5 A.M.", "6 A.M.", "7 A.M.", "8 A.M.", "9 A.M.", "10 A.M.", "11 A.M.",
    "12 P.M.", "1 P.M.", "2 P.M.", "3 P.M.", "4 P.M.", "5 P.M.", "6 P.M.", "7 P.M.", "8 P.M.", "9 P.M.", "10 P.M.", "11 P.M."]


function getDatesForWeek(string) {
    // We need to get this from the server.
    switch (string) {
        case "week_0":
            return ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug", "7 Aug"];
        case "week_1":
            return ["8 Aug", "9 Aug", "10 Aug", "11 Aug", "12 Aug", "13 Aug", "14 Aug"];
        default:
            return ["a", "b", "c", "d", "e", "f", "g"]
    }
}

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
    const [datesForWeek, setDatesForWeek] = useState(getDatesForWeek(currentWeekSelected));

    const response_team_availability = {
        // This is a sample response from the database.
        // Key: Number of days since the start of the week.
        // Value: An int[24] of how many team members are available on the day.
        0: [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1, 2, 3, 4],
        1: [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1, 2, 3, 4],
        2: [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1, 2, 3, 4],
        3: [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1, 2, 3, 4],
        4: [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1, 2, 3, 4],
        5: [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1, 2, 3, 4],
        6: [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1, 2, 3, 4],
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

    // A JSON object with 7 keys. Each value is a boolean[24].
    const [userAvailability, setUserAvailability] = useState(emptyUserAvailability)

    // A JSON object with 7 keys. Each value is an int[24].
    const [teamAvailability, setTeamAvailability] = useState({})

    const user = supabase.auth.user();

    async function fetchUserAvailability(week) {

        let { data, error } = await supabase
            .from('user_meetup_availability')
            .select(week)
            .eq("id", user.id);
        return data[0][week];
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

    useEffect(() => {
        // When the page first loads and when the week selected is changed,
        // get the user's availability and user's team's availability from the database.
        fetchUserAvailability(currentWeekSelected)
            .then(data => {
                setUserAvailability(data);
            })
            .catch(console.error)

        setTeamAvailability(response_team_availability);
    }, [currentWeekSelected])

    function handleClickCheckbox(event) {

        // Firstly, find out which checkbox was clicked.
        const day_index = event.currentTarget.getAttribute('data-day');
        const hour_index = event.currentTarget.getAttribute('data-hour');

        // Then, make a copy of the boolean[24] for the relevant day of the week.
        let updatedArray = [...userAvailability[day_index]];
        updatedArray[hour_index] = event.target.checked;

        // Then, make a copy of the userAvailability object.
        let updatedObject = { ...userAvailability };
        updatedObject[day_index] = updatedArray;

        // Finally, update the JSON object userAvailability.
        setUserAvailability(updatedObject);
    }

    function handleSaveAndRefresh(week) {
        // Save the JSON object userAvailability to the database.
        saveUserAvailability(week)
            .catch(console.error);

        // TODO: Fetch the JSON object teamAvailability from the database.
    }

    function MeetupSchedulerTable() {

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Time of Day </TableCell>
                            <TableCell align="center"> Monday       <br /> {datesForWeek[0]} </TableCell>
                            <TableCell align="center"> Tuesday      <br /> {datesForWeek[1]} </TableCell>
                            <TableCell align="center"> Wednesday    <br /> {datesForWeek[2]} </TableCell>
                            <TableCell align="center"> Thursday     <br /> {datesForWeek[3]} </TableCell>
                            <TableCell align="center"> Friday       <br /> {datesForWeek[4]} </TableCell>
                            <TableCell align="center"> Saturday     <br /> {datesForWeek[5]} </TableCell>
                            <TableCell align="center"> Sunday       <br /> {datesForWeek[6]} </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { // This is really ugly.
                            Array(24)
                                .fill(0)
                                .map(
                                    function (_ignore_zero_value, hour_index) { // for (hour_index in range(24)) { ...
                                        return <TableRow key={hour_index}>
                                            <TableCell key={0}>
                                                {/* The cell in the 'Time of Day' column, e.g. "12 A.M.–1 A.M." */}
                                                {hours[hour_index]}&ndash;{hours[(hour_index + 1) % 24]}
                                            </TableCell>

                                            {
                                                Array(7)
                                                    .fill(0)
                                                    .map(
                                                        function (_ignore_zero_value_2, day_index) { // for (day_index in range(7)) { ...
                                                            return <TableCell key={day_index + 1}>
                                                                <Checkbox
                                                                    data-day={day_index}
                                                                    data-hour={hour_index}
                                                                    checked={userAvailability?.[day_index]?.[hour_index] ?? false}
                                                                    onClick={handleClickCheckbox}
                                                                />
                                                                <br />
                                                                <Typography>
                                                                    {teamAvailability?.[day_index]?.[hour_index] ?? " "}/5
                                                                </Typography>
                                                            </TableCell>
                                                        }
                                                    )
                                            }
                                        </TableRow>;
                                    }
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    useEffect(() => {
        setDatesForWeek(getDatesForWeek(currentWeekSelected));
    }, [currentWeekSelected])

    function handleChangeWeekSelected(e) {
        setCurrentWeekSelected(e.target.value);
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Meetup Scheduler
            </Typography>

            <FormControl sx={{ pb: 2 }}>
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
                    {/* These will be included after Milestone 3.
                        <MenuItem value = {"week_2"}>Week 2</MenuItem>
                        <MenuItem value = {"week_3"}>Week 3</MenuItem>
                        <MenuItem value = {"week_4"}>Week 4</MenuItem>
                        <MenuItem value = {"week_5"}>Week 5</MenuItem>
                        <MenuItem value = {"week_6"}>Week 6</MenuItem>
                        <MenuItem value = {"recess_week"}>Recess Week</MenuItem>
                        <MenuItem value = {"week_7"}>Week 7</MenuItem>
                        <MenuItem value = {"week_8"}>Week 8</MenuItem>
                        <MenuItem value = {"week_9"}>Week 9</MenuItem>
                        <MenuItem value = {"week_10"}>Week 10</MenuItem>
                        <MenuItem value = {"week_11"}>Week 11</MenuItem>
                        <MenuItem value = {"week_12"}>Week 12</MenuItem>
                        <MenuItem value = {"week_13"}>Week 13</MenuItem>
                        <MenuItem value = {"reading_week"}>Reading Week</MenuItem>
                        <MenuItem value = {"examination_week_1"}>Examination Week 1</MenuItem>
                        <MenuItem value = {"examination_week_2"}>Examination Week 2</MenuItem>
                    */}
                </Select>
            </FormControl>

            <MeetupSchedulerTable />

            <Button
                variant="contained"
                sx={{ my: 2 }}
                onClick={() => { handleSaveAndRefresh(currentWeekSelected); }}
            >
                Save and Refresh
            </Button>
        </Box>
    );
}
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableBody } from "@mui/material";
import { Checkbox } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";

function getDatesForWeek(string) {
    // We need to get this from the server.
    switch (string) {
        case "1":
            return ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug", "7 Aug"];
            break;
        case "2":
            return ["8 Aug", "9 Aug", "10 Aug", "11 Aug", "12 Aug", "13 Aug", "14 Aug"];
            break;
        default:
            return ["a", "b", "c", "d", "e", "f", "g"]
    }
}

function getCurrentWeek() {
    // Based on the server date/time, return a string representing the current academic week.
    // e.g. "1", "2", "Recess", "Examination Week 1"
    return "1";
}

/**
 * Return a TableRow to be displayed in the Meetup Scheduler.
 * @param {integer} firstDay    The number of days between the start of the semester and the start of the week represented by this row.
 * @param {integer} hour        The hour of the timeslot. (12 A.M. is 0, 11 P.M. is 23).
 * @param {integer} userID      The current user's ID.
 * @return {TableRow}           The TableRow representing seven timeslots.
 */
function generateTableRow(firstDay, hour, userID) {
    return (<>
        {generateTableCell(firstDay + 0, hour, userID)}
        {generateTableCell(firstDay + 1, hour, userID)}
        {generateTableCell(firstDay + 2, hour, userID)}
        {generateTableCell(firstDay + 3, hour, userID)}
        {generateTableCell(firstDay + 4, hour, userID)}
        {generateTableCell(firstDay + 5, hour, userID)}
        {generateTableCell(firstDay + 6, hour, userID)}
    </>);
}

/** 
 * Return a TableCell to be displayed in the Meetup Scheduler.
 * The TableCell consists of a checkbox and a fraction.
 * The checkbox allows the user to read and write their availability from and to the database.
 * The fraction represents the proportion of team members who are available at this timeslot.
 * @param {integer} day     The number of days since the start of the semester. (August 1, 2022 is 0)
 * @param {integer} hour    The hour of the timeslot. (12 A.M. is 0, 11 P.M. is 23).
 * @param {integer} userID  The current user's ID.
 * @return {TableCell}      The TableCell representing this timeslot.
 */
function generateTableCell(day, hour, userID) {
    return (
        <TableCell align="center">
            <Checkbox /> {/* Should be checked or unchecked based on the database. */}
            <br /> {/* A line break */}
            4/5 {/* Number of available team members / Number of team numbers */}
        </TableCell>);
}

const MeetupScheduler = () => {

    // A string representing which 'page' of the table the user is currently viewing.
    // e.g. "1", "2", "Recess", "Examination Week 1"
    // By default, the user sees the current week.
    const [currentWeekSelected, setCurrentWeekSelected] = useState(getCurrentWeek());

    // An array of seven strings representing the dates in the week the user is currently viewing.
    // e.g. ["1 Aug", "2 Aug" ..., "7 Aug"].
    const [datesForWeek, setDatesForWeek] = useState(getDatesForWeek(currentWeekSelected));

    function handleChangeWeekSelected(e) {
        setCurrentWeekSelected(e.target.value);
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Meetup Scheduler
            </Typography>

            <FormControl sx={{pb: 2}}>
                <InputLabel id="week-selector">Week</InputLabel>
                <Select
                    id = "week-selector"
                    value = {currentWeekSelected}
                    label = "Week"
                    defaultValue = "Week 0"
                    onChange = {handleChangeWeekSelected}
                >
                    <MenuItem value = {"0"}>Week 0</MenuItem>   
                    <MenuItem value = {"1"}>Week 1</MenuItem>   
                    <MenuItem value = {"2"}>Week 2</MenuItem>   
                    <MenuItem value = {"3"}>Week 3</MenuItem>   
                    <MenuItem value = {"4"}>Week 4</MenuItem>   
                    <MenuItem value = {"5"}>Week 5</MenuItem>   
                    <MenuItem value = {"6"}>Week 6</MenuItem>   
                    <MenuItem value = {"Recess"}>Recess Week</MenuItem>   
                    <MenuItem value = {"7"}>Week 7</MenuItem>   
                    <MenuItem value = {"8"}>Week 8</MenuItem>   
                    <MenuItem value = {"9"}>Week 9</MenuItem>   
                    <MenuItem value = {"10"}>Week 10</MenuItem>   
                    <MenuItem value = {"11"}>Week 11</MenuItem>   
                    <MenuItem value = {"12"}>Week 12</MenuItem>   
                    <MenuItem value = {"13"}>Week 13</MenuItem>   
                    <MenuItem value = {"Reading"}>Reading Week</MenuItem>   
                    <MenuItem value = {"Examination Week 1"}>Examination Week 1</MenuItem>   
                    <MenuItem value = {"Examination Week 2"}>Examination Week 2</MenuItem>   
                </Select>
            </FormControl>

            <TableContainer component={Paper}>

                <TableHead>
                    <TableRow>
                        <TableCell> Time of Day </TableCell>
                        <TableCell align="center"> Monday <br /> {datesForWeek[0]} </TableCell>
                        <TableCell align="center"> Tuesday <br /> {datesForWeek[1]} </TableCell>
                        <TableCell align="center"> Wednesday <br /> {datesForWeek[2]} </TableCell>
                        <TableCell align="center"> Thursday <br /> {datesForWeek[3]} </TableCell>
                        <TableCell align="center"> Friday <br /> {datesForWeek[4]} </TableCell>
                        <TableCell align="center"> Saturday <br /> {datesForWeek[5]} </TableCell>
                        <TableCell align="center"> Sunday <br /> {datesForWeek[6]} </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell> 12 A.M.&ndash;1 A.M. </TableCell>
                        {generateTableRow(0, 0, 0)}
                    </TableRow>

                    <TableRow>
                        <TableCell> 1 A.M.&ndash;2 A.M. </TableCell>
                        {generateTableRow(0, 1, 0)}
                    </TableRow>
                </TableBody>

            </TableContainer>
        </Box>
    );
};

export default MeetupScheduler;
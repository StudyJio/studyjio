import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableBody } from "@mui/material";
import { Checkbox } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
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

const MeetupScheduler = () => {

    // A string representing which 'page' of the table the user is currently viewing.
    // e.g. "1", "2", "Recess", "Examination Week 1"
    // By default, the user sees the current week.
    const [currentWeekSelected, setCurrentWeekSelected] = useState(getCurrentWeek());

    // An array of seven strings representing the dates in the week the user is currently viewing.
    // e.g. ["1 Aug", "2 Aug" ..., "7 Aug"].
    const [datesForWeek, setDatesForWeek] = useState(getDatesForWeek(currentWeekSelected));

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Meetup Scheduler
            </Typography>

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
                        <TableCell> 8 A.M.&ndash;9 A.M. </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 4/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 3/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 2/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 3/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 5/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 3/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 4/5 </TableCell>
                    </TableRow>
                </TableBody>

                <TableBody>
                    <TableRow>
                        <TableCell> 9 A.M.&ndash;10 A.M. </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 4/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 3/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 2/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 3/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 5/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 3/5 </TableCell>
                        <TableCell align="center"> <Checkbox /> <br /> 4/5 </TableCell>
                    </TableRow>
                </TableBody>

            </TableContainer>
        </Box>
    );
};

export default MeetupScheduler;
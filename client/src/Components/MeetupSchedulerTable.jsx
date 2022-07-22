import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableBody } from "@mui/material";
import { Checkbox } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableHead } from "@mui/material";

const hours = ["12 A.M.", "1 A.M.", "2 A.M.", "3 A.M.", "4 A.M.", "5 A.M.", "6 A.M.", "7 A.M.", "8 A.M.", "9 A.M.", "10 A.M.", "11 A.M.",
    "12 P.M.", "1 P.M.", "2 P.M.", "3 P.M.", "4 P.M.", "5 P.M.", "6 P.M.", "7 P.M.", "8 P.M.", "9 P.M.", "10 P.M.", "11 P.M."]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function MeetupSchedulerTable(props) {
    const { teamMembers,
        userAvailability,
        setUserAvailability,
        teamAvailability,
        datesForWeek } = props;

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader={true}>                
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
                    { hours.map((hour, hourIndex) => {
                        return (
                            <TableRow key={hourIndex}>
                                <TableCell key={0}>
                                    {/* e.g. "12 A.M.–1 A.M." */}
                                    {hours[hourIndex]}&ndash;{hours[(hourIndex + 1) % 24]}
                                </TableCell>

                                { days.map((day, dayIndex) => {
                                    return (
                                        <TableCell key={dayIndex + 1} align="center">
                                            <Checkbox
                                                checked={userAvailability[dayIndex][hourIndex]}
                                                onClick={event => {
                                                    const newUserAvailability = {...userAvailability};
                                                    newUserAvailability[dayIndex][hourIndex] = event.target.checked;
                                                    setUserAvailability(newUserAvailability);
                                                }}
                                            />
                                            <br />
                                            <Typography>
                                                {
                                                    // The user's availability for this hour on this day.
                                                    (userAvailability[dayIndex][hourIndex] ? 1 : 0)
                                                    +
                                                    // The rest of the team's availability for this hour on this day.
                                                    (teamAvailability[dayIndex][hourIndex] ?? 0)
                                                }
                                                /
                                                {teamMembers?.length ?? 0}
                                            </Typography>
                                        </TableCell>
                                    )
                                }) }
                            </TableRow>
                        )
                    }) }
                </TableBody>
            </Table>
        </TableContainer>
    )


}
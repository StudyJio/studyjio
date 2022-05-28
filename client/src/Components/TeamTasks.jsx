import { Typography } from "@mui/material";
import { Table } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { Fab } from "@mui/material";
import { Checkbox } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useState } from "react";

function getTeamMemberNames() {
    // For now, we assume that all teams have five members.
    return ["Team Member 1 (You)", "Team Member 2", "Team Member 3", "Team Member 4", "Team Member 5"];
}

function getTasksFromAPI() {
    // Pretend data from a pretend backend (to be implemented).
    return [{name: "Lecture 1", week: "1", doneByMember1: true, doneByMember2: true, doneByMember3: false, doneByMember4: true, doneByMember5: true},
            {name: "Lecture 2", week: "2", doneByMember1: false, doneByMember2: true, doneByMember3: false, doneByMember4: false, doneByMember5: false},
            {name: "Lecture 3", week: "3", doneByMember1: true, doneByMember2: false, doneByMember3: false, doneByMember4: false, doneByMember5: false}];
}

function displayTaskAsRow(task) {
    // For now, we assume that all teams have five members.
    return (
        <TableRow>
            <TableCell> {task.name} </TableCell>
            <TableCell> {task.week} </TableCell>
            <TableCell align="center"> <Checkbox defaultChecked={task.doneByMember1} /> </TableCell>
            <TableCell align="center"> <Checkbox defaultChecked={task.doneByMember2} disabled /> </TableCell>
            <TableCell align="center"> <Checkbox defaultChecked={task.doneByMember3} disabled /> </TableCell>
            <TableCell align="center"> <Checkbox defaultChecked={task.doneByMember4} disabled /> </TableCell>
            <TableCell align="center"> <Checkbox defaultChecked={task.doneByMember5} disabled /> </TableCell>
            <TableCell align="center"> <EditRoundedIcon onClick={() => alert("We have not yet implemented editing the name of tasks.")}/> </TableCell>
            <TableCell align="center"> <DeleteRoundedIcon onClick={() => alert("We have not yet implemented deleting tasks.")}/> </TableCell>
        </TableRow>
    )
}

function TeamTasks() {
    const [teamTasks, setTeamTasks] = useState(getTasksFromAPI());

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Team's Tasks
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableCell> Task </TableCell>
                        <TableCell> Week </TableCell>
                        <TableCell align="center"> {getTeamMemberNames()[0]} </TableCell>
                        <TableCell align="center"> {getTeamMemberNames()[1]} </TableCell>
                        <TableCell align="center"> {getTeamMemberNames()[2]} </TableCell>
                        <TableCell align="center"> {getTeamMemberNames()[3]} </TableCell>
                        <TableCell align="center"> {getTeamMemberNames()[4]} </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableHead>

                    <TableBody>
                        {teamTasks.map(task => displayTaskAsRow(task))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Fab
                color="primary"
                aria-label="add"
                sx={{ marginTop: "30px" }}
                onClick={() => alert("We have not yet implemented adding tasks.")}
            >
                <AddIcon />

            </Fab>
        </Box>
    );
}

export default TeamTasks;
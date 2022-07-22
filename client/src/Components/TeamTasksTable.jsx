import { Button, Typography } from "@mui/material";
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
import { supabase } from "../supabase";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, DialogContentText } from "@mui/material";

export default function TeamTasksTable(props) {

    const { teamMembers, tasks, getTasks } = props;

    // States to keep track of whether the dialogs are open.
    const [editDialogOpen, setEditDialogOpen] = useState(false); // Whether the edit dialog is open.
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Whether the delete dialog is open.
    const [createDialogOpen, setCreateDialogOpen] = useState(false); // Whether the create dialog is open.

    // States to keep track of the current task being created, edited, or deleted.
    const [indexOfTaskToModify, setIndexOfTaskToModify] = useState(null); // The index of the task to be deleted or edited or added.
    const [newTaskName, setNewTaskName] = useState(''); // The new name of the currently edited task.
    const [newTaskWeek, setNewTaskWeek] = useState(''); // The new week of the currently edited task.

    // Functions to create, update, and delete tasks in the database.
    function handleConfirmEdit(event) {
        setEditDialogOpen(false);

        const newTask = {
            // The id of the task will be automatically generated by Supabase.
            name: newTaskName,
            week: newTaskWeek,
            completion: tasks[indexOfTaskToModify].completion,
            team_id: tasks[indexOfTaskToModify].team_id,
        }

        supabase.from('tasks').update(newTask).eq('id', tasks[indexOfTaskToModify].id)
            .then(getTasks)
            .catch(console.error);
    }

    function handleConfirmDelete(event) {
        setDeleteDialogOpen(false);

        // Delete the task object from the database.
        supabase.from('tasks').delete().eq('id', tasks[indexOfTaskToModify].id)
            .then(getTasks);
    }

    function handleConfirmCreate(event) {

        setCreateDialogOpen(false);

        // Save the new task to the database.
        const newTask = {
            // The id of the task will be automatically generated by Supabase.
            name: newTaskName,
            week: newTaskWeek,
            completion: {},
            team_id: teamMembers?.[0]?.team_id // ?. and ?? are used to prevent errors during unit testing.
        }

        supabase.from('tasks').insert(newTask)
            .then(getTasks)
            .catch(console.error);
    }

    // Return statement.
    if (teamMembers.length === 0) {
        return (
            <Typography>
                You are not a member of any team.
            </Typography>
        );
    } else {
        return (
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Task Name </TableCell>
                                <TableCell> Week </TableCell>
                                { /* Display a column (of checkboxes) for each team member. */
                                    teamMembers.map((member, index) => {
                                        return (
                                            <TableCell align="center" key={index}> {member.display_name} </TableCell>
                                        );
                                    })
                                }
                                <TableCell> </TableCell> { /* Empty cell for the column of edit buttons. */}
                                <TableCell> </TableCell> { /* Empty cell for the column of delete buttons. */}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tasks.length > 0
                                ?
                                // Display each task as a row in the table.
                                tasks.map((task, taskIndex) => {
                                    return (
                                        <TableRow key={taskIndex}>
                                            <TableCell> {task.name} </TableCell>
                                            <TableCell> {task.week} </TableCell>
                                            { /* Within each row, display a checkbox for each team member. */
                                                teamMembers.map((member, memberIndex) => {
                                                    return (
                                                        <TableCell align="center" key={memberIndex}>
                                                            <Checkbox
                                                                disabled={
                                                                    // Do not let the user complete tasks on behalf of other team members.
                                                                    member.id !== supabase?.auth?.user()?.id
                                                                }
                                                                checked={task.completion[member.id] ?? false}
                                                                onChange={event => {
                                                                    // Save the new task to the database.
                                                                    const newTask = { ...task }
                                                                    newTask.completion[member.id] = event.target.checked;

                                                                    supabase.from('tasks').update(newTask).eq('id', newTask.id)
                                                                        .then(getTasks);
                                                                }}
                                                            />
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                            <TableCell>
                                                <EditRoundedIcon
                                                    aria-label="edit"
                                                    data-testid="edit-task-button"
                                                    onClick={() => {
                                                        setIndexOfTaskToModify(taskIndex);
                                                        setEditDialogOpen(true);
                                                        setNewTaskName(task.name);
                                                        setNewTaskWeek(task.week);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <DeleteRoundedIcon
                                                    aria-label="delete"
                                                    data-testid="delete-task-button"
                                                    onClick={() => {
                                                        setIndexOfTaskToModify(taskIndex);
                                                        setDeleteDialogOpen(true);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                                :
                                <></>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ my: 2 }}
                    onClick={() => {
                        setIndexOfTaskToModify(tasks.length);
                        setCreateDialogOpen(true);
                    }}

                >
                    <AddIcon />
                </Fab>

                <Dialog open={editDialogOpen} onClose={() => { setEditDialogOpen(false); }}>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="name"
                            label="Task Name"
                            type="text"
                            fullWidth
                            value={newTaskName}
                            onChange={event => setNewTaskName(event.target.value)}
                        />
                        <TextField
                            id="week"
                            label="Week"
                            type="text"
                            fullWidth
                            value={newTaskWeek}
                            onChange={event => setNewTaskWeek(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setEditDialogOpen(false); }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmEdit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={deleteDialogOpen} onClose={() => { setDeleteDialogOpen(false); }}>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this task?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setDeleteDialogOpen(false); }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={createDialogOpen} onClose={() => { setCreateDialogOpen(false); }}>
                    <DialogTitle>Create Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="name"
                            label="Task Name"
                            type="text"
                            fullWidth
                            value={newTaskName}
                            onChange={event => setNewTaskName(event.target.value)}
                        />
                        <TextField
                            id="week"
                            label="Week"
                            type="text"
                            fullWidth
                            value={newTaskWeek}
                            onChange={event => setNewTaskWeek(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setCreateDialogOpen(false); }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        )
    }
}
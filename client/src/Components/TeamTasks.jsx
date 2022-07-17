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
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, DialogContentText } from "@mui/material";
import { Grid } from "@mui/material";

/**
 * If the user does not have a team, display a message instead of the table of tasks.
 * The array teamMembers should be empty.
 */


/**
 * Get an array of JSON objects. Each JSON object is a team member.
 */


export default function TeamTasks() {
    const [teamMembers, setTeamMembers] = useState([]); // An array of JSON objects. Each object is a team member.
    const [tasks, setTasks] = useState([]); // An array of JSON objects. Each object is a task.

    async function getTeamMembers() {
        // Determine the team_id of the user.
        const user = supabase.auth.user();
        let response = await supabase.from('user_profiles').select('team_id').eq('id', user.id);
        let teamID = response.data[0].team_id ?? null;
    
        // If the user is not in a team, set teamMembers to an empty array.
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
        return;
    }

    async function getTasks() {
        // Determine the team_id of the user.
        const user = supabase.auth.user();
        let response = await supabase.from('user_profiles').select('team_id').eq('id', user.id);
        let teamID = response.data[0].team_id ?? null;
    
        // If the user is not in a team, return an empty array.
        if (teamID == null) {
            setTasks([]);
            return;
        }
    
        // Get all tasks with a matching team_id.
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('team_id', teamID);
    
        // Sort the tasks by the column created_at.
        data.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at);
        });
    
        setTasks(data);
        return;
    }

    // When the page is loaded, ...
    useEffect(() => {

        // Get the user's team's tasks.
        getTasks().catch(console.error);

        // Get the user's team members' display names and user IDs.
        getTeamMembers().catch(console.error);

    }, []);

    const [editDialogOpen, setEditDialogOpen] = useState(false); // Whether the edit dialog is open.
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Whether the delete dialog is open.
    const [createDialogOpen, setCreateDialogOpen] = useState(false); // Whether the create dialog is open.
    const [indexOfTaskToModify, setIndexOfTaskToModify] = useState(null); // The index of the task to be deleted or edited or added.
    const [newTaskName, setNewTaskName] = useState(''); // The new name of the currently edited task.
    const [newTaskWeek, setNewTaskWeek] = useState(''); // The new week of the currently edited task.

    // When the edit icon in the table is clicked, open the edit dialog.
    function handleOpenEditDialog(event) {
        setEditDialogOpen(true);
    }

    function handleCloseEditDialog(event) {
        setEditDialogOpen(false);
    }   

    // When the SAVE button in the edit dialog is clicked, update the task.
    function handleConfirmEdit(event) {
        setEditDialogOpen(false);

        // Update the relevant task object.
        const newTask = { ...tasks[indexOfTaskToModify] };
        newTask.name = newTaskName
        newTask.week = newTaskWeek

        // Update the tasks array.
        setTasks([...tasks.slice(0, indexOfTaskToModify), newTask, ...tasks.slice(indexOfTaskToModify + 1)]);

    }

    // When the delete icon in the table row is clicked, open the delete dialog.
    function handleOpenDeleteDialog(event) {
        setDeleteDialogOpen(true);
    }

    // When the DELETE button in the delete dialog is clicked, delete the task.
    function handleConfirmDelete(event) {
        setDeleteDialogOpen(false);

        // Delete the task object from the database.
        supabase.from('tasks').delete().eq('id', tasks[indexOfTaskToModify].id)
            .then(getTasks);
    }

    function handleCloseDelete(event) {
        setDeleteDialogOpen(false);
    }

    // When the add floating action button is clicked, open the add dialog.
    function handleOpenCreateDialog(event) {
        setCreateDialogOpen(true);
    }

    function handleCloseCreateDialog(event) {
        setCreateDialogOpen(false);
    }

    function handleConfirmCreate(event) {

        setCreateDialogOpen(false);

        // Save the new task to the database.
        const newTask = {
            // The id of the task will be automatically generated by Supabase.
            name: newTaskName,
            week: newTaskWeek,
            completion: {},
            team_id: teamMembers[0].team_id // This is safe the user has to be in a team to be able to create a task.
        }

        supabase.from('tasks').insert(newTask)
            .then(getTasks)
            .catch(console.error);
    }

    // If the user is not in a team, show a message.
    if (teamMembers.length === 0) {
        return (
            <Box>
                <Typography variant="h4" gutterBottom>
                    My Team's Tasks
                </Typography>

                <Typography py={3}>
                    You are not a member of any team.
                </Typography>
            </Box>
        );
    }

    // Return a table showing the tasks.
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Team's Tasks
            </Typography>

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
                            <TableCell> </TableCell> { /* Empty cell for the column of edit buttons. */ }
                            <TableCell> </TableCell> { /* Empty cell for the column of delete buttons. */ }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { tasks.length > 0
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
                                                                member.id !== supabase.auth.user().id
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
                                                onClick={ () => {
                                                    setIndexOfTaskToModify(taskIndex);
                                                    handleOpenEditDialog();
                                                    setNewTaskName(task.name);
                                                    setNewTaskWeek(task.week);
                                                } }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <DeleteRoundedIcon
                                                aria-label="delete"
                                                onClick={ () => {
                                                    setIndexOfTaskToModify(taskIndex);
                                                    handleOpenDeleteDialog();
                                                } }
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
                onClick={ () => {
                    setIndexOfTaskToModify(tasks.length);
                    handleOpenCreateDialog();
                }}
            >
                <AddIcon />

            </Fab>
                
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
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
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmEdit} color="primary">
                        Save
                    </Button>   
                </DialogActions>   
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={handleCloseDelete}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            
            <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog}>
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
                    <Button onClick={handleCloseCreateDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
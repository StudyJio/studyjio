import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import TeamTasksTable from "./TeamTasksTable";

export default function TeamTasks() {
    const [teamMembers, setTeamMembers] = useState([]); // An array of JSON objects. Each object is a team member.
    const [tasks, setTasks] = useState([]); // An array of JSON objects. Each object is a task.

    async function getTeamMembers() {
        // If the user is not signed in, set teamMembers to an empty array.
        if (supabase.auth.user() == null) {
            setTeamMembers([]);
            return;
        }

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
        // If the user is not signed in, set tasks to an empty array.
        if (supabase.auth.user() == null) {
            setTasks([]);
            return;
        }

        // Determine the team_id of the user.
        const user = supabase.auth.user();
        let response = await supabase.from('user_profiles').select('team_id').eq('id', user.id);
        let teamID = response.data[0].team_id ?? null;

        // If the user is not in a team, set tasks to an empty array.
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

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Team's Tasks
            </Typography>

            <TeamTasksTable
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers}
                tasks={tasks}
                setTasks={setTasks}
                getTasks={getTasks}
            />

        </Box>
    );
}

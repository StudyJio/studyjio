import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DefaultProfilePhoto from "./DefaultProfilePhoto.jpg";
import { supabase } from "../supabase";
import { useEffect } from "react";

/**
 * Return the profile photo, Telegram username, display name of the user's team members.
 */
export async function getTeamMembers() {

    const user = supabase.auth.user();

    // Determine the ID of the team that the user belongs to.
    let response = await supabase.from('user_profiles').select('team_id').eq('id', user.id);
    const teamID = response.data[0].team_id;

    console.log("teamID: " + teamID)

    // If the user does not belong to any team, then return just the user.
    if (teamID === null) {
        // let response2 = await supabase.from('user_profiles').select('*').eq('id', user.id); This can wait.
        console.log("teamID is null")
        return null;
    }

    // Retrieve the list of users who are in the team.
    let response3 = await supabase.from('user_profiles').select('*').eq('team_id', teamID);
    const arrayOfRows = response3.data; // [{updated_at: "...", id: "...", display_name: "...", team_id: "..."}, ...]

    console.log(arrayOfRows);

    return arrayOfRows;
}

function cardGenerator(name, username) {
    return (
        <Card sx={{ maxWidth: 200 }}>

            <CardMedia
                component="img"
                height="200"
                image={DefaultProfilePhoto}
                alt="alt" />

            <CardContent>
                <Typography variant="h5" gutterBottom style={{ wordWrap: "break-word" }}>
                    {name}
                </Typography>

                <Typography variant="h6">
                    Telegram
                </Typography>

                <Typography style={{ wordWrap: "break-word" }}>
                    {username}
                </Typography>
            </CardContent>

        </Card>
    );
}

export default function TeamMembers() {

    // The user's team members.
    const [teamMembers, setTeamMembers] = React.useState([]);
    console.log("TeamMembers.jsx: teamMembers: " + teamMembers);

    // When the page is loaded, get the team members.
    useEffect(() => {
        getTeamMembers()
            .then(
                (result) => {
                    setTeamMembers(result);
                }
            )
            .catch(console.error);
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Team Members
            </Typography>

            <Grid container spacing={2}>
                {
                    // For each team member, generate a card.
                    teamMembers.map(member => {
                        return (
                            <Grid item>
                                {cardGenerator(member.display_name, "@telegram_username")}
                            </Grid>
                        );
                    })
                }
            </Grid>

            { /* If the user does not belong to any team, then display a message. */}
            {teamMembers.length === 0 && (
                <Typography py={3}>
                    You are not a member of any team.
                </Typography>
            )}

        </Box>
    );
}


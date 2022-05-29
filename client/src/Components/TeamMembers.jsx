import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DefaultProfilePhoto from "./DefaultProfilePhoto.jpg";

const TeamMembers = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Team Members
            </Typography>

            <Typography gutterBottom>
                In this prototype, we assume that the matching process is already complete.
            </Typography>

            <Grid container spacing={2}>
                <Grid item> {cardGenerator("Peter (You)", "@petergriffin")} </Grid>
                <Grid item> {cardGenerator("Lois", "@loisloislois")} </Grid>
                <Grid item> {cardGenerator("Megan", "@meganmegan")} </Grid>
                <Grid item> {cardGenerator("Brian", "@brianbrain")} </Grid>
                <Grid item> {cardGenerator("Stewie", "@myheadisoval")} </Grid>
            </Grid>
            
        </Box>
    );
};

const cardGenerator = (name, username) => {
    return (
        <Card sx={{maxWidth: 200}}>
                
                <CardMedia
                    component = "img"
                    height = "200"
                    image = {DefaultProfilePhoto}
                    alt = "alt"
                />

                <CardContent>
                    <Typography variant="h5" gutterBottom style={{wordWrap: "break-word"}}>
                        {name}
                    </Typography>

                    <Typography variant="h6">
                        Telegram
                    </Typography>

                    <Typography style={{wordWrap: "break-word"}}>
                        {username}
                    </Typography>
                </CardContent>

            </Card>
    )
}



export default TeamMembers;
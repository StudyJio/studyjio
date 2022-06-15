import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";

export default function MyAccount() {
    return (
        <>
            <Typography variant="h4"> My Account </Typography>

            <Paper sx={{my: 2, p: 2, width: 300}}>

                <img
                    src="./DefaultProfilePhoto.jpg"
                    alt="Profile"
                    width="128px"
                    height="128px"
                    object-fit="cover"
                    border-radius="50%"
                />

                <TextField
                    fullWidth
                    defaultValue={"Ben Awad"}
                    sx={{display: 'block', mb: 1}}

                />
            </Paper>

            <Paper sx={{my: 2, p: 2, width: 300}}>
                <Typography variant="h5" sx={{mb: 2}}> Change Password </Typography>

                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    sx={{display: 'block', mb: 1}}
                />

                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    sx={{display: 'block', mb: 1}}
                />

                <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    sx={{display: 'block', mb: 2}}
                />

                <Button variant="contained"> Change Password </Button>

            </Paper>

            <Button variant="outlined">Sign Out</Button>
        </>
    )
}
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function MyAccount() {
    return (
        <>
            <Typography variant="h4"> My Account </Typography>

            <Paper sx={{my: 2, p: 2, width: 300}}>

                <Box display="flex" justifyContent="center">
                    <Avatar
                        src="./DefaultProfilePhoto.jpg"
                        style={{width: 150, height: 150}}
                        onClick={() => alert("This would open a dialog for selecting a new display photo.")}
                    />
                </Box>
                
                

                <TextField
                    fullWidth
                    defaultValue={"Ben Awad"}
                    sx={{display: 'block',
                         my: 1,
                         input: {textAlign: "center"}}
                       }

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

            <Button variant="contained">Sign Out</Button>
        </>
    )
}
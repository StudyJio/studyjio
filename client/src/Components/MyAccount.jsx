import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Input } from "@mui/material";
import { Popover } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function MyAccount() {

    /**
     * Variables and functions used by the popover menu which opens when the profile picture is clicked.
     */

    const [anchorEl, setAnchorEl] = useState(null);

    function handleClickProfilePhoto(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseProfilePhotoMenu() {
        setAnchorEl(null);
    }

    function handleClickSelectPhoto() {
        // 
    }

    function handleClickRemovePhoto() {
        // TODO: Delete the user's current profile picture from the database.

        // Close the popover menu.
        handleCloseProfilePhotoMenu();
    }

    const isProfilePhotoMenuOpen = Boolean(anchorEl);

    const profilePhotoMenuId = isProfilePhotoMenuOpen ? 'profile-picture-menu' : undefined;


    /**
     * Return statement ===========================================================================
     */

    return (
        <>
            <Typography variant="h4"> My Account </Typography>

            <Paper sx={{ my: 2, p: 2, width: 300 }}>

                <Box display="flex" justifyContent="center">
                    <Avatar
                        src="./DefaultProfilePhoto.jpg"
                        style={{ width: 150, height: 150 }}
                        onClick={handleClickProfilePhoto}
                    />

                    <Popover
                        id={profilePhotoMenuId}
                        open={isProfilePhotoMenuOpen}
                        anchorEl={anchorEl}
                        onClose={handleCloseProfilePhotoMenu}
                        anchorOrigin={{
                            horizontal: 'left',
                            vertical: 'bottom'
                        }}
                        sx={{
                            flexFlow: 'column wrap'
                        }}
                    >
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" type="file" sx={{display: 'none'}}/>
                            <Button variant="outlined" component="span" sx={{m: 1}} startIcon={<UploadFileRoundedIcon />}>
                                Upload Photo...
                            </Button>
                        </label>

                        <Button
                            startIcon={<DeleteRoundedIcon />}
                            variant="outlined"
                            sx={{m: 1}}
                            onClick={handleCloseProfilePhotoMenu}
                        >
                            Remove photo
                        </Button>
                        
                    </Popover>
                </Box>

                <TextField
                    fullWidth
                    defaultValue="Ben Awad"
                    sx={{
                        display: 'block',
                        my: 1,
                        input: { textAlign: "center" }
                    }
                    }

                />

            </Paper>

            <Paper sx={{ my: 2, p: 2, width: 300 }}>
                <Typography variant="h5" sx={{ mb: 2 }}> Change Password </Typography>

                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    sx={{ display: 'block', mb: 1 }}
                />

                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    sx={{ display: 'block', mb: 1 }}
                />

                <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    sx={{ display: 'block', mb: 2 }}
                />

                <Button variant="contained"> Change Password </Button>

            </Paper>

            <Button variant="contained">Sign Out</Button>
        </>
    )
}
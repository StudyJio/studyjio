import { Toolbar, AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { supabase } from "../supabase";

const Header = () => {

    // The element (El) to which the floating 'Sign Out' menu is anchored.
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl); // TODO: Find out what this does.

    function handleClick(event) {
        // When the round account icon is clicked,
        // set the floating 'Sign Out' menu to be anchored to the round account icon.
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        // When the user clicks outside the floating 'Sign Out' menu while the menu is open,
        // close the floating menu by setting its anchor to null.
        // Somehow, this causes `open` to become false?
        setAnchorEl(null);
    }

    function handleSignOut() {
        supabase.auth.signOut(); // Hold up... how does supabase.auth know which user to sign out if there is more than 1 user logged in?
    }

    return (
        <AppBar sx={{zIndex: theme => theme.zIndex.drawer + 1}}> { /* The AppBar at the top of the screen should cover the Drawer on the left. */ }
            <Toolbar>
                <Typography flex="1"> { /* This pushes the User Account icon to the right side of the screen. */ }
                      StudyJio
                </Typography>

                <AccountCircleOutlinedIcon onClick={handleClick}/>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
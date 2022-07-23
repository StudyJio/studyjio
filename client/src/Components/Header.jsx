import { Toolbar, AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { supabase } from "../supabase";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";

function Header(props) {

    function handleSignOut() {
        supabase.auth.signOut(); // Hold up... how does supabase.auth know which user to sign out if there is more than 1 user logged in?
    }

    return (
        <AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}> {/* The AppBar at the top of the screen should cover the Drawer on the left. */}
            <Toolbar>

                {/* A menu button that appears only on narrow screens. */}
                <IconButton
                    onClick={props.handleToggleMobileDrawer}
                >
                    <MenuRoundedIcon
                        sx={{ color: 'white', display: { sm: 'none' }, mr: '5px' }}
                    />
                </IconButton>
                

                <Typography flex="1"> {/* This pushes the User Account icon to the right side of the screen. */}
                    StudyJio
                </Typography>

                {/* A 'Sign Out' icon and button. */}
                <Button
                    variant="text"
                    startIcon={<LogoutIcon />}
                    onClick={handleSignOut}
                    sx={{ color: 'white' }}
                >
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
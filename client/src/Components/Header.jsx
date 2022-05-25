import { Toolbar, AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { withStyles } from "@mui/material";


const Header = () => {
    return (
        <AppBar sx={{zIndex: theme => theme.zIndex.drawer + 1}}> { /* The AppBar at the top of the screen should cover the Drawer on the left. */ }
            <Toolbar>
                <Typography flex="1"> { /* This pushes the User Account icon to the right side of the screen. */ }
                      StudyJio
                </Typography>
                <AccountCircleOutlinedIcon />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
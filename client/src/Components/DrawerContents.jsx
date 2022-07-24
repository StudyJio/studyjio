import { List, ListItem, ListItemButton, ListItemIcon, Toolbar } from "@mui/material";
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { ListItemText } from "@mui/material";
import { Divider } from "@mui/material";

function DrawerContents(props) {
    return (
        <>
            <Toolbar /> {/* Add spacing to prevent the "My Team Members" button from being blocked by the AppBar. */}
            
            <List>
                <ListItem key={"My Team Members"} onClick={() => props.setActivePageName("My Team Members")}>
                    <ListItemButton
                        data-cy="my-team-members-button"    
                    >
                        <ListItemIcon> <GroupsRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="My Team Members" />
                    </ListItemButton>
                </ListItem>

                <ListItem key={"My Team's Tasks"} onClick={() => props.setActivePageName("My Team's Tasks")}>
                    <ListItemButton
                        data-cy="my-team-tasks-button"
                    >
                        <ListItemIcon> <AssignmentRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="My Team's Tasks" />
                    </ListItemButton>
                </ListItem>

                <ListItem key={"Meetup Scheduler"} onClick={() => props.setActivePageName("Meetup Scheduler")}>
                    <ListItemButton
                        data-cy="meetup-scheduler-button"
                    >
                        <ListItemIcon> <CalendarMonthRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="Meetup Scheduler" />
                    </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem key={"Team Preferences"} onClick={() => props.setActivePageName("Team Preferences")}>
                    <ListItemButton
                        data-cy="team-preferences-button"
                    >
                        <ListItemIcon> <PsychologyRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="Team Preferences" />
                    </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem key={"My Account"} onClick={() => props.setActivePageName("My Account")}>
                    <ListItemButton
                        data-cy="my-account-button"
                    >
                        <ListItemIcon> <AccountCircleRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="My Account" />
                    </ListItemButton>
                </ListItem>

            </List>
        </> 
    );
}

export default DrawerContents;
import React, { useState } from 'react';
import Header from './Header';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/material';
import TeamMembers from './TeamMembers';
import TeamTasks from './TeamTasks';
import MeetupScheduler from './MeetupScheduler';
import TeamPreferences from './TeamPreferences';
import DrawerContents from './DrawerContents';
import { Drawer } from '@mui/material';
import MyAccount from './MyAccount';

var pages = {
  "My Team Members": <TeamMembers />,
  "My Team's Tasks": <TeamTasks />,
  "Meetup Scheduler": <MeetupScheduler />,
  "Team Preferences": <TeamPreferences />,
  "My Account": <MyAccount />
}

const SignedInPage = () => {

  const [activePageName, setActivePageName] = useState("My Team Members");
  // By default, users will first see the "My Team Members" page.

  const drawerWidth = 270;

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  function handleToggleMobileDrawer() {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      
      {/* Display the top bar. */}
      <Header handleToggleMobileDrawer={handleToggleMobileDrawer} />

      {/* Display either a permanent drawer or a temporary drawer, depending on the screen width. */}
      <Box
        component="nav"
        sx = {{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
      >

        {/* The drawer to be displayed on narrow screens. */}
        <Drawer
          variant="temporary"
          open={isMobileDrawerOpen}
          onClose={handleToggleMobileDrawer}
          sx={{
            display: { xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
            <DrawerContents setActivePageName={setActivePageName} setIsMobileDrawerOpen={setIsMobileDrawerOpen} handleToggleMobileDrawer={handleToggleMobileDrawer}/>
        </Drawer>

        {/* The drawer to be displayed on wide screens. */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerContents setActivePageName={setActivePageName} />
        </Drawer>
      
      </Box>

      {/* Display the page selected. */}
      <Box
        component="main"
        sx = {{ flexGrow: 1, p: 3, width: {
          sm: `calc(100% - ${drawerWidth}px)`
        }}}>

          {/* Add vertical spacing to prevent the active page from being covered by the top bar. */}
          <Toolbar /> 

          {/* Display the active page. */}
          {pages[activePageName]}

      </Box>
    </Box>
  );
};

export default SignedInPage;
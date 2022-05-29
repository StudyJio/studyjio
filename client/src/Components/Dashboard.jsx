import React, { useState } from 'react';
import Grid from '@mui/material/Grid'
import Header from './Header';
import Menu from './Menu';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/material';
import TeamMembers from './TeamMembers';
import TeamTasks from './TeamTasks';
import MeetupScheduler from './MeetupScheduler';
import TeamPreferences from './TeamPreferences';

var pages = {
  "My Team Members": <TeamMembers />,
  "My Team's Tasks": <TeamTasks />,
  "Meetup Scheduler": <MeetupScheduler />,
  "Team Preferences": <TeamPreferences />
}

const Dashboard = () => {

  const [activePageName, setActivePageName] = useState("My Team Members");
  // By default, users will first see the "My Team Members" page.

  return (
    <Box>
      <Header />
      
      <Grid container>
        <Grid item xs>
          <Menu setActivePageName={setActivePageName}/>
        </Grid>

        <Grid item xs="8" padding="25px">
          <Toolbar />
          {pages[activePageName]}
        </Grid>

        <Grid item xs="1">
          { /* This grid item (column) is empty. It merely provides padding. */ }
        </Grid>
      </Grid>



    </Box>
  );
};

export default Dashboard;
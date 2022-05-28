import React, { useState } from 'react';
import Grid from '@mui/material/Grid'
import Header from './Components/Header';
import Menu from './Components/Menu';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import TeamMembers from './Components/TeamMembers';
import TeamTasks from './Components/TeamTasks';
import MeetupScheduler from './Components/MeetupScheduler';


var pages = {
  "My Team Members": <TeamMembers />,
  "My Team's Tasks": <TeamTasks />,
  "Meetup Scheduler": <MeetupScheduler />
}

const App = () => {
  const [activePageName, setActivePageName] = useState("My Team Members");

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
          { /* This grid item (column) is empty. It merely provides padding.*/ }
        </Grid>
      </Grid>



    </Box>
  );
};

export default App;

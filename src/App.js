// Packages
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// Components
import { Dashboard, LogFood, NewsFeed, Plans, Profile } from './components/pages';
import { NavBar, BottomNavigation } from './components/layout';
import { Drawers } from './components/drawers';

// Utilities
import { cms } from './utilities/cms';
import LandingPage from './components/pages/Landing';


function App() {
  // State / Hooks
  const [tab, setTab] = useState(0);
  const [landingPage, setLandingPage] = useState(true);
  
  // Render
  const renderTab = (tab) => ({
    0: <Dashboard />,
    1: <LogFood />,
    2: <NewsFeed />,
    3: <Plans />,
    4: <Profile />,
  }[tab]);

  // return <LandingPage />
  return landingPage
  ? <LandingPage setLandingPage={setLandingPage} />
  : (
    <Box>
      <NavBar heading={cms.navbar.heading} />
      <AnimatePresence>
      {/* Main */}
        <Grid container spacing={2} p={4}>
          {renderTab(tab)}
        </Grid>
        {/* Dynamic All Drawers */}
        <Drawers />
      </AnimatePresence>
      <BottomNavigation />
    </Box>
  );
}

export default App;
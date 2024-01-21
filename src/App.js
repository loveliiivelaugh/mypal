// Packages
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", async (event) => {
      event.preventDefault();
  
      const relatedApps = await navigator.getInstalledRelatedApps();
  
      // Search for a specific installed platform-specific app
      const psApp = relatedApps.find((app) => app.id === "com.example.myapp");
  
      console.log("Platform-specific app installed:", psApp, event);
      window.installPrompt = event;
    });

  }, []);
  
  // Render
  const renderTab = (tab) => ({
    0: <Dashboard />,
    1: <LogFood />,
    2: <NewsFeed />,
    3: <Plans />,
    4: <Profile />,
  }[tab]);

  // return <LandingPage />
  return (
    <>
      {landingPage
        ? <LandingPage setLandingPage={setLandingPage} />
        : (
          <Box>
            <NavBar heading={cms.navbar.heading} />
            <AnimatePresence>
            {/* Main */}
              <Grid container spacing={2} p={4}>
                {renderTab(tab)}
              </Grid>
            </AnimatePresence>
            <BottomNavigation />
          </Box>
      )}
      {/* Dynamic All Drawers */}
      <Drawers />
    </>
  );
}

export default App;
// Packages
import { Fragment, useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
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
  const [view, setView] = useState(".")

  useEffect(() => {
    let _xDown, _yDown;
    document.getElementById('app').addEventListener('touchstart', handleTouchStart, false);
    document.getElementById('app').addEventListener('touchmove', handleTouchMove, false);

    function ignoreSwipe(event) {
        // if some touches come from elements with ignoreswipe class > ignore
        return Array.from(event.touches).some((t) => t.target.classList.contains('noswipe'));
    }

    function handleTouchStart(event) {
        if (ignoreSwipe(event)) {
            _xDown = undefined;
            _yDown = undefined;
            return;
        }
        const firstTouch = event.touches[0];
        _xDown = firstTouch.clientX;
        _yDown = firstTouch.clientY;
    }

    function handleTouchMove(event) {
        if (!_xDown || !_yDown) {
            return;
        }
        const xUp = event.touches[0].clientX;
        const yUp = event.touches[0].clientY;
        const xDiff = _xDown - xUp;
        const yDiff = _yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                /* left swipe */
                console.log('app: left swipe ', true);
            } else {
                /* right swipe */
                console.log('app: right swipe ', true);
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
                console.log('app: up swipe ', true);
            } else {
                /* down swipe */
                console.log('app: down swipe ', true);
            }
        }
        /* reset values */
        _xDown = null;
        _yDown = null;
    }

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
    0: <Dashboard setView={setView} />,
    1: <LogFood />,
    2: <NewsFeed />,
    3: <Plans />,
    4: <Profile />,
  }[tab]);

  return ({
    ".": (
      <div id="app">
        {(landingPage)
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
      </div>
    ),
    sleep: (
      <div>
          <h1>Sleep View</h1>
          <Button onClick={() => setView(".")}>Go Back</Button>
      </div>
    ),
    recipes: (
      <div>
        <h1>Recipes View</h1>
        <Button onClick={() => setView(".")}>Go Back</Button>
      </div>
      
    ),
    workouts: (
      <div>
        <h1>Workouts View</h1>
        <Button onClick={() => setView(".")}>Go Back</Button>
      </div>
    )
  }[view]);
}

export default App;
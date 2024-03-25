// Packages
import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// Components
import LandingPage from './components/pages/Landing';
import { Dashboard, LogFood, NewsFeed, Plans, Profile } from './components/pages';
import { NavBar, BottomNavigation } from './components/layout';
import { Drawers } from './components/drawers';

// Utilities
import { useHooks } from './hooks';
import { cms } from './utilities/cms';


function App() {
  const hooks = useHooks();
  // console.log("App: ", hooks)
  // State / Hooks
  const [tab, setTab] = useState(0);

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
  
  const tabProps = { tab, setTab };

  // Render
  const renderTab = (tab) => ({
    0: <Dashboard />,
    // converted to open add weight drawer // 1: <LogFood {...tabProps} />,
    2: <NewsFeed />,
    // 3: ,
    4: <Profile {...tabProps} />,
  }[tab]);

  return (
    <div id="app">
      {(hooks?.globalState?.alerts?.landingPage)
        ? <LandingPage setLandingPage={hooks?.actions.setLandingPage} />
        : (
          <Box>
            <NavBar heading={cms.navbar.heading} />
            <AnimatePresence>
            {/* Main */}
              <Grid container spacing={2} p={4}>
                {renderTab(tab)}
              </Grid>
            </AnimatePresence>
            <BottomNavigation {...tabProps} />
          </Box>
      )}
      {/* Dynamic All Drawers */}
      <Drawers />
    </div>
  )
}

export default App;
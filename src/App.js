// Packages
import { useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';

// Components
import Dashboard from './components/pages/Dashboard';
import LogFood from './components/pages/LogFood';
import NewsFeed from './components/pages/NewsFeed';
import Plans from './components/pages/Plans';
import Profile from './components/pages/Profile';
import { NavBar } from './components/layout';
import Drawers from './components/Drawer';
import SimpleBottomNavigation from './components/BottomNavigation';

// Styles
import './App.css';


function App() {
  // State / Hooks
  const [tab, setTab] = useState(0);
  
  const renderTab = (tab) => ({
    0: <Dashboard />,
    1: <LogFood />,
    2: <NewsFeed />,
    3: <Plans />,
    4: <Profile />,
  }[tab]);

  // Render
  return (
    <>
      <CssBaseline />
      <NavBar heading="Open Fitness 💪" />
      {/* Main */}
      <header className="App-header">
        <Grid container spacing={2} p={4}>
          {renderTab(tab)}
        </Grid>
      </header>
      {/* Dynamic All Drawers */}
      <Drawers />
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
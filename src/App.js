// Packages
import { useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';

// Components
import { Dashboard, LogFood, NewsFeed, Plans, Profile } from './components/pages';
import { NavBar, BottomNavigation } from './components/layout';
import { Drawers } from './components/drawers';

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
      <BottomNavigation />
    </>
  );
}

export default App;
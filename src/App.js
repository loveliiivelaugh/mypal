// Packages
import { useState } from 'react';
import { 
  Avatar,
  AppBar, InputAdornment, CssBaseline,
  Autocomplete, Box, Button, Card, Drawer, Grid, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, IconButton, Stack,
  TextField, Toolbar, Typography, ListItemButton, Badge, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HikingIcon from '@mui/icons-material/Hiking';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Add, Notifications } from '@mui/icons-material';

// Components
import CustomShapeBarChart from './components/charts/CustomShapeBar';
import LineChart from './components/charts/LineCharts';
import Login from './components/Login';
import SimpleBottomNavigation from './components/BottomNavigation';
import TwoLevelPieChart from './components/charts/TwoLevelPie';
import Drawers from './components/Drawer';

// Services
import { useGetFoodQuery } from './api';
import { useHooks } from './hooks';

// Constants
import { mock_recentFoods } from './utilities/constants';

// Styles
import './App.css';


const initialState = {
  exerciseName: '',
  skip: true,
  tab: 0,
  open: {},
  getOpenSection: function() {
    const openKeys = Object.keys(this.open);
    return openKeys.length 
      ? openKeys.find(section => this.open[section])
      : null;
  },
};

function App() {
  // State / Hooks
  const hooks = useHooks();
  const [state, setState] = useState(initialState);
  const { tab } = state;

  console.log("App(): ", hooks);

  // Handlers
  // handleChange handles all input changes throughout app
  const handleChange = (event) => {
    // if input type is text field
    if (event?.target) setState({ ...state, [event.target.id]: event.target.value });
    // if input type is date field
    if (event?.date) setState({ ...state, date: new Date(event).toLocaleDateString() });
  };
  
  const handleFocus = () => hooks
    .actions
    .updateDrawers({
      active: "food",
      anchor: "bottom",
      open: true,
    });
  
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

      {/* NavBar */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar alt="A" src="/static/images/avatar/1.jpg" />
          <Typography variant="h5" component="h5">
            Open Fitness 💪
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Login />
            <Notifications />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main */}
      <header className="App-header">
        <Grid container spacing={2} p={4}>
          {renderTab(tab)}
        </Grid>
      </header>

      {/* Dynamic All Drawers */}
      <Drawers />

      {/* Bottom Navigation */}
      <SimpleBottomNavigation 
        // tab={tab}
        // setTab={value => setState({ ...state, tab: value  })}
        extraContent={
          <Grid item xs={12} sm={12} p={2}>
            <Box component="form" onClick={handleFocus}> 
              <Autocomplete
                options={mock_recentFoods}
                sx={{ p: 0, borderRadius: 8, backgroundColor: "rgba(33,33,33,0.8)", color: "#fff" }}
                renderInput={(params) => (
                  <TextField
                    type="text"
                    ref={params.InputProps.ref}
                    {...params.inputProps}
                    value={state.exerciseName}
                    placeholder="Search for a food"
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton p={1} onClick={() => {}} sx={{ color: "#fff" }}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton p={1} onClick={() => {}} sx={{ color: "#fff" }}>
                            <QrCodeScannerIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>
          </Grid>
        }
      />


    </>
  );
}

const Dashboard = () => {
  // Hooks / State
  const hooks = useHooks();
  // Handlers
  const handleProfileClick = () => {
    hooks.actions.closeDrawers();
    hooks.actions.updateDrawers({
      active: "profile",
      anchor: "right",
      open: true,
    });
  };
  // Constants
  const mainKpis = [
    { heading: "Base Goal",
      value: hooks?.profile?.current_profile?.tdee,
      icon: <SportsScoreIcon/>
    },
    {
      heading: "Food",
      value: hooks?.food?.todaysCaloriesConsumed,
      icon: <RestaurantIcon/>
    },
    { 
      heading: "Exercise",
      value: 0,
      icon: <WhatshotIcon/>
    }
  ];

  return (
    <>
      {/* Page Header */}
        <Grid item xs={12} sm={12}>
            <Typography variant="h4" component="h4" gutterBottom>
              Today
            </Typography>
          </Grid>

          {/* Header Card -- Main Details */}
          <Grid item xs={12} sm={12}>
            <Card sx={{ minWidth: 275, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item sm={12} textAlign="left">
                  <Typography variant="h5" component="p" gutterBottom>
                    Calories
                  </Typography>
                  <Typography variant="subtitle1" component="p" gutterBottom>
                    Remaining = Goal - Food + Exercise
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TwoLevelPieChart>
                  <text x="50%" y="50%" textAnchor="middle" fill="#fff" dominantBaseline="middle">
                    {hooks?.food?.goalCalories}<br/>
                    <tspan fontSize="12" fill="#999">Remaining</tspan>
                  </text>
                  </TwoLevelPieChart>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack component={List} spacing={2}>
                  {mainKpis.map((item, i) => (
                    <ListItem key={item.heading}>
                      <ListItemIcon sx={{ color: {0: '#fff', 1: '#1af', 2: '#fc0'}[i] }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.heading} secondary={item.value} />
                      <Tooltip title={`${item.heading} Help`} placement="top">
                        <Badge badgeContent="?" color="primary" onClick={handleProfileClick} sx={{ cursor: "pointer" }} />
                      </Tooltip>
                    </ListItem>
                  ))}
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Steps Card */}
            <Card sx={{ minWidth: 275, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item sm={12} textAlign="left">
                  <Typography variant="h5" component="p" gutterBottom>
                    Steps
                  </Typography>
                  <IconButton sx={{ color: "#fff" }}>
                    <HikingIcon /> {` ${hooks?.steps?.todaysSteps}`} 
                  </IconButton>
                  <Typography variant="body1" component="p" gutterBottom>
                    Goal: 10,000 steps
                  </Typography>
                  <LinearProgress variant="determinate" value={26.8} />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Exercise Card */}
            <Card sx={{ minWidth: 275, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item sm={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h5" component="p" gutterBottom>
                    Exercise
                  </Typography>
                  <IconButton onClick={() => hooks.actions.updateDrawers({ active: "exercise", anchor: "bottom", open: true })} sx={{ color: "#fff" }}>
                    <Add /> 
                  </IconButton>
                </Grid>
                <Grid item sm={12} sx={{ textAlign: "left", display: "flex" }}>
                  <IconButton sx={{ color: "#fc0" }}>
                    <WhatshotIcon/>
                  </IconButton>
                  <Typography variant="body1" component="p" gutterBottom>
                  {/* TODO: Need to research into how to calculate calories burned per exercise */}
                    0 cal
                  </Typography>
                </Grid>
                <Grid item sm={12} sx={{ textAlign: "left", display: "flex" }}>
                  <IconButton sx={{ color: "#fc0" }}>
                    <WatchLaterIcon />
                  </IconButton>
                  <Typography variant="body1" component="p" gutterBottom>
                  {/* TODO: Need to add a function that will calculate total time of daily exercise */}
                    00:00 hr
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Weight Card */}
          <Grid item xs={12} sm={12}>
            <Card sx={{ minWidth: 275, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item sm={12} textAlign="left">
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Stack>
                      <Typography variant="h5" component="p" gutterBottom>
                        Weight
                      </Typography>
                      <Typography variant="body1" component="p" gutterBottom>
                        Last 90 days
                      </Typography>
                    </Stack>
                    <IconButton onClick={() => hooks.actions.updateDrawers({ active: "weight", anchor: "bottom", open: true})} sx={{ color: "#fff" }}>
                      <Add />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ height: "400px" }}>
                  <LineChart />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Steps Card */}
          <Grid item xs={12} sm={12}>
            <Card sx={{ minWidth: 275, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item sm={12} textAlign="left">
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Stack>
                      <Typography variant="h5" component="p" gutterBottom>
                        Steps
                      </Typography>
                      <Typography variant="body1" component="p" gutterBottom>
                        Last 30 days
                      </Typography>
                    </Stack>
                    <Button variant="text">iPhone</Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ height: "400px" }}>
                  <CustomShapeBarChart />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </>
  )
};

const LogFood = () => {
  // State / Hooks
  const [foodSearch, setFoodSearch] = useState("");
  const [skip, setSkip] = useState(true);

  // Queries
  const { data, isLoading, isError } = useGetFoodQuery({ foodSearch }, { skip });

  let test_data = data ? data :  [
    {
      id: 1,
      name: "Banana",
    },
    {
      id: 2,
      name: "Apple",
    },
  ]

  // Constants
  const caloriesRemaining = [
    { heading: "Base Goal", value: 3590 },
    { heading: "Food", value: 0 },
    { heading: "Exercise", value: 0 },
    { heading: "Remaining", value: 0 },
  ];
  const operators = ["-", "+", "="];

  // Helpers
  // Calculate remaining calories
  const calculateDailyRemainingCalories = () => {
    const baseGoal = caloriesRemaining[0].value;
    const food = caloriesRemaining[1].value;
    const exercise = caloriesRemaining[2].value;
    const remaining = baseGoal - food + exercise;
    caloriesRemaining[3].value = remaining;
    return remaining;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkip(false);
  };

  // Render
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            Edit
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Today
          </Typography>
          <Button color="inherit">Save</Button>
        </Toolbar>
      </AppBar>
      <Grid item xs={12} sm={12}>
        <Card sx={{ minWidth: 275, width: '100%', p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" component="p" gutterBottom>
                Calories Remaining
              </Typography>
              <Button>...</Button>
            </Grid>
            <Grid item xs={12} sm={12} textAlign="center">
              <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {caloriesRemaining.map((item, i) => (
                  <>
                    <Stack>
                      <Typography variant="h4" component="p" gutterBottom>
                        {(item.heading === "Remaining") 
                          ? calculateDailyRemainingCalories() 
                          : item.value
                        }
                      </Typography>
                      <Typography variant="body1" component="p" gutterBottom>
                        {item.heading}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" component="p" gutterBottom>
                        <strong>
                          {operators[i]}
                        </strong>
                      </Typography>
                    </Stack>
                  </>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Card>
        {['Breakfast', 'Lunch', 'Dinner'].map((card) => (
          <Card sx={{ width: '100%', p: 2, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} textAlign="left">
                <Typography variant="body1" component="p" gutterBottom>
                  {card}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button>Add Food</Button>
                <Button>...</Button>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
      <Drawer
        anchor={"right"}
        open={true}
        onClose={() => {}}
        PaperProps={{
          sx: {
            width: '100%',
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box role="presentation">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Food
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ p: 1, flex: 1, borderRadius: '24px' }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={foodSearch}
              onChange={(e) => setFoodSearch(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </form>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            History
          </Typography>
          <List>
            {test_data?.map((item) => (
              <ListItem component={Button} key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={item.name} secondary="100 cal, 4 oz., Shaved Steak" />
                <ListItemButton sx={{ justifyContent: "end" }}>+</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
};

const NewsFeed = () => {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1" component="p" gutterBottom>
          News Feed
        </Typography>
      </Grid>
    </>
  )
};

const Plans = () => {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1" component="p" gutterBottom>
          Plans
        </Typography>
      </Grid>
    </>
  )
};

const Profile = () => {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1" component="p" gutterBottom>
          Profile
        </Typography>
      </Grid>
    </>
  )
};


export default App;


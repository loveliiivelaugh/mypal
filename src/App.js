// Packages
import { useState } from 'react';
import { 
  InputLabel, Avatar, Select, MenuItem,
  AppBar, Chip, InputAdornment, CssBaseline, Divider,
  Autocomplete, Box, Button, Card, Drawer, Grid, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, IconButton, Stack,
  TextField, Toolbar, Typography, ListItemButton, Tab, Tabs, Badge, Tooltip, CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HikingIcon from '@mui/icons-material/Hiking';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Add, ArrowBack, Attachment, Check, Close, Delete, Notifications } from '@mui/icons-material';

// Components
import BasicDatePicker from './components/BasicDatePicker';
import CustomShapeBarChart from './components/charts/CustomShapeBar';
import LineChart from './components/charts/LineCharts';
import Login from './components/Login';
import SimpleBottomNavigation from './components/BottomNavigation';
import TwoLevelPieChart from './components/charts/TwoLevelPie';
import TdeeCalculator from './components/forms/TdeeCalculator';

// Services
import { 
  useGetSessionQuery,
  useGetAllQuery,
  useGetExerciseQuery, 
  useGetFoodQuery, 
  dbApi, 
} from './api';
import foodRepoData from './api/food_repo.data';

// Constants
import { 
  exerciseHistory, foodHistory, mock_exercises, mock_recentFoods, tabs 
} from './utilities/constants';

// Utilities
import { cap_first, tryCatchHandler } from './utilities/helpers'
import { useHooks } from './hooks';

// Styles
import './App.css';
import Drawers from './components/Drawer';


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
  let [state, setState] = useState(initialState);

  const { exerciseName, open, skip, tab } = state;
  // console.log(state, { hooks })

  // Global Actions
  const { createAlert } = hooks.actions;
  
  // Api
  const { data, isLoading, isError } = useGetExerciseQuery({ name: exerciseName }, { skip });

  // Helpers
  const getOpenSection = () => Object.keys(open).find(section => open[section]);

  // Handlers
  // const handleSubmit = async (event) => {
  //   event?.preventDefault();
  //   setState({ ...state, isSubmitting: true });

  //   let { weight, date, reps, sets, time } = state;
  //   if (!date) date = new Date().toLocaleDateString();
  //   if (!time) time = new Date().toLocaleTimeString();
  //   // Get/define payload from payload definitions
  //   const payload = {
  //     weight: { weight, date },
  //     exercise: { name: state?.exerciseSelected?.name, reps, sets, date },
  //     food: { 
  //       name: state.foodSelected?.name_translations["en"], 
  //       calories: state.foodSelected?.nutrients?.energy_calories_kcal?.per_portion,
  //       nutrients: state.foodSelected?.nutrients,
  //       date, time,
  //     }
  //   }[getOpenSection()] || {};

  //   // Add current logged in user_id to payload
  //   payload.user_id = hooks.user_id;

  //   console.log("handleSubmit(): ", payload)

  //   // Send payload to db
  //   const [response, error] = await tryCatchHandler(() => dbApi.add(getOpenSection(), [payload]));

  //   if (error) createAlert("error", error.message);
  //   console.log("Database request result: ", response);

  //   if (response) {
  //     createAlert("success", `Saved ${getOpenSection()}!`);
  //     // Refetch database data
      
  //   };

  //   // Clear payload values from state
  //   Object.keys(payload).forEach(key => state[key] = "");

  //   // Reset state values
  //   setState({ 
  //     ...state, 
  //     skip: true, 
  //     isSubmitting: false, 
  //     open: { ...open, [getOpenSection()]: false }
  //   });
  // };

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

  const handleSubmit = async (form) => {
    const { actions, drawers, db } = hooks;
    const { active } = drawers;

    console.log("handleSubmite top: ", form, active)
    const { nutrients, muscle } = state?.selected;
    if (nutrients) {
      // Format food submit *TODO: move to separate function
      const calculate_calories = (calories) => {
        const servingSize = parseInt(form.serving_size);
        const numServings = parseInt(form.num_servings);
        const serving = (typeof(servingSize) === "number")
          ? servingSize
          : 1;

        return ((calories * serving) * numServings);
      };
      
      console.log("handleSubmit(): ", { nutrients, form, state })
      const formattedNutrients = Object.assign(
        {}, 
        ...Object
          .keys(nutrients)
          .map(nutrient => ({ 
            [nutrient]: nutrients[nutrient]?.per_hundred, 
            unit: nutrients[nutrient]?.unit 
        })))

      if (active === "food") form = {
        name: state.selected?.name_translations["en" || "it"] 
          || "No name/english translation found", 
        calories: calculate_calories(nutrients?.energy_calories_kcal.per_hundred),
        nutrients: formattedNutrients,
        date: form.date || new Date().toLocaleDateString(),
        time: form.time || new Date().toLocaleTimeString(),
        meal: form.meal || "snack",
      };
      // --- END Format food submit *TODO: move to separate function ---
    };

    if (muscle) {
      // Format exercise submit *TODO: move to separate function
      const formattedExercise = {
        date: form.date || new Date().toLocaleDateString(),
        time: form.time || new Date().toLocaleTimeString(),
        ...state.selected,
        ...form,
      };

      form = formattedExercise;
      // --- END Format exercise submit *TODO: move to separate function ---
    }

    console.log("submitting form: ", active, form, state)
    const [response, error] = await tryCatchHandler(
      () => db.add(active, form), 
      () => {
        actions.closeDrawers();
        actions.createAlert("success", `Successfully added ${cap_first(active)} ${form?.name}`);
        actions.updateDrawers({ ...drawers, anchor: "bottom" });
      })

    console.log("handleSubmit() response: ", response, error)
    if (error || response.error) createAlert("error", response.error?.message);

    // refecth data
    ({
      food: () => hooks.food.refetch(),
      exercise: () => hooks.exercise.refetch(),
      weight: () => hooks.weight.refetch(),
      profile: () => hooks.profile.refetch(),
    }[active])();

  };

  const handleSelected = (selected) => {
    // // depending on which selection; Selected will have different keys ...
    // // Destructure any available keys here
    // const { name, calories, nutrients, date, time, reps, sets, weight } = selected;
    // console.log("handleSelected(); ", selected)
    setState({ ...state, selected });
  }
  
  // Render
  const tabProps = { dashboard: {}};

  const renderTab = (tab) => ({
    0: <Dashboard {...tabProps.dashboard} />,
    1: <LogFood />,
    2: <NewsFeed />,
    3: <Plans />,
    4: <Profile />,
  }[tab]);

  // Render
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar alt="M" src="/static/images/avatar/1.jpg" />
          <Typography variant="h5" component="h5">
            oAIFitness
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Login />
            <Notifications />
          </Box>
        </Toolbar>
      </AppBar>

      <header className="App-header">
        <Grid container spacing={2} p={4}>
          {renderTab(tab)}
        </Grid>
      </header>

      <Drawers
        selected={state?.selected || null}
        handleSelected={handleSelected} 
        handleForm={handleSubmit}
      />

      <SimpleBottomNavigation 
        tab={tab}
        setTab={value => setState({ ...state, tab: value  })}
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
              {/* <button type="submit">Submit</button> */}
            </Box>
          </Grid>
        }
        // ...props
      />
    </>
  );
}

const Dashboard = (props) => {
  const hooks = useHooks();
  const handleProfileClick = () => {
    hooks.actions.closeDrawers();
    hooks.actions.updateDrawers({
      active: "profile",
      anchor: "right",
      open: true,
    });
  };

  console.log("Dashboard() props: ", hooks);

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
                  {[
                    { heading: "Base Goal",
                      value: hooks?.profile?.tdee,
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
                  ].map((item, i) => (
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
                    <HikingIcon /> {' '} 394
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


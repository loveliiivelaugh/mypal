// Packages
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query'
import { 
  InputLabel, Avatar, Select, MenuItem,
  AppBar, Chip, InputAdornment, CssBaseline, Divider,
  Autocomplete, Box, Button, Card, Drawer, Grid, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, IconButton, Stack,
  TextField, Toolbar, Typography, ListItemButton, Tab, Tabs,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HikingIcon from '@mui/icons-material/Hiking';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Add, ArrowBack, Attachment, Check, Delete, Notifications } from '@mui/icons-material';

// Components
import BasicDatePicker from './components/BasicDatePicker';
import CustomShapeBarChart from './components/charts/CustomShapeBar';
import LineChart from './components/charts/LineCharts';
import Login from './components/Login';
import SimpleBottomNavigation from './components/BottomNavigation';
import TwoLevelPieChart from './components/charts/TwoLevelPie';

// Services
import { useGetExerciseQuery, useGetFoodQuery, dbApi } from './api';
import foodRepoData from './api/food_repo.data';

// Constants
import { 
  exerciseHistory, foodHistory, mock_exercises, mock_recentFoods, tabs 
} from './utilities/constants';

// Utilities
import { cap_first, tryCatchHandler } from './utilities/helpers'
import { alerts } from './redux'

// Styles
import './App.css';
import { useResponsive } from './hooks';


const useActions = () => {
  const dispatch = useDispatch();
  return {
    createAlert: (type, message) => dispatch(alerts.createAlert({ type, message }))
  }
};

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
  const { isSmallScreen } = useResponsive();
  const [state, setState] = useState(initialState);
  const { exerciseName, open, skip, tab } = state;

  // Global Actions
  const { createAlert } = useActions();
  
  // Api
  const { data, isLoading, isError } = useGetExerciseQuery({ name: exerciseName }, { skip });
  // const weightHistory = useGetWeightQuery();
  // const foodHistory = useGetFoodQuery();

  // Queries *TODO: Convert these queries to redux toolkit queries ^^
  const weightQuery = useQuery({ queryKey: ["weight", dbApi.getAll], queryFn: () => dbApi.getAll("weight") });
  const exerciseQuery = useQuery({ queryKey: ["exercise"], queryFn: () => dbApi.getAll("exercise") });
  const foodQuery = useQuery({ queryKey: ["food"], queryFn: () => dbApi.getAll("food") });
  // console.log("useQuery(): ", weightQuery.data, exerciseQuery.data, foodQuery.data);
  
  // Helpers
  const getOpenSection = () => Object.keys(open).find(section => open[section]);

  console.log(foodRepoData)

  // Handlers
  const handleSubmit = async (event) => {
    event?.preventDefault();
    setState({ ...state, isSubmitting: true });

    let { weight, date, reps, sets, time } = state;
    if (!date) date = new Date().toLocaleDateString();
    if (!time) time = new Date().toLocaleTimeString();
    // Get/define payload from payload definitions
    const payload = {
      weight: { weight, date },
      exercise: { name: state?.exerciseSelected?.name, reps, sets, date },
      food: { 
        name: state.foodSelected?.name_translations["en"], 
        calories: state.foodSelected?.nutrients?.energy_calories_kcal?.per_portion,
        nutrients: state.foodSelected?.nutrients,
        date, time,
      }
    }[getOpenSection()] || {};

    console.log("handleSubmit(): ", payload)

    // Send payload to db
    const [response, error] = await tryCatchHandler(() => dbApi.add(getOpenSection(), [payload]));

    if (error) createAlert("error", error.message);
    console.log("Database request result: ", response);

    if (response) {
      createAlert("success", `Saved ${getOpenSection()}!`);
      // Refetch database data
      
    };

    // Clear payload values from state
    Object.keys(payload).forEach(key => state[key] = "");

    // Reset state values
    setState({ 
      ...state, 
      skip: true, 
      isSubmitting: false, 
      open: { ...open, [getOpenSection()]: false }
    });
  };

  const handleChange = (event) => {
    // if input type is text field
    if (event?.target) setState({ ...state, [event.target.id]: event.target.value });
    // if input type is date field
    if (event?.date) setState({ ...state, date: new Date(event).toLocaleDateString() });
  };

  const handleDrawers = (direction, section, action) => {
    // dynamically open drawers
    if (direction && action.includes('open')) setState({ ...state, open: { ...open, [section]: direction } });
    // dynamically close drawers
    else setState({ ...state, open: { ...open, [section]: false } });
  };

  // Render
  const tabProps = { dashboard: { handleDrawers, queries: {weightQuery, exerciseQuery, foodQuery} }};

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

      <Drawer
        anchor="right"
        open={Object.keys(open).some(key => open?.[key] === "right")}
        onClose={() => handleDrawers("bottom", getOpenSection(), "open")}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', width: "40vw" },
        }}
      >
        <Box sx={{ overflow: 'auto' }} component="form" onSubmit={handleSubmit}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton onClick={() => setState({...state, open: {...open, food: "bottom" }})}><ArrowBack /></IconButton>
            <Typography variant="h6" textAlign="center">Add {cap_first(getOpenSection())}</Typography>
            <IconButton type="submit"><Check /></IconButton>
          </Toolbar>

          { // Render "right" drawer content based on open section
            {
            
            weight: <></>,
            exercise: (
              <List>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <ListItem sx={{ justifyContent: "space-between" }} primary={state?.exerciseSelected?.name}></ListItem>
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel># of Sets</InputLabel>
                  <TextField
                    id="sets"
                    type="number"
                    value={state?.sets}
                    onChange={handleChange}
                    placeholder={5}
                  />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel># of Reps</InputLabel>
                  <TextField
                    id="reps"
                    type="number"
                    value={state?.reps}
                    onChange={handleChange}
                    placeholder={10}
                  />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Date</InputLabel>
                  <BasicDatePicker id="date" label="Date" value={state["date"]} handleChange={handleChange} placeholder={new Date().toLocaleString()} /> 
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <Button variant="outlined" fullWidth type="submit">Add Exercise</Button>
                </ListItem>
              </List>
            ),
            food: (
              <List>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <ListItemText primary={state?.foodSelected?.display_name_translations?.["en"]} secondary={state?.foodSelected?.display_name_translations?.["en"]} />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Serving Size</InputLabel>
                  <TextField id="serving_size" value={state?.serving_size} onChange={handleChange} placeholder="4oz" />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Number of Servings</InputLabel>
                  <TextField id="num_servings" value={state?.num_servings} onChange={handleChange} placeholder={1} />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Time</InputLabel>
                  <TextField id="serving_time" value={state?.serving_time} onChange={handleChange} placeholder={new Date().toLocaleString()} />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Meal</InputLabel>
                  <Select id="meal" value={state?.meal || "Breakfast"} onChange={handleChange} placeholder="Select a Meal">
                    <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                    <MenuItem value={"Lunch"}>Lunch</MenuItem>
                    <MenuItem value={"Dinner"}>Dinner</MenuItem>
                    <MenuItem value={"Snack"}>Snack</MenuItem>
                  </Select>
                </ListItem>
                <ListItem>
                  <Stack variant="row">

                  </Stack>
                </ListItem>
              </List>
            )
          }[getOpenSection()]}

        </Box>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={getOpenSection() || false}
        onClose={() => handleDrawers(false, getOpenSection(), 'close')}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }} component="form" onSubmit={handleSubmit}>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => handleDrawers(false, getOpenSection(), 'close')}>X</Button>
            <Typography variant="h6" component="p" gutterBottom>
              {`Add ${cap_first(getOpenSection())}`}
            </Typography>
            <Button type="submit">✔️</Button>
          </Box>
          <Toolbar />
          {{
            weight: (
              <>
                <Box sx={{ width: "100%", display: "flex" }}>
                  <TextField
                    id="weight"
                    label="Weight"
                    variant="outlined"
                    type="float"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 0, max: 1000 } }}

                  />
                </Box>
                <Box sx={{ width: "100%", display: "flex" }}>
                  <BasicDatePicker id="date" label="Date" value={state["date"]} handleChange={handleChange} /> 
                </Box>
                <Box sx={{ width: "100%", display: "flex", border: "1px solid rgba(33,33,33,0.2)", borderRadius: 1, justifyContent: "space-between", my: 1, py: 1 }}>
                  <Typography id="demo-simple-select-label" variant="body1">Progress Photo</Typography>
                  <IconButton p={1}>
                    <Attachment />
                  </IconButton>
                </Box>
              </>
            ),
            food: (
              <>
                <Box sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
                  <Autocomplete
                    id="food"
                    options={foodRepoData?.data || []}
                    fullWidth
                    onLoadedData={() => setState({...state, skip: true })}
                    loading={isLoading}
                    sx={{ ml: 4 }}
                    getOptionLabel={(option) => {
                      // console.log("getOptionLabel: ", option, option?.name)
                      return option?.display_name_translations["en"]
                    }}
                    renderOption={(props, option) => {
                      // return option
                      const image = option.images.find(({categories}) => categories.includes("Front"))?.thumb;
                      // console.log("renderOption: ", props, option, image)
                      return (
                        <Stack direction="row" spacing={1} p={1} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(33,33,33,0.1)"} }} onClick={() => setState({...state, foodSelected: option, open: {...open, food: "right" }})}>
                          <Avatar src={image} />
                          <Typography variant="h6">{option?.display_name_translations["en"]}</Typography>
                          <Chip size="small" label={option?.country} />
                        </Stack>
                      )
                    }}
                    renderInput={(params) => (
                      <Box ref={params.InputProps.ref}>
                        <TextField
                          type="text"
                          {...params.inputProps}
                          value={state.foodName}
                          placeholder="Search for a food"
                          onChange={handleChange}
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton p={1} onClick={() => setState({...state, skip: false })}>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton p={1} onClick={() => setState({...state, foodName: "" })}>
                                  <QrCodeScannerIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Box>
                    )}
                  />
                </Box>
                <Grid id="food-history-container" container>
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Tabs>
                      {["All", "My Meals", "My Recipes", "My Foods"].map((tab, i) => <Tab key={`${tab}_tab`} label={tab} value={i} />)}
                    </Tabs>
                  </Grid>

                  {/* TODO: Quick Add Buttons Section goes here */}
                  
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">History</Typography>
                      <Chip component={Button} variant="outlined" label="Most Recent" onClick={() => createAlert("success", "SUper Super tesT!")}/>
                    </Box>
                    <List id="food-history-list">
                      {foodQuery?.data?.data.map((food, i) => (
                        <ListItem key={`${food.date}_${food.name}`} component={ListItemButton}>
                          <ListItemText primary={food.name} secondary={foodHistory.formatFoodObjectToString(food)} />
                          <Box>
                            <IconButton 
                              onClick={() => setState({
                                ...state, 
                                foodSelected: foodRepoData.data
                                  .find(({ display_name_translations }) => (display_name_translations["en"] === food.name)), 
                                open: {...open, food: "right" }
                              })}
                            >
                              <Add />
                            </IconButton>
                            <IconButton onClick={() => dbApi.delete("food", food.id)}><Delete /></IconButton>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  
                </Grid>
              </>
            ),
            exercise: (
              <>
                <Box sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
                  <Autocomplete
                    id="exerciseName"
                    options={mock_exercises || data || []}
                    fullWidth
                    onLoadedData={() => setState({...state, skip: true })}
                    loading={isLoading}
                    sx={{ ml: 4 }}
                    getOptionLabel={(option) => {
                      console.log("getOptionLabel: ", option, option?.name)
                      return option?.name
                    }}
                    renderOption={(props, option) => {
                      console.log("renderOption: ", props, option)
                      // return option
                      return (
                        <Stack direction="row" spacing={1} p={1} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(33,33,33,0.1)"} }} onClick={() => setState({ ...state, exerciseSelected: option, open:{...open, [getOpenSection()]: "right"} })}>
                          <>{option?.name}{` `}</>
                          <Chip size="small" label={option?.muscle} />
                          <Chip variant="outlined" size="small" label={option?.type} />
                        </Stack>
                      )
                    }}
                    onClick={e => console.log("click!!", e)}
                    renderInput={(params) => (
                      <Box ref={params.InputProps.ref}>
                        <TextField
                          type="text"
                          {...params.inputProps}
                          value={state.exerciseName}
                          placeholder="Search for an exercise"
                          onChange={handleChange}
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton p={1} onClick={() => setState({...state, skip: false })}>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    )}
                  />
                </Box>
                <Grid id="exercise-history-container" container>
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Tabs>
                      {tabs.map(tab => <Tab key={`${tab}_tab`} label={tab} />)}
                    </Tabs>
                  </Grid>
                  
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body1">History</Typography>
                      <Chip component={Button} variant="outlined" label="Most Recent" />
                    </Box>
                    <List id="exercise-history-list">
                      {exerciseHistory.data.map(({ date, exercise, sets }) => (
                        <ListItem key={`${date}_${exercise}`}>
                          <ListItemText primary={exercise} secondary={exerciseHistory.formatSetsArrayToString(sets)} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Button variant="outlined" fullWidth onClick={() => handleDrawers("right", getOpenSection(), 'open')}>
                      Create a New Exercise
                    </Button>
                  </Grid>
                </Grid>
              </>
            ),
          }[getOpenSection()]}
        </Box>
      </Drawer>

      <SimpleBottomNavigation 
        tab={tab}
        setTab={value => setState({ ...state, tab: value  })}
        extraContent={
          <Grid item xs={12} sm={12} p={2}>
            <Box component="form"> 
              <Autocomplete
                options={mock_recentFoods}
                onFocus={() => setState({...state, open: {...open, food: "bottom" }})}
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
  const { weightQuery } = props.queries;
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
                  <TwoLevelPieChart />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack component={List} spacing={2}>
                  {[
                    { heading: "Base Goal",
                      value: 3590,
                      icon: <SportsScoreIcon/>
                    },
                    {
                      heading: "Food",
                      value: 0,
                      icon: <RestaurantIcon/>
                    },
                    { 
                      heading: "Exercise",
                      value: 0,
                      icon: <WhatshotIcon/>
                    }
                  ].map((item, i) => (
                    <ListItem key={item.heading}>
                      <ListItemIcon sx={{ color: {0: '#fff', 1: '#1af', 2: '#fc0'}[i] }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.heading} secondary={item.value} />
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
                  <IconButton onClick={() => props.handleDrawers('bottom', 'exercise', 'open')} sx={{ color: "#fff" }}>
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
                    <IconButton onClick={() => props.handleDrawers('bottom', 'weight', 'open')} sx={{ color: "#fff" }}>
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

// Packages
import React from 'react';
import { 
  AppBar, Chip, InputAdornment,
  Autocomplete, Box, Button, Card, Drawer, Grid, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, IconButton, Stack,
  TextField, Toolbar, Typography, ListItemButton, Tab, Tabs, InputLabel 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Attachment } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query'
// Components
import BasicDatePicker from './components/BasicDatePicker';
import CustomShapeBarChart from './components/charts/CustomShapeBar';
import LineChart from './components/charts/LineCharts';
import Login from './components/Login';
import SimpleBottomNavigation from './components/BottomNavigation';
import TwoLevelPieChart from './components/charts/TwoLevelPie';

// Services
import { useGetExerciseQuery, useGetFoodQuery, dbApi } from './api';

// Constants
import { exerciseHistory, mock_exercises, muscles, tabs } from './utilities/constants';

// Utilities
import { cap_first, tryCatchHandler } from './utilities/helpers'

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
  const [state, setState] = React.useState(initialState);
  const { exerciseName, open, skip, tab } = state;
  // Api
  const { data, isLoading, isError } = useGetExerciseQuery({ name: exerciseName }, { skip });
  console.log({ data , isLoading, isError })

  // Helpers
  const getOpenSection = () => Object.keys(open).find(section => open[section]);

  // Handlers
  const handleSubmit = async (event) => {
    event?.preventDefault();

    const { weight, date, reps, sets, foodName, calories } = state;
    // Get/define payload from payload definitions
    const payload = {
      weight: { weight, date },
      exercise: { name: state?.exerciseSelected?.name, reps, sets, date },
      food: { name: foodName, calories, date }
    }[getOpenSection()] || {};

    console.log("handleSubmit(): ", payload)

    // Send payload to db
    const [response, error] = await tryCatchHandler(
      // try
      () => dbApi.add(getOpenSection(), [payload]), 
      // finally
      () => {}
    );

    console.log("Database request result: ", response);
    // 
    setState({ ...state, skip: true });

    // Clear payload values from state
    Object.keys(payload).forEach(key => state[key] = "");

    // Close open drawer
    setState({ ...state, open: { ...open, [getOpenSection()]: false } });
  };

  const handleChange = (event) => {
    if (event?.target) setState({ ...state, [event.target.id]: event.target.value });
    if (event?.date) setState({ ...state, date: new Date(event).toLocaleDateString() });
  };

  const handleDrawers = (direction, section, action) => {
    if (direction && action.includes('open')) setState({ ...state, open: { ...open, [section]: direction } });
    else setState({ ...state, open: { ...open, [section]: false } });
  };

  const tabProps = { 
    dashboard: { handleDrawers },
  };

  const renderTab = (tab) => ({
    0: <Dashboard {...tabProps.dashboard} />,
    1: <LogFood />,
    2: <NewsFeed />,
    3: <Plans />,
    4: <Profile />,
  }[tab]);

  // Effects

  // Render
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2} p={4}>
          {renderTab(tab)}
        </Grid>
      </header>

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
            food: "Add Food",
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
                        <Stack direction="row" spacing={1} p={1} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(33,33,33,0.1)"} }} onClick={e => setState({ ...state, exerciseSelected: option })}>
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
                  <Grid item sm={12}>
                    {state.exerciseSelected && (
                      <Grid container sx={{ display: "Flex", justifyContent: "space-around"}}>
                        <Grid item sm={12} textAlign="center">
                          <Typography variant="h4">{state?.exerciseSelected?.name}</Typography>
                        </Grid>
                        <Grid item sm={12}>
                          <InputLabel># of Reps</InputLabel>
                          <TextField
                            id="reps"
                            type="number"
                            value={state?.reps}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <InputLabel># of Sets</InputLabel>
                          <TextField
                            id="sets"
                            type="number"
                            value={state?.sets}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <InputLabel>Date</InputLabel>
                          <BasicDatePicker id="date" label="Date" value={state["date"]} handleChange={handleChange} /> 
                        </Grid>
                        <Grid item sm={12}>
                          <Button variant="outlined" fullWidth onClick={handleSubmit}>Add Exercise</Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Tabs>
                      {tabs.map(tab => <Tab key={`${tab}_tab`} label={tab} />)}
                    </Tabs>
                  </Grid>
                  
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
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
        <>
          <Grid item xs={12} sm={12} sx={{ p: 2}}>
            <Login />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ p: 2}}>
            <form onSubmit={handleSubmit}>
              <Autocomplete
                freeSolo
                disableClearable
                options={muscles}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      {...params.inputProps}
                      value={state.exerciseName}
                      placeholder="Search for a food"
                      onChange={handleChange}
                      style={{ width: "100%", padding: "10px", height: "10px", borderRadius: "24px"  }}
                    />
                  </div>
                )}
              />
              {/* <button type="submit">Submit</button> */}
            </form>
          </Grid>
        </>
        }
        // ...props
      />

    </div>
  );
}

const Dashboard = (props) => {
  // Queries
  const weightQuery = useQuery({ queryKey: ["weight", dbApi.getAll], queryFn: () => dbApi.getAll("weight") });
  const exerciseQuery = useQuery({ queryKey: ["exercise"], queryFn: () => dbApi.getAll("exercise") });
  const foodQuery = useQuery({ queryKey: ["foods"], queryFn: () => dbApi.getAll("foods") });
  console.log("useQuery(): ", weightQuery.data, exerciseQuery.data, foodQuery.data);
  return (
    <>
     {/* Page Header */}
      <Grid item xs={12} sm={12}>
            <Typography variant="h1" component="p" gutterBottom>
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
                      value: 3590
                    },
                    {
                      heading: "Food",
                      value: 0
                    },
                    { 
                      heading: "Exercise",
                      value: 0
                    }
                  ].map((item) => (
                    <ListItem key={item.heading}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={item.heading} />
                      <ListItemText primary={item.value} />
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
                  <Typography variant="body1" component="p" gutterBottom>
                    &icon& 268
                  </Typography>
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
                <Grid item sm={12} textAlign="left">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="p" gutterBottom>
                      Exercise
                    </Typography>
                    <Button variant="text" onClick={() => props.handleDrawers('bottom', 'exercise', 'open')}>+</Button>
                  </Box>
                  <Typography variant="body1" component="p" gutterBottom>
                    0 cal
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
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
                    <Button variant="text" onClick={() => props.handleDrawers('bottom', 'weight', 'open')}>+</Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ height: "400px" }}>
                  <LineChart data={weightQuery?.data?.data} />
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
  const [foodSearch, setFoodSearch] = React.useState("");
  const [skip, setSkip] = React.useState(true);

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

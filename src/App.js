// Packages
import React from 'react';
import { 
  Autocomplete, Box, Button, Card, Grid, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Stack, Typography 
} from '@mui/material';

import LineChart from './components/charts/LineCharts';
import TwoLevelPieChart from './components/charts/TwoLevelPie';
import CustomShapeBarChart from './components/charts/CustomShapeBar';

// Services
import { useGetExerciseQuery } from './api';

// Styles
import './App.css';

// Constants
const muscles = [
  "Abductors",
  "Abs",
  "Adductors",
  "Biceps",
  "Calves",
  "Chest",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Hip Flexors",
  "IT Band",
  "Lats",
  "Lower Back",
  "Middle Back",
  "Neck",
  "Obliques",
  "Palmar Fascia",
  "Plantar Fascia",
  "Quads",
  "Shoulders",
  "Traps",
  "Triceps",
  "Upper Back"
];

const tryCatchHandler = async (promise, final) => {
  try { 
    const result = await promise();
    return [result, null]; 
  }
  catch (error) { 
    return [null, error]; 
  } 
  finally { 
    final(); 
  }
};

function App() {
  // State / Hooks
  const [state, setState] = React.useState({
    exerciseName: '',
    skip: true,
  });
  const { exerciseName, skip } = state;
  
  // Api
  // const { data, isLoading, isError } = useGetExerciseQuery({ exerciseName }, { skip })

  // console.log("State: ", state, data, isLoading, isError)
  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault()
    // setState({ ...state, skip: false })
    // console.log("handleSubmit: ", state, data, isLoading, isError)
  };

  const handleChange = (e) => {
    setState({ ...state, exerciseName: e.target.value })
  };

  // Effects

  // Render
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2} p={4}>
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
                    <Button variant="text">+</Button>
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
                    <Button variant="text">+</Button>
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

          <Grid item xs={12} sm={12}>
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
                      onChange={handleChange}
                    />
                  </div>
                )}
              />
              <button type="submit">Submit</button>
            </form>
          </Grid>

        </Grid>
      </header>
    </div>
  );
}

export default App;

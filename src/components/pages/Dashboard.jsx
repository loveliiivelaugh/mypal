import React from 'react'
import { 
  Box, Button, Card, Grid, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, IconButton, Stack,
  Typography, Badge, Tooltip
} from '@mui/material';
import HikingIcon from '@mui/icons-material/Hiking';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Add } from '@mui/icons-material';

import LineChart from '../charts/LineCharts';
import TwoLevelPieChart from '../charts/TwoLevelPie';
import CustomShapeBarChart from '../charts/CustomShapeBar';

// Services
import { useHooks } from '../../hooks';


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

export default Dashboard
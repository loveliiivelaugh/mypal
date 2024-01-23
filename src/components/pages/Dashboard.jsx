// Packages
import React from 'react'
import { 
  Avatar, Box, Button, Card, Grid, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, IconButton, 
  Stack, Typography, Badge, Tooltip, Toolbar
} from '@mui/material';
import HikingIcon from '@mui/icons-material/Hiking';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AddIcon from '@mui/icons-material/Add';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

// Components
import Carousel from '../layout/Carousel';

// Services
import { useHooks } from '../../hooks';
import {
  drawerAction,
  discoverItems,
  legendOptions
} from '../../utilities/constants';


const Dashboard = (props) => {
  // Hooks / State
  const hooks = useHooks();
  
  const stepsGoal = 10000; // Move this to a user setting
  const todaysSteps = hooks.steps?.todaysSteps;
  const stepsToGoalRatio = steps => (steps / stepsGoal);

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
      value: hooks?.exercise?.todaysCaloriesBurned,
      icon: <WhatshotIcon/>
    }
  ];

  // Handlers
  const handleProfileClick = () => {
    hooks.actions.closeDrawers();
    hooks.actions.updateDrawers({
      active: "profile",
      anchor: "right",
      open: true,
    });
  };

  // add drawer actions to discoverItems
  discoverItems.forEach((item) => {
    item.action = () => hooks.actions.updateDrawers({
      ...drawerAction,
      active: item.heading.toLowerCase(),
    })
  })
  

  return (
    <>
      {/* Page Header */}
      <Grid item xs={12} sm={12}>
        <Typography variant="h4" component="h4" gutterBottom>
          Today
        </Typography>
      </Grid>

      <Carousel 
        slides={[
          // Header Card -- Main Details
          <Grid item xs={12} sm={12} >
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
                  <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: hooks.food.todaysFood.totalFat, label: 'Fat' },
                            { id: 1, value: hooks.food.todaysFood.totalProtein, label: 'Protein' },
                            { id: 2, value: hooks.food.todaysFood.totalCarbs, label: 'Carbohydrates' },
                          ],
                          arcLabel: (item) => `${item.label} (${item.value} g)`,
                          arcLabelMinAngle: 45,
                          innerRadius: 90,
                          outerRadius: 100,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: 90,
                          endAngle: 450,
                          cx: 150,
                          cy: 150,
                        }
                      ]}
                      slotProps={{
                        legend: legendOptions
                      }}
                      height={340}
                      width={500}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                    >
                      <text x="30%" y="45%" textAnchor="middle" fill="#fff" dominantBaseline="middle">
                        {hooks?.food?.goalCalories}
                        <br />
                        {" "}Calories
                          Remaining
                      </text>
                    </PieChart>
                  </Box>
                    
                </Grid>
                <Grid item xs={12} sm={4} p={4}>
                  <Toolbar />
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
          </Grid>,
          <Card  sx={{ minWidth: 275, p: 2 }}>
            <Grid container spacing={2}>
              {/* <Grid item sm={12}>
                <Typography variant="h5" component="p" gutterBottom>
                  {cms.dashboard.cards.macros.heading}
                </Typography>
                {cms.dashboard.cards.macros.body.map((paragraph, i) => (
                  <Typography key={i} variant="subtitle1" component="p" gutterBottom>
                    {paragraph}
                  </Typography>
                ))}
              </Grid> */}
              <Grid item sm={12} sx={{ display: "flex", gap: 4 }}>
                {console.log(hooks.food.todaysFood)}
                <Typography variant="h5" component="p" gutterBottom>
                  Macronutrients
                </Typography>
                <Tooltip title={`Macronutrients Help`} placement="top">
                  <Badge badgeContent="?" color="primary" onClick={() => {}} sx={{ cursor: "pointer", p: 1 }} />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ minHeight: "300px", width: "100%", p: 2 }}>
                <Typography variant="h5" component="p" gutterBottom>
                  Ratio
                </Typography>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: hooks.food.todaysFood.totalFat, label: 'Fat' },
                        { id: 1, value: hooks.food.todaysFood.totalProtein, label: 'Protein' },
                        { id: 2, value: hooks.food.todaysFood.totalCarbs, label: 'Carbohydrates' },
                      ],
                    },
                  ]}
                  slotProps={{
                    legend: legendOptions
                  }}
                  width={400}
                  height={200}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ minHeight: "300px", width: "100%", p: 2 }}>
                <Typography variant="h5" component="p" gutterBottom>
                  Breakdown
                </Typography>
                <BarChart
                  width={400}
                  height={300}
                  series={
                    hooks.food?.todaysFood?.nutrientTotals
                      .map((nutrient, i) => Number.isInteger(nutrient.value) && ({
                        id: `nutrient-${i}`,
                        data: [nutrient.value],
                        label: nutrient.name
                      })).filter(Boolean)
                  }
                  slotProps={{
                    legend: legendOptions
                  }}
                  // xAxis={[{ data: Object.keys(hooks.food?.todaysFood?.nutrientTotals || {}), scaleType: 'band' }]}
                />
              </Grid>
            </Grid>
          </Card>
        ]}
      />

      <Grid item xs={12} sm={6}>
        {/* Steps Card */}
        <Card sx={{ minWidth: 275, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item sm={12} textAlign="left">
              <Typography variant="h5" component="p" gutterBottom>
                Steps
              </Typography>
              <IconButton sx={{ color: "#fff" }}>
                <HikingIcon /> {` ${todaysSteps}`} 
              </IconButton>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="body1" component="p" gutterBottom>
                Goal: 10,000 steps
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <LinearProgress variant="determinate" value={stepsToGoalRatio(todaysSteps)} />
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
                <AddIcon /> 
              </IconButton>
            </Grid>
            <Grid item sm={12} sx={{ textAlign: "left", display: "flex" }}>
              <IconButton sx={{ color: "#fc0" }}>
                <WhatshotIcon/>
              </IconButton>
              <Typography variant="body1" component="p" gutterBottom>
              {/* TODO: Need to research into how to calculate calories burned per exercise */}
                {hooks?.exercise?.todaysCaloriesBurned} cal
              </Typography>
            </Grid>
            <Grid item sm={12} sx={{ textAlign: "left", display: "flex" }}>
              <IconButton sx={{ color: "#fc0" }}>
                <WatchLaterIcon />
              </IconButton>
              <Typography variant="body1" component="p" gutterBottom>
              {/* TODO: Need to addIcon a function that will calculate total time of daily exercise */}
                00:00 hr
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Carousel 
        slides={[
          <Grid item xs={12}>
            <Card sx={{ minWidth: 275, p: 2, minHeight: "400px", height: 'auto', width: "100%", maxHeight: "440px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack>
                  <Typography variant="h5" component="p" gutterBottom>
                    Weight
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Last 90 days
                  </Typography>
                </Stack>
                <IconButton 
                  onClick={() => hooks.actions.updateDrawers({ 
                    active: "weight", 
                    anchor: "bottom", 
                    open: true
                  })} 
                  sx={{ color: "#fff" }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={500}
                height={300}
              />
            </Card>
          </Grid>,
          <Grid item xs={12}>
            <Card sx={{ minWidth: 275, p: 2, minHeight: "400px", height: 'auto', width: "100%", maxHeight: "440px" }}>
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
              {console.log("steps", hooks.steps?.data)}
              <BarChart
                width={500}
                height={300}
                series={
                  hooks.steps?.data
                    .map((step, i) => Number.isInteger(step.value) && ({
                      id: `step-${i}`,
                      data: [step.value],
                      label: step.startDate
                    })).filter(Boolean)
                }
                xAxis={[{ data: hooks.steps?.data.map(step => step.startDate), scaleType: 'band' }]}
              />
            </Card>
          </Grid>
        ]}
      />

      {/* Discover Section featuring 6 cards as links to different resources */}
      <Grid item xs={12} sm={12}>
        <Card sx={{ p: 2 }}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item sm={12} textAlign="left">
              <Typography variant="h5" component="p" gutterBottom>
                Discover
              </Typography>
            </Grid>
            {discoverItems.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center"  }}>
                <Card sx={{ p: 2, width: '100%', textAlign: "center" }}>
                  <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around", py: 1 }}>
                    <Avatar sx={{ background: "rgba(80, 170, 255, 0.8)" }}>
                      <IconButton sx={{ color: "#fff" }} onClick={item.action}>
                        {item.icon}
                      </IconButton>
                    </Avatar>
                  </Box>
                  <Typography variant="h5" component="p" gutterBottom>
                    {item.heading}
                  </Typography> 
                  <Typography variant="body1" component="p" gutterBottom color="secondary" sx={{ color: "#bbb" }}>
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>

    </>
  )
};

export default Dashboard
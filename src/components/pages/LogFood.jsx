import { useState } from 'react'
import { 
  AppBar, Box, Button, Card, Grid, Drawer,
  List, ListItem, ListItemText, ListItemButton, IconButton,
  Stack, TextField, Typography, Toolbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Services
import { useHooks } from '../../hooks';
import { cap_first } from '../../utilities/helpers';
import { DateToggler } from '../forms';


const LogFood = (props) => {
  // State / Hooks
  const hooks = useHooks();

  // Constants
  const caloriesRemaining = [
    { heading: "Base Goal", value: hooks?.profile?.current_profile?.tdee, },
    { heading: "Food", value: hooks?.food?.todaysCaloriesConsumed },
    { heading: "Exercise", value: hooks?.exercise?.todaysCaloriesBurned },
    { heading: "Remaining", value: hooks?.food?.goalCalories },
  ];
  const operators = ["-", "+", "="];

  const handleAddClick = (card) => {
    hooks.actions.closeDrawers();
    hooks.actions.updateDrawers({
      active: (card.toLowerCase().includes("exercise")) ? "exercise" : "food",
      anchor: "bottom",
      open: true,
      title: `Add ${cap_first(card)}`,
    });
  }

  // Render
  return (
    <>
      <Button variant="contained" onClick={() => props.setTab(0)}>Go Back</Button>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          Edit
        </IconButton>
        <DateToggler />
        <IconButton color="inherit">Save</IconButton>
      </Toolbar>
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
                        {item.value}
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
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Exercise', 'Water'].map((card) => (
          <Card sx={{ width: '100%', p: 2, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} textAlign="left">
                <Typography variant="body1" component="p" gutterBottom>
                  {card}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => handleAddClick(card)}>Add {cap_first(card)}</Button>
                <Button>...</Button>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
    </>
  )
};


export default LogFood
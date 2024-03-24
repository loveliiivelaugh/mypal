import React from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const NewsFeed = () => {
  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h2" component="p">
          Nutrition Plans
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Stack direction="row" spacing={6} pl={8}>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            .map((day, i) => (
              <Typography key={i} variant="body1" component="p">
                {day}
              </Typography>
          ))}
        </Stack>
      </Grid>
      {
        ["Breakfast", "Lunch", "Dinner", "Snack"].map((meal, i) => (
          <Grid item xs={12} sm={12} key={i}>
            <Typography variant="body1" component="p">
              {meal}
            </Typography>
          </Grid>
        ))
      }
      <Grid item xs={12} sm={12}>
        <Typography variant="h2" component="p">
          Workout Plans
        </Typography>
        <DateCalendar />
      </Grid>
    </Grid>
  )
};

export default NewsFeed
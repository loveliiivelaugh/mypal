// Packages
import { useState } from 'react'
import {
  Autocomplete, Box, Button, Grid,
  InputAdornment, IconButton, Typography,
  Chip, TextField, Tab, Tabs, Stack,
  List, ListItem, ListItemText, 
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// Hooks
import { useHooks } from '../../hooks';

// Utilities
import { exerciseHistory, mock_exercises, tabs } from '../../utilities/constants'
import { cap_first } from '../../utilities/helpers'


const BottomExerciseDrawer = (props) => {
  const hooks = useHooks();
  const [state] = useState({});
  const handleChange = (event) => props.form[event.target.id] = event.target.value;

  const handleSelectedExercise = (exercise) => {
    hooks.actions.handleSelected(exercise);
    hooks.actions.closeDrawers();
    hooks.actions.updateDrawers({
      active: "exercise",
      anchor: "right",
      open: true,
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2, py: 2 }}>
        <IconButton sx={{ color: "#fff"}} onClick={hooks.actions.closeDrawers}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="p" gutterBottom>
          {`Add ${cap_first(hooks.drawers.active)}`}
        </Typography>
        <IconButton sx={{ color: "#fff"}} type="submit">
          <CheckIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
        <Autocomplete
          id="exerciseName"
          options={mock_exercises || []}
          fullWidth
          onLoadedData={() => {}}
          loading={hooks?.exercise?.isLoading}
          sx={{ ml: 4 }}
          getOptionLabel={(option) => {
            console.log("getOptionLabel: ", option, option?.name)
            return option?.name
          }}
          renderOption={(props, option) => {
            console.log("renderOption: ", props, option)
            // return option
            return (
              <Stack direction="row" spacing={1} p={1} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(33,33,33,0.1)"} }} onClick={() => handleSelectedExercise(option)}>
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
                      <IconButton p={1} onClick={() => {}} sx={{ color: "#fff" }}>
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
            {hooks.exercise.data.map(exercise => (
              <ListItem key={`${exercise.id}`}>
                <ListItemText primary={exercise.name} secondary={exerciseHistory.formatSetsArrayToString([exercise.sets, exercise.reps, exercise.weight])} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={12} sx={{ p: 2}}>
          <Button variant="outlined" fullWidth onClick={() => {}} sx={{ color: "#fff" }}>
            Create a New Exercise
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default BottomExerciseDrawer
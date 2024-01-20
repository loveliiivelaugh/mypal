// Packages
import { useState } from 'react'
import {
  Autocomplete, Box, Button, Grid,
  InputAdornment, IconButton, Typography,
  Chip, TextField, Tab, Tabs, Stack,
  Link, List, ListItem, ListItemText, ListItemButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Hooks / Services
import { useHooks } from '../../hooks';
import { useGetExerciseQuery, getMuscleGroupImage } from '../../api';

// Utilities
import { exerciseHistory, tabs } from '../../utilities/constants'
import { cap_first } from '../../utilities/helpers'


const BottomExerciseDrawer = (props) => {
  const hooks = useHooks();
  const [state, setState] = useState({
    exerciseName: "",
    skip: true,
  });
  const { 
    data, 
    isLoading, 
    isError 
  } = useGetExerciseQuery(state.exerciseName, { skip: state.skip })
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const handleSelectedExercise = async (exercise) => {
    // const muscleGroupImage = await getMuscleGroupImage(exercise?.muscle);
    console.log(
      "handleSelectedExercise().muscleGroupImage: ", 
      exercise, 
      // muscleGroupImage
    );
    hooks.actions.handleSelected(exercise);
    hooks.actions.closeDrawers();
    hooks.actions.updateDrawers({
      active: "exercise",
      anchor: "right",
      open: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, skip: false })
    // submit the search request and populate the autocomplete
  };

  if (isError) return hooks.actions.createAlert("error", "Error fetching exercises");

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
      <Box px={4} py={2}>
        <Typography>
          Exercise Data Sourced from
        </Typography>
        <Link variant="text" color="#fff" href="https://www.api-ninjas.com/api/exercises" target="_blank">
          API Ninjas Exercise API
        </Link>
        <Typography>
          The Exercises API provides access to a comprehensive list of thousands of exercises targeting every major muscle group.
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
        <Autocomplete
          id="exerciseName"
          options={data || []}
          fullWidth
          onLoadedData={data}
          loading={isLoading}
          autoComplete
          sx={{ ml: 4 }}
          getOptionLabel={(option) => option?.name}
          renderOption={(props, option) => {
            return (
              <Stack 
                direction="row" 
                spacing={1}
                p={1} 
                sx={{ 
                  cursor: "pointer", 
                  "&:hover": { backgroundColor: "rgba(33,33,33,0.1)" } 
                }} 
                onClick={() => handleSelectedExercise(option)}
              >
                <Typography variant="body1" p={0.5}>{option?.name}</Typography>
                <Chip variant="outlined" size="small" label={option?.type} />
                <Chip size="small" label={option?.muscle} />
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
                      <IconButton  p={1} onClick={() => {}} sx={{ color: "#fff" }}>
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
            {tabs.map(tab => <Tab key={`${tab}_tab`} label={tab} value={tab} />)}
          </Tabs>
        </Grid>
        
        <Grid item xs={12} sm={12} sx={{ p: 2}}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">History</Typography>
            <Chip component={Button} variant="outlined" label="Most Recent" />
          </Box>
          <List id="exercise-history-list">
            {hooks.exercise.data.map(exercise => (
              <ListItem key={`${exercise.id}`} component={ListItemButton} onClick={() => handleSelectedExercise(exercise)}>
                <ListItemText primary={exercise.name} secondary={exerciseHistory.formatSetsArrayToString([exercise.sets, exercise.reps, exercise.weight])} />
                <Box>
                  <IconButton onClick={() => handleSelectedExercise(exercise)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => hooks.dbApi.delete("exercise", exercise.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={12} sx={{ p: 2}}>
          <Button variant="outlined" fullWidth onClick={() => hooks.actions.updateDrawers({ active: 'exercise', anchor: 'right', open: true })} sx={{ color: "#fff" }}>
            Create a New Exercise
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default BottomExerciseDrawer
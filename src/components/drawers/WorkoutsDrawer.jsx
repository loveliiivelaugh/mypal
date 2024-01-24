import { useState } from 'react';
import { Box, Button, Container, Paper, Typography, Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Loader } from '../layout';
import { DrawerHeader } from '../../hooks/useForms';

import { useGetExercisesQuery } from '../../api';
import { cap_first } from '../../utilities/helpers';


const workout_mock = {
    "bodyPart": "back",
    "equipment": "cable",
    "gifUrl": "https://v2.exercisedb.io/image/ot-caT96JCnb6D",
    "id": "0007",
    "name": "alternate lateral pulldown",
    "target": "lats",
    "secondaryMuscles": [
        "biceps",
        "rhomboids"
    ],
    "instructions": [
        "Sit on the cable machine with your back straight and feet flat on the ground.",
        "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
        "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
        "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
        "Repeat for the desired number of repetitions."
    ]
}

function ExerciseSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleGroups, setMuscleGroups] = useState("back");
  const exercisedb = useGetExercisesQuery(muscleGroups, { skip: !muscleGroups });
  console.log("exercisedb: ", exercisedb)

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // // Call an API to retrieve exercises based on the search term
    // fetchExercises(searchTerm).then((data) => {
    //   setExercises(data);
    // });
  };

  return (
    <Container maxWidth="lg">
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
            Exercise Search
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                <TextField
                    id="search-term"
                    label="Search Term"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'right' }}>
                    <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={handleSubmit}
                    >
                    Search
                    </Button>
                </Box>
                </Grid>
            </Grid>
            </form>
        </Box>
        <Grid container sx={{ mt: 2 }} spacing={2}>
            {exercisedb.isLoading ? <Loader /> : exercisedb.data.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </Grid>
    </Container>
  );
}

function ExerciseCard({ exercise }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={3}>
        <img src={exercise.gifUrl} alt={exercise.name} style={{ maxWidth: '100%' }} />
        <Box p={4}>
          <Typography variant="h5" component="h2">
            {(exercise.name).split(" ").map(cap_first).join(" ")}
          </Typography>
          {/* {exercise.instructions.map((instruction, index) => (
            <Typography key={index} variant="body1">
              {instruction}
            </Typography>
          ))} */}
        </Box>
        <Box p={2} sx={{display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
          <Button variant="outlined" color="secondary">
            Add to Routine
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ExerciseSearchPage;
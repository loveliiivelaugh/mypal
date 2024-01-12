
import React from 'react'
import { Button, InputLabel, TextField, List, ListItem } from '@mui/material'
import BasicDatePicker from '../BasicDatePicker';


const RightExerciseDrawer = () => {
  const [state, setState] = React.useState();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  return (
    <List>
      <ListItem sx={{ justifyContent: "space-between" }} primary={state?.exerciseSelected?.name}/>
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
        <BasicDatePicker id="date" label="Date" value={""} handleChange={handleChange} placeholder={new Date().toLocaleString()} /> 
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <Button variant="outlined" fullWidth type="submit">Add Exercise</Button>
      </ListItem>
    </List>
  )
}

export default RightExerciseDrawer
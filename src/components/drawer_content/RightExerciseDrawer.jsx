
import { useState } from 'react'
import { InputLabel, TextField, List, ListItem, ListItemText } from '@mui/material'
import BasicDatePicker from '../BasicDatePicker';


const RightExerciseDrawer = (props) => {
  const [state] = useState();
  const handleChange = (event) => props.form[event.target.id] = event.target.value;

  return (
    <List>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <ListItemText  primary={props?.selected?.name}/>
      </ListItem>
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
        <InputLabel>Weight</InputLabel>
        <TextField
          id="weight"
          type="number"
          value={state?.weight}
          onChange={handleChange}
          placeholder={100}
        />
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <InputLabel>Calories Burned</InputLabel>
        <TextField
          id="calories_burned"
          type="number"
          value={state?.calories_burned}
          onChange={handleChange}
          placeholder={150}
        />
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <InputLabel>Date</InputLabel>
        <BasicDatePicker id="date" label="Date" value={""} handleChange={handleChange} placeholder={new Date().toLocaleDateString()} /> 
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <InputLabel>Time</InputLabel>
        <BasicDatePicker id="time" label="Time" value={""} handleChange={handleChange} placeholder={new Date().toLocaleTimeString()} /> 
      </ListItem>
    </List>
  )
}

export default RightExerciseDrawer
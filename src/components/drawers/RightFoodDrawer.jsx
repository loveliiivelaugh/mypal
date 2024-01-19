import { useState } from 'react'
import {
  InputLabel, TextField, Select, MenuItem,Stack,
  List, ListItem, ListItemText, 
} from '@mui/material'

const RightFoodDrawer = props => {
  const [state] = useState({});
  const handleChange = (event) => 
    props.form[event.target.id] = event.target.value;

  let name = props?.selected?.name
    ? props?.selected?.name
    : props?.selected?.display_name_translations?.["en" || "it"];

  return (
    <List>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <ListItemText 
          primary={name} 
          secondary={name}
        />
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <InputLabel>Serving Size</InputLabel>
        <TextField id="serving_size" type="text" value={state?.serving_size} onChange={handleChange} placeholder="4oz" />
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <InputLabel>Number of Servings</InputLabel>
        <TextField id="num_servings" type="number" value={state?.num_servings} onChange={handleChange} placeholder={1} />
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <InputLabel>Time</InputLabel>
        <TextField id="serving_time" type="time" value={state?.serving_time} onChange={handleChange} placeholder={new Date().toLocaleString()} />
      </ListItem>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <InputLabel>Meal</InputLabel>
        <Select id="meal" type="text" value={state?.meal || "Breakfast"} onChange={handleChange} placeholder="Select a Meal">
          <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
          <MenuItem value={"Lunch"}>Lunch</MenuItem>
          <MenuItem value={"Dinner"}>Dinner</MenuItem>
          <MenuItem value={"Snack"}>Snack</MenuItem>
        </Select>
      </ListItem>
      <ListItem>
        <Stack variant="row">

        </Stack>
      </ListItem>
    </List>
  )
}

RightFoodDrawer.propTypes = {}

export default RightFoodDrawer
// Packages
import React, { useState } from 'react'
import { 
  Box, Drawer, IconButton, Typography, TextField
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AttachmentIcon from '@mui/icons-material/Attachment';

// Components
import FoodDrawerContent from './FoodDrawer'
import RightFoodDrawer from './RightFoodDrawer';
import RightExerciseDrawer from './drawer_content/RightExerciseDrawer';
import TdeeCalculator from './forms/TdeeCalculator';
import BasicDatePicker from './BasicDatePicker';

// Hooks
import { useHooks } from '../hooks';

// Utilities
import { cap_first } from '../utilities/helpers'
import BottomExerciseDrawer from './drawer_content/BottomExerciseDrawer';

export const BottomWeightDrawer = (props) => {

  const handleChange = (event) => {
    if (event?.target) props.form[event.target.id] = event.target.value;
    // if input type is date field
    // if (event?.date) props.form[event.target.id]
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex" }}>
        <TextField
          id="weight"
          label="Weight"
          variant="outlined"
          type="float"
          fullWidth
          onChange={handleChange}
          InputProps={{ inputProps: { min: 0, max: 1000 } }}

        />
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <BasicDatePicker id="date" label="Date" value={""} handleChange={handleChange} /> 
      </Box>
      <Box sx={{ width: "100%", display: "flex", border: "1px solid rgba(33,33,33,0.2)", borderRadius: 1, justifyContent: "space-between", my: 1, py: 1 }}>
        <Typography id="demo-simple-select-label" variant="body1">Progress Photo</Typography>
        <IconButton p={1}>
          <AttachmentIcon />
        </IconButton>
      </Box>
    </>
  )
}


const Drawers = (props) => {
  // State / Hooks
  const { actions, drawers } = useHooks();
  const [form] = useState({});
  // Destructure
  const { active, anchor, open } = drawers;

  // Handlers
  const handleClose = () => actions.closeDrawers();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleForm(form)
  };
  
  // render content based on active drawer
  const content = {
    "weight": {
      bottom: (<BottomWeightDrawer />),
      right: (<></>),
    },
    "exercise": {
      bottom: (<BottomExerciseDrawer handleSelected={props.handleSelected} />),
      right: (<RightExerciseDrawer form={form} selected={props.selected} />),
    },
    "food": {
      bottom: (<FoodDrawerContent handleSelected={props.handleSelected} />),
      right: (<RightFoodDrawer form={form} selected={props.selected} />)
    },
    "profile": {
      bottom: (<>profile bottom</>),
      right: (<TdeeCalculator />),
    }
  }
  
  // console.log("inside Drawers: ", props, drawers);
  // render
  return (
    <Drawer
        anchor={anchor}
        open={open}
        onClose={handleClose}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', height: '100%', overflow: 'auto' }}>

          {/* Drawer Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 2, py: 2 }}>
            <IconButton sx={{ color: "#fff"}} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="p" gutterBottom>
              {`Add ${cap_first(active)}`}
            </Typography>
            <IconButton sx={{ color: "#fff"}} type="submit">
              <CheckIcon />
            </IconButton>
          </Box>
            
          {(active && anchor) && content[active][anchor]}

        </Box>
      </Drawer>
  )
}

export default Drawers
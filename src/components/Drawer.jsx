// Packages
import { 
  Box, Drawer, IconButton, Typography, TextField
} from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

// Components
import FoodDrawerContent from './FoodDrawer'
import { FormContainer } from '../hooks/useForms';
import TdeeCalculator from './forms/TdeeCalculator';
import AuthForm from './forms/AuthForm';
import BasicDatePicker from './BasicDatePicker';
import BottomExerciseDrawer from './drawers/BottomExerciseDrawer';

// Hooks
import { useHooks } from '../hooks';

// Utilities
import {
  exercise_schema,
  food_schema,
  weight_schema,
  profile_schema,
} from '../db/schemas';


export const BottomWeightDrawer = (props) => {

  const handleChange = (event) => {
    if (event?.target) props.form[event.target.id] = event.target.value;
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
          <attachment />
        </IconButton>
      </Box>
    </>
  )
}


const Drawers = (props) => {
  // State / Hooks
  const { actions, drawers } = useHooks();
  const { active, anchor, open } = drawers;
  
  // render content based on active drawer
  const content = {
    weight: {
      bottom: (<BottomWeightDrawer />),
      right: (<>bottom weight</>),
    },
    exercise: {
      bottom: (<BottomExerciseDrawer handleSelected={actions.handleSelected} />),
      right: (<FormContainer schema={exercise_schema} />),
    },
    food: {
      bottom: (<FoodDrawerContent handleSelected={actions.handleSelected} />),
      right: (<FormContainer schema={food_schema} />)
    },
    profile: {
      bottom: (<>profile bottom</>),
      right: (<TdeeCalculator />),
    },
    auth: {
      bottom: (<>auth bottom</>),
      right: (<AuthForm />),
    }
  };
  
  // render
  return (
    <Drawer
        anchor={anchor}
        open={open}
        onClose={() => actions.closeDrawers()}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
      >
        {(active && anchor) && content[active][anchor]}
      </Drawer>
  )
}

export default Drawers
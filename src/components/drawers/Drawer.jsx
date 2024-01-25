// Packages
import { Box, SwipeableDrawer, TextField } from '@mui/material'
import { motion } from 'framer-motion'
// Components
import { FormContainer } from '../../hooks/useForms';
import { AuthForm, TdeeCalculator } from '../forms';
import { 
  BottomExerciseDrawer, 
  FoodDrawer, 
  InstallDrawer, 
  RecipesDrawer, 
  SleepDrawer, 
  WorkoutsDrawer,
  AiChatDrawer
} from '.';

// Hooks
import { useHooks } from '../../hooks';

// Utilities
import {
  exercise_schema,
  food_schema,
  profile_schema,
  weight_schema,
} from '../../db/schemas';


const Drawers = () => {
  // State / Hooks
  const { actions, drawers } = useHooks();
  const { active, anchor, open } = drawers;
  
  console.log("drawers: ");
  // render content based on active drawer
  const content = {
    weight: {
      bottom: (<FormContainer schema={weight_schema} />),
    },
    exercise: {
      bottom: (<BottomExerciseDrawer handleSelected={actions.handleSelected} />),
      right: (<FormContainer schema={exercise_schema} />),
    },
    food: {
      bottom: (<FoodDrawer handleSelected={actions.handleSelected} includeNutritionixAttribution={true} />),
      right: (<FormContainer schema={food_schema} />)
    },
    profile: {
      right: (<TdeeCalculator />),
      top: (<FormContainer schema={profile_schema} />),
    },
    auth: {
      right: (<AuthForm />),
    },
    install: {
      bottom: (<InstallDrawer />),
    },
    sleep: {
      right: (<SleepDrawer />),
    },
    recipes: {
      right: (<RecipesDrawer />),
      // bottom: (<SingleRecipeDrawer />),
    },
    workouts: {
      right: (<WorkoutsDrawer />),
      // bottom: (<SingleWorkoutDrawer />),
    },
    ai: {
      bottom: (<AiChatDrawer />),
    }
  };
  
  // render
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={actions.closeDrawers}
      component={motion.div}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
      }}
    >
      {(active && anchor) && content[active][anchor]}
    </SwipeableDrawer>
  )
}

export default Drawers
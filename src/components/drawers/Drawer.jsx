// Packages
import { Drawer } from '@mui/material'
import { motion } from 'framer-motion'

// Components
import { FormContainer } from '../../hooks/useForms';
import { AuthForm, TdeeCalculator } from '../forms';
import { BottomExerciseDrawer, FoodDrawer } from '.'

// Hooks
import { useHooks } from '../../hooks';

// Utilities
import {
  exercise_schema,
  food_schema,
  weight_schema,
  // profile_schema,
} from '../../db/schemas';


const Drawers = () => {
  // State / Hooks
  const { actions, drawers } = useHooks();
  const { active, anchor, open } = drawers;
  
  // render content based on active drawer
  const content = {
    weight: {
      bottom: (<FormContainer schema={weight_schema} />),
      right: (<>bottom weight</>),
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
      </Drawer>
  )
}

export default Drawers
// Packages
import { SwipeableDrawer } from '@mui/material'
import { motion } from 'framer-motion'

import { PieChart } from '@mui/x-charts';
import { Typography } from '@mui/material';

// Components
import { DrawerHeader, FormContainer } from '../../hooks/useForms';
import { AuthForm, TdeeCalculator } from '../forms';
import { BottomExerciseDrawer, FoodDrawer, InstallDrawer, RecipesDrawer } from '.';
import { DateToggler } from '../forms/DateToggler';

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
  const { actions, drawers, food, sleep } = useHooks();
  const { active, anchor, open } = drawers;
  
  // render content based on active drawer
  const content = {
    weight: {
      bottom: (<FormContainer schema={weight_schema} />),
      // right: (<>bottom weight</>),
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
      // bottom: (<>profile bottom</>),
      right: (<TdeeCalculator />),
      top: (<FormContainer schema={profile_schema} />),
    },
    auth: {
      // bottom: (<>auth bottom</>),
      right: (<AuthForm />),
    },
    install: {
      bottom: (<InstallDrawer />),
      // right: (<>install right</>),
    },
    sleep: {
      right: (
        <>
          <DrawerHeader />
          <DateToggler />
          {/* {console.log("sleep:", sleep.data)} */}
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: food.todaysFood.totalFat, label: 'Awake' },
                  { id: 1, value: food.todaysFood.totalProtein, label: 'REM' },
                  { id: 2, value: food.todaysFood.totalCarbs, label: 'Core' },
                  { id: 3, value: food.todaysFood.totalCarbs, label: 'Deep' },
                ],
                innerRadius: 90,
                outerRadius: 120,
              },
            ]}
            height={340}
            width={500}
          />
          <Typography>
            Sleep Data provided by bio peripherals via Apple Shortcuts. Learn more about it on our blog. Or visit our website.
          </Typography>
        </>
      )
    },
    recipes: {
      right: (<RecipesDrawer />),
    },
    workouts: {
      right: (
        <>
          <DrawerHeader />
          Workouts Drawer
        </>
      )
    }
  };
  
  // render
  return (
    <SwipeableDrawer
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
    </SwipeableDrawer>
  )
}

export default Drawers
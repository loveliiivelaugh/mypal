// Packages
import { SwipeableDrawer } from '@mui/material'
import { motion } from 'framer-motion'

import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

// Components
import { DrawerHeader, FormContainer } from '../../hooks/useForms';
import { AuthForm, TdeeCalculator } from '../forms';
import { BottomExerciseDrawer, FoodDrawer, InstallDrawer, RecipesDrawer } from '.';
import { DateToggler } from '../forms/DateToggler';

// Hooks
import { useHooks } from '../../hooks';

// Utilities
import { legendOptions } from '../../utilities/constants';
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
        <Box sx={{ width: "100%", height: "100vh", justifyContent: "center" }}>
          <DrawerHeader />
          <DateToggler />
          {/* {console.log("sleep:", sleep.data)} */}
          <Box sx={{ width: "100%", height: 600, justifyContent: "space-around", p: 4, mb: 4 }}>
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
              // height={340}
              // width={500}
              slotProps={{
                legend: legendOptions
              }}
            />
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, mt: 2 }}>
            <Typography variant="body1" component="p" px={2}>
              Sleep Data provided by bio peripherals via Apple Shortcuts.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom px={2}>
              Learn more about it on our blog. Or visit our website.
            </Typography>
          </Box>
        </Box>
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
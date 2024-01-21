// Packages
import { Drawer } from '@mui/material'
import { motion } from 'framer-motion'
import { Button, Box, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

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
import { useEffect } from 'react';


const Install = () => {

  // Install Prompt
  let {installPrompt} = window;
  
  // window.addEventListener("beforeinstallprompt", async (event) => {
  //   event.preventDefault();

  //   const relatedApps = await navigator.getInstalledRelatedApps();

  //   // Search for a specific installed platform-specific app
  //   const psApp = relatedApps.find((app) => app.id === "com.example.myapp");

  //   console.log("Platform-specific app installed:", psApp, event);
  //   installPrompt = event;
  //   installButton.removeAttribute("hidden");
  // });

  // installButton.addEventListener("click", async () => {
  //   if (!installPrompt) {
  //     return;
  //   }
  //   const result = await installPrompt.prompt();
  //   console.log(`Install prompt was: ${result.outcome}`);
  //   disableInAppInstallPrompt();
  // });
  
  // function disableInAppInstallPrompt() {
  //   installPrompt = null;
  //   installButton.setAttribute("hidden", "");
  // }

  // window.addEventListener("appinstalled", () => {
  //   disableInAppInstallPrompt();
  // });

  useEffect(() => {
    const installButton = document.querySelector("#install");
    console.log("Install component: ", installButton)
    if (installButton) {
      console.log("Install button: ", installButton, window)
      installButton.addEventListener("click", async () => {
        if (!installPrompt) {
          console.log("No install prompt")
          return;
        }
        const result = await window.installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        // disableInAppInstallPrompt();
      });
    }
  }, [installPrompt])
  
  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h3">Install Open Fitness</Typography>
      <Typography>
        Install this app on your home screen for quick and easy access when you're on the go.
      </Typography>
      <Typography>
        Just tap <strong>Share</strong> then <strong>Add to Home Screen</strong>.
      </Typography>
      <Button id="install" sx={{ color: "#fff" }}>
        Install <DownloadIcon />
      </Button>
    </Box>
  )
}


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
    },
    install: {
      bottom: (<Install />),
      right: (<>install right</>),
    },
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
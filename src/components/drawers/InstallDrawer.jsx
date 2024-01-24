import { useEffect, useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';


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

export default Install;
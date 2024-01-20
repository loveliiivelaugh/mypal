import React from 'react';
import { IconButton, Typography, Container, Grid, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';


const LandingPage = ({ setLandingPage }) => {

  // Define a variable to store the beforeinstallprompt event
let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior of the event
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Optionally, display a custom install button or UI to indicate that the app can be installed
  // For simplicity, we'll assume you have a button with the id "installButton"
  const installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', handleInstallButtonClick);
  }
});

// Function to handle the custom install button click
const handleInstallButtonClick = () => {
  // Check if a deferredPrompt is available
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // The user accepted the prompt
        console.log('User accepted the install prompt');
      } else {
        // The user dismissed the prompt
        console.log('User dismissed the install prompt');
      }

      // Clear the deferredPrompt variable
      deferredPrompt = null;
    });

    // Hide the custom install button or UI
    const installButton = document.getElementById('installButton');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }
};

// Function to check if the app is already installed
const isAppInstalled = () => {
  // You can add your own logic here to check whether the PWA is already installed
  // For simplicity, we'll return a boolean value indicating installation status
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
};


  const handleInstallClick = () => {
    // Logic to prompt user to install PWA
    // This can be implemented using the beforeinstallprompt event
    // For simplicity, we assume the function showInstallPrompt() is defined elsewhere
    // showInstallPrompt();
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={12} sx={{ minHeight: '30vh', background: "rgba(80, 170, 255, 0.8)", width: "100vw" }}>
        {/* Image or Video Section */}
        {/* <img src="fitness-app-image.jpg" alt="Fitness App" style={{ width: '100%' }} /> */}
      </Grid>
      <Grid item xs={12} md={12} textAlign="center">
        <Container maxWidth="sm">
          {/* Text and CTA Section */}
          <Typography variant="h1" gutterBottom>
            Open Fitness
          </Typography>
          <Typography variant="h3" gutterBottom>
            Your Fitness Journey Starts Here
          </Typography>
          <Typography variant="body1" paragraph>
            Experience a new way to track your fitness goals and stay healthy.
          </Typography>
          <Typography variant="body1" paragraph>
            Open Fitness is a progressive web app (PWA) that can be installed on your device and be used offline. It is built using web technologies and is open source to allow for users to take advantage of it's features while still maintaining control over personal data. 
          </Typography>
          <Typography variant="body1" paragraph>
            Learn more about the project on GitHub. {" "}
              <Link href="" target="_blank" rel="noopener" sx={{ color: "#fff" }}>
                Open Fitness on GitHub
              </Link>
          </Typography>
          <IconButton variant="contained" color="primary" onClick={handleInstallClick} sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
            Install Now <DownloadIcon />
          </IconButton>
          <IconButton variant="contained" color="primary" onClick={() => setLandingPage(false)} sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
            Continue to App
          </IconButton>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LandingPage;

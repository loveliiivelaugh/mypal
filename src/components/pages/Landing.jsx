import React from 'react';
import { IconButton, Typography, Container, Grid, Link, Toolbar } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useHooks } from '../../hooks';
import { cms } from '../../utilities/cms';
import { AuthForm } from '../forms';

const LandingPage = ({ setLandingPage }) => {
  const hooks = useHooks();


  const handleInstallClick = () => {
    console.log("install clicked", true);
    hooks.actions.updateDrawers({
      active: "install",
      anchor: "bottom",
      open: true
    });
  };

  const handleLoginClick = () => {
    console.log("login clicked", true);
    hooks.actions.updateDrawers({
      active: "auth",
      anchor: "right",
      open: true
    });
    // Need a way to pass this callback to the authenticated event
    // () => setLandingPage(false)
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {/* <AuthForm /> */}
      <Grid item xs={12} md={12} sx={{ minHeight: '20vh', background: "rgba(80, 170, 255, 0.8)", width: "100vw" }}>
        {/* Image or Video Section */}
        {/* <img src="fitness-app-image.jpg" alt="Fitness App" style={{ width: '100%' }} /> */}
      </Grid>
      <Grid item xs={12} md={12} textAlign="center">
        <Container maxWidth="sm">
          {/* Text and CTA Section */}
          <Typography variant="h1" gutterBottom>
            {cms.landing.heading}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {cms.landing.subheading}
          </Typography>
          {cms.landing.body.map((paragraph, index) => (
            <Typography variant="body1" paragraph key={index}>
              {paragraph}
            </Typography>
          ))}
          <Typography variant="body1" paragraph>
            Learn more about the project on GitHub. {" "}
              <Link href="" target="_blank" rel="noopener" sx={{ color: "#fff" }}>
                {cms.landing.cta5}
              </Link>
          </Typography>
          <IconButton variant="contained" color="primary" onClick={handleInstallClick} sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
            {cms.landing.cta4} <DownloadIcon />
          </IconButton>
          <IconButton variant="contained" color="primary" onClick={handleLoginClick} sx={{ color: "#fff", "&:hover": { color: "#ccc" } }}>
          {cms.landing.cta3}
          </IconButton>
        </Container>
      </Grid>
      <Toolbar />
    </Grid>
  );
};

export default LandingPage;

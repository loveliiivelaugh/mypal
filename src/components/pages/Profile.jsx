import React from 'react'
import { Container, Divider, Grid, Toolbar, Typography } from '@mui/material';
import { cms } from '../../utilities/cms';

const Profile = () => {
  return (
    <Grid container sx={{ minHeight: "100vh", width: "100vw" }}>

      <Grid item xs={12} sm={12} sx={{ mb: 8 }}>
        <Container maxWidth="sm" align="left" >
          <Typography variant="h2" component="p">
            {cms.dashboard.cards.macros.heading}
          </Typography>
          <Typography variant="h4" component="p" gutterBottom>
            {cms.dashboard.cards.macros.subheading}
          </Typography>
          {cms.dashboard.cards.macros.body.map((paragraph, i) => (
            <Typography key={i} variant="body1" component="p" gutterBottom>
              {paragraph}
            </Typography>
          ))}
        </Container>
      </Grid>
      
    </Grid>
  )
};

export default Profile
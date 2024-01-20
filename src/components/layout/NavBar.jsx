import React from 'react'
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../../assets/openfitness_logo.png'
import Login from '../forms/Login'


const NavBar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Avatar alt="A" src={logo} sx={{ background: "rgba(80, 170, 255, 0.8)", p: 0.5 }} />
          <Typography variant="h5" component="h5" pt={1}>
            {props.heading}
          </Typography>
        </Box>
        <Box sx={{ display: "flex"}}>
          <Login />
          <Tooltip title="Notifications">
            <IconButton sx={{ color: "#fff" }}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
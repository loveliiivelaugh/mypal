import React from 'react'
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import Login from '../Login'
import NotificationsIcon from '@mui/icons-material/Notifications';

const NavBar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Avatar alt="A" src="/static/images/avatar/1.jpg" />
          <Typography variant="h5" component="h5" pt={1}>
            {props.heading}
          </Typography>
        </Box>
        <Box sx={{ display: "flex"}}>
          <IconButton>
            <Login />
          </IconButton>
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
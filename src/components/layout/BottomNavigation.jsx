// Packages
import { useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box, BottomNavigation, BottomNavigationAction, Grid, 
  IconButton, InputAdornment, TextField, Autocomplete, Button, List
} from '@mui/material';
import { 
  Avatar, ListItem, ListItemIcon, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import MenuIcon from '@mui/icons-material/Menu';

// Services
import { useHooks } from '../../hooks';


const themeColors = [
  'rgba(80, 170, 255, 1)',
  'rgba(255, 130, 170, 1)',
  'rgba(255, 255, 170, 1)',
  'rgba(170, 255, 130, 1)',
  'rgba(170, 255, 255, 1)',
  'rgba(170, 130, 255, 1)',
]

const items = {
  "Dashboard": <RestoreIcon />, 
  "Log Weight": <FavoriteIcon />,
  "Plans": <RestoreIcon />,
  // "Log Food": <FavoriteIcon />,
  // "Plans": <RestoreIcon />,
  "AI": <FaceRetouchingNaturalIcon />,
  "More": <MenuIcon />,
};

export default function SimpleBottomNavigation(props) {
  // State / Hooks
  const hooks = useHooks();
  const [state, setState] = useState({});
  const [themeOption, setThemeOption] = useState(0);

  const handleThemeChange = (event) => {
    setThemeOption(prev => prev >= themeColors.length ? 0 : prev + 1);
  };

  // Handlers
  const handleChange = (event) => {
    // if input type is text field
    if (event?.target) setState({ 
      ...state, 
      [event.target.id]: event.target.value 
    });
    // if input type is date field
    if (event?.date) setState({ 
      ...state, 
      date: new Date(event).toLocaleDateString() 
    });
  };
  
  const handleFocus = (e) => {
    console.log(e.target.id)
    hooks
      .actions
      .updateDrawers({
        active: "food",
        anchor: "bottom",
        open: true,
      });
    
    document?.getElementById("food")?.focus();
  }

  const handleNavChange  = (event, newValue) => {
    console.log("handleNavChange: ", newValue)
    if (newValue === 3) hooks
      .actions
      .updateDrawers({
        active: "ai",
        anchor: "bottom",
        open: true,
      });
    else if (newValue === 1) hooks
      .actions
      .updateDrawers({
        active: "weight",
        anchor: "bottom",
        open: true,
      });
    else props.setTab(newValue);
  }

  return (
    <Box sx={{ width: "100%", position: 'sticky', bottom: 0, backgroundColor: themeColors[themeOption] }}>
      <Grid item xs={12} sm={12} p={2}>
        <Box component="form" onClick={handleFocus}> 
          <Autocomplete
            options={[]}
            sx={{ p: 0, borderRadius: 8, backgroundColor: "rgba(33,33,33,0.8)", color: "#fff" }}
            renderInput={(params) => (
              <TextField
                type="text"
                ref={params.InputProps.ref}
                {...params.inputProps}
                value={state.exerciseName}
                placeholder="Search for a food"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton p={1} type="submit" sx={{ color: "#fff" }}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton id="qr-scan-button" p={1} onClick={() => {}} sx={{ color: "#fff" }}>
                        <QrCodeScannerIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx:{
                    borderRadius: 8,
                    // borderColor: "#fff"
                    // backgroundColor: "rgba(33,33,33,0.8)"
                  }
                }}
              />
            )}
          />
        </Box>
        <Button onClick={handleThemeChange}>
          Toggle Theme
        </Button>
        {/* <List>
          {themeColors.map(theme => (
            <ListItem key={theme}>
              <ListItemIcon>
                <circle style={{ background: theme, width: 10, height: 10, borderRadius: 50 }} />
                <Typography variant="body1">
                  {theme}
                </Typography>
              </ListItemIcon>
            </ListItem>
          ))}
        </List> */}
      </Grid>
      <BottomNavigation
        showLabels
        value={props.tab}
        onChange={handleNavChange}
        sx={{ backgroundColor: themeColors[themeOption], color: '#fff' }}
      >
      {Object
        .keys(items)
        .map((item, index) => (
          <BottomNavigationAction
            key={index} 
            label={item} 
            icon={items[item]}
            sx={{ color: "#222" }}
          />
      ))}
      </BottomNavigation>
    </Box>
  );
}
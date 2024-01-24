// Packages
import { useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box, BottomNavigation, BottomNavigationAction, Grid, IconButton, InputAdornment, TextField, Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import MenuIcon from '@mui/icons-material/Menu';

// Services
import { useHooks } from '../../hooks';


const items = {
  "Dashboard": <RestoreIcon />, 
  "Log Food": <FavoriteIcon />,
  "NewsFeed": <LocationOnIcon />,
  "Plans": <RestoreIcon />,
  "AI": <FaceRetouchingNaturalIcon />,
  "More": <MenuIcon />,
};

export default function SimpleBottomNavigation(props) {
  // State / Hooks
  const hooks = useHooks();
  const [state, setState] = useState({});
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

  return (
    <Box sx={{ width: "100%", position: 'sticky', bottom: 0, backgroundColor: 'rgba(80, 170, 255, 1)' }}>
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
                  )
                }}
              />
            )}
          />
        </Box>
      </Grid>
      <BottomNavigation
        showLabels
        // value={props.tab}
        // onChange={(event, newValue) => props.setTab(newValue)}
        sx={{ backgroundColor: 'rgba(80, 170, 255, 1)', color: '#fff' }}
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
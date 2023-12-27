import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const items = {
  "Dashboard": <RestoreIcon />, 
  "Log Food": <FavoriteIcon />,
  "NewsFeed": <LocationOnIcon />,
  "Plans": <RestoreIcon />,
  "More": <FavoriteIcon />
};

export default function SimpleBottomNavigation(props) {
  return (
    <Box sx={{ width: 500 }}>
      {props?.extraContent && props.extraContent}
      <BottomNavigation
        showLabels
        value={props.tab}
        onChange={(event, newValue) => props.setTab(newValue)}
      >
      {Object
        .keys(items)
        .map((item, index) => (
          <BottomNavigationAction
            key={index} 
            label={item} 
            icon={items[item]}
          />
      ))}
      </BottomNavigation>
    </Box>
  );
}
import React from 'react'
import {
  Autocomplete, Avatar, Button, Chip, Stack, TextField,
  Box, IconButton, Toolbar, Typography, Grid,
  InputAdornment, Tab, Tabs, CircularProgress, List,
  ListItem, ListItemText, ListItemAvatar, ListItemButton,
} from '@mui/material'
import { useHooks } from '../hooks';
import { cap_first } from '../utilities/helpers'
import { foodHistory } from '../utilities/constants'
import foodRepoData from '../api/food_repo.data';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const FoodDrawer = (props) => {
  const hooks = useHooks();
  const [ state, setState ] = React.useState({
    search: "",
    tab: 0,
  });

  const { actions } = hooks;
  
  const handleChange = (event, newValue) => {
    setState({ ...state, tab: newValue });
  }

  const handleSelectedFood = (food) => {
    console.log("handleSelectedFood: ", food);
    props.handleSelected(food);
    actions.closeDrawers();
    actions.updateDrawers({
      active: "food",
      anchor: "right",
      open: true,
    });
  };

  return (
    <>
      <Box sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
        <Autocomplete
          id="food"
          options={foodRepoData?.data || []}
          fullWidth
          onLoadedData={() => {}}
          loading={hooks.food.isLoading}
          sx={{ ml: 4 }}
          getOptionLabel={(option) => {
            // console.log("getOptionLabel: ", option, option?.name)
            return option?.display_name_translations["en"]
          }}
          renderOption={(props, option) => {
            // return option
            const image = option.images.find(({categories}) => categories.includes("Front"))?.thumb;
            // console.log("renderOption: ", props, option, image)
            return (
              <Stack direction="row" spacing={1} p={1} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(33,33,33,0.1)"} }} onClick={() =>handleSelectedFood(option)}>
                <Avatar src={image} />
                <Typography variant="h6">{option?.display_name_translations["en"]}</Typography>
                <Chip size="small" label={option?.country} />
              </Stack>
            )
          }}
          renderInput={(params) => (
            <Box ref={params.InputProps.ref}>
              <TextField
                type="text"
                {...params.inputProps}
                value={state.foodName}
                placeholder="Search for a food"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton p={1} onClick={() => {}}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton p={1} onClick={() =>{}}>
                        <QrCodeScannerIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          )}
        />
      </Box>
      <Grid id="food-history-container" container>
        <Grid item xs={12} sm={12} sx={{ p: 2}}>
          <Tabs>
            {["All", "My Meals", "My Recipes", "My Foods"]
              .map((tab, i) => <Tab key={`${tab}_tab`} label={tab} value={i} />
            )}
          </Tabs>
        </Grid>

        {/* TODO: Quick Add Buttons Section goes here */}
        
        <Grid item xs={12} sm={12} sx={{ p: 2}}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1">History</Typography>
            <Chip component={Button} variant="outlined" label="Most Recent" onClick={() => actions.createAlert("success", "SUper Super tesT!")}/>
          </Box>
          <List id="food-history-list">
            {hooks?.food?.isLoading
              ? <CircularProgress />
              : hooks?.food?.data.map((food, i) => (
              <ListItem key={`${food.date}_${food.name}`} component={ListItemButton}>
                <ListItemText primary={food.name} secondary={foodHistory.formatFoodObjectToString(food)} />
                <Box>
                  <IconButton 
                    onClick={() => handleSelectedFood(food)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => hooks.dbApi.delete("food", food.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Grid>
        
      </Grid>
    </>
  )
}

export default FoodDrawer
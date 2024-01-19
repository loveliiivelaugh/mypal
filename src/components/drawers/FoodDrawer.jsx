import { useState } from 'react'
import {
  Autocomplete, Avatar, Chip, Stack, TextField,
  Box, IconButton, Typography, Grid, Link,
  InputAdornment, Tab, Tabs, CircularProgress, List,
  ListItem, ListItemText, ListItemButton,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { useHooks } from '../../hooks';
import { useGetInstantQuery, getNutritionixItem } from '../../api';
import { cap_first } from '../../utilities/helpers'
import { foodHistory } from '../../utilities/constants'



const FoodDrawer = (props) => {
  const hooks = useHooks();
  const [ state, setState ] = useState({});
  const nutritionix = useGetInstantQuery(state?.food, { skip: !state?.food });

  const { actions } = hooks;
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  }

  const handleSelectedFood = async (food) => {
    const foodItem = await getNutritionixItem(food?.nix_item_id);
    actions.handleSelected(foodItem);
    actions.closeDrawers();
    actions.updateDrawers({
      active: "food",
      anchor: "right",
      open: true,
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2, py: 2 }}>
        <IconButton sx={{ color: "#fff"}} onClick={hooks.actions.closeDrawers}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="p" gutterBottom>
          {`Add ${cap_first(hooks.drawers.active)}`}
        </Typography>
        <IconButton sx={{ color: "#fff"}} type="submit">
          <CheckIcon />
        </IconButton>
      </Box>
      {props.includeNutritionixAttribution && (
        <Box sx={{ justifyContent: "space-around", px: 4, mb: 1 }}>
          <Typography variant="body1" component="p" gutterBottom>
            "We have the largest branded food database in existence with over 931K grocery foods with barcodes and 190K restaurant foods."
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            - Nutritionix
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Food and Nutrition Data sourced from Nutritionix.{"  "}
            <Link href="https://www.nutritionix.com/business/api" target="_blank" sx={{ color: '#fff' }}>
              Learn more about Nutritionix API @ {" "}
            </Link>
            <a href="https://www.nutritionix.com/" target="_blank" rel="noreferrer" style={{color: "#fff"}}>
              nutritionix.com
            </a>
          </Typography>
        </Box>
      )}
      <Box sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
        <Autocomplete
          id="food"
          options={nutritionix?.data?.branded || []}
          fullWidth
          onLoadedData={() => nutritionix?.data?.branded}
          loading={nutritionix?.isLoading}
          sx={{ ml: 4, border: 0 }}
          getOptionLabel={(option) => {
            return option?.brand_name_item_name
          }}
          renderOption={(props, option) => {
            const image = option?.photo?.thumb;
            return (
              <Stack 
                direction="row" 
                spacing={1} 
                p={1} 
                sx={{ 
                  cursor: "pointer", 
                  "&:hover": { backgroundColor: "rgba(33,33,33,0.1)" } 
                }} 
                onClick={() => handleSelectedFood(option)}
              >
                <Avatar src={image} />
                <Typography variant="h6" p={1}>{option?.brand_name_item_name}</Typography>
                <Chip size="small" label={`${option?.nf_calories} cals`} p={1} />
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
            <Chip variant="outlined" label="Most Recent" />
          </Box>
          <List id="food-history-list">
            {hooks?.food?.isLoading
              ? <CircularProgress />
              : hooks?.food?.data.map((food, i) => (
              <ListItem key={`${food.date}_${food.name}`} component={ListItemButton} onClick={() => handleSelectedFood(food)}>
                <ListItemText primary={food.name} secondary={foodHistory.formatFoodObjectToString(food)} />
                <Box>
                  <IconButton onClick={() => handleSelectedFood(food)}>
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
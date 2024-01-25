// Packages
import { 
  Autocomplete, Box, Card, Chip, Container, Grid, TextField, Typography, 
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import { Loader } from "../layout";
import { DrawerHeader } from "../../hooks/useForms"

// Services
import { 
  useGetCategoriesQuery, 
  useGetRandomFoodQuery, 
  useGetIngredientsListQuery,
  useGetAreasListQuery
} from "../../api"

// Utilities
import { defaultGridItemProps } from "../../utilities/constants";

const RecipeCardTextBox = styled(Box)(({ theme }) => ({
  zIndex: 20,
  position: "relative",
  bottom: 200,
  left: 0,
  color: "#333",
  height: "100%",
  width: "100%"
}));

const RecipesDrawer = () => {
  // Queries TODO: Wrap in a single query hook
  const categories = useGetCategoriesQuery();
  const randomFood = useGetRandomFoodQuery();
  const ingredients = useGetIngredientsListQuery();
  const areas = useGetAreasListQuery();
  // console.log("RecipesDrawer: ", areas)
  return (
    <Container maxWidth={false} sx={{ width: "100vw" }}>
      <DrawerHeader />
      <Typography variant="h2">Recipes</Typography>

      {/* Search */}
      <Autocomplete
        id="recipe-search"
        disablePortal
        options={[]}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Search Recipes" />}
      />

      {/* Search Results */}

      {/* Latest */}
      <Grid container my={2} rowSpacing={2} columnSpacing={2}>
        <Grid xs={12}>
          <Typography variant="h6">Latest Recipes</Typography>
        </Grid>
        
        {randomFood.isLoading ? <Loader /> : randomFood.data.map((recipe, i) => (
          <Grid
            key={`${recipe.idMeal}-${i}`}
            height={400}
            {...defaultGridItemProps}
          >
            <img src={recipe.strMealThumb} style={{ height: "100%", width: "100%", borderRadius: "16px" }} />
            <RecipeCardTextBox>
              <Box sx={{
                bgcolor: "rgba(255, 255, 255, 0.4)", 
                p: 1, 
                backdropFilter: "blur(5px)" 
                }}
              >
                <Typography variant="h4" component="p">
                  {recipe.strMeal}
                  </Typography>
                <Chip label={recipe.strCategory} sx={{ color: "#333" }} />
              </Box>
            </RecipeCardTextBox>
          </Grid>
        ))}
      </Grid>

      {/* Categories */}
      {categories.isLoading ? <Loader /> : categories.data.map((category) => (
        <Grid container my={2} rowSpacing={2} columnSpacing={2} key={category.strCategory}>
          <Grid xs={12}>
            <Typography variant="h6">{category.strCategory}</Typography>
          </Grid>
          {category.strCategoryDescription}
        </Grid>
      ))}

      {/* Popular Ingredients */}
      {/* {ingredients.isLoading ? <Loader /> : ingredients.data.map((ingredient) => (
        <Grid container my={2} rowSpacing={2} columnSpacing={2} key={ingredient.idIngredient}>
          <Grid xs={12}>
            <Typography variant="h6">{ingredient.strIngredient}</Typography>
          </Grid>
          {ingredient.strDescription}
        </Grid>
      ))} */}
      
      {/* Browse by Country */}
      {areas.isLoading ? <Loader /> : areas.data.map((area) => (
        <Grid container my={2} rowSpacing={2} columnSpacing={2} key={area.strArea}>
          <Grid xs={12}>
            <Typography variant="h6">{area.strArea}</Typography>
          </Grid>
        </Grid>
      ))}

    </Container>
  )
}

export default RecipesDrawer
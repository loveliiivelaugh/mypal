import { Autocomplete, Container, Grid, TextField, Typography } from "@mui/material";

import { DrawerHeader } from "../../hooks/useForms"
import { useGetCategoriesQuery } from "../../api"


const RecipesDrawer = () => {
    // need a query to grab most popular recipes on load
    const categories = useGetCategoriesQuery();
    console.log("RecipesDrawer: ", categories)
    return (
        <Container maxWidth={false} sx={{ width: "100vw" }}>
            <DrawerHeader />
            <h1>Recipes</h1>
            {/* Search */}
            <Autocomplete
                disablePortal
                id="recipe-search"
                options={[]}
                // sx={{ width: 300 }}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Search Recipes" />}
            />
            {/* Latest */}
            <hr />
            <Grid container my={2}>
                <Typography variant="h6">Latest Recipes</Typography>
                {/* {data.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                        <h3>{recipe.title}</h3>
                    </Grid>
                ))} */}
            </Grid>

            {/* Categories */}
            <hr />

            {/* Popular Ingredients */}

            {/* Random Recipes */}

            {/* Random Ingredients */}

            {/* Browse by Country */}

            {/* Browse by Name */}
        </Container>
    )
}

export default RecipesDrawer
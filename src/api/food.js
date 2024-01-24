// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// env variables
const { 
  REACT_APP_RAPID_API_KEY: key,
  REACT_APP_RAPID_API_FOOD_HOST: foodHost,
  REACT_APP_RAPID_API_CALORIES_BURNED: calsBurnedHost,
} = process.env;


const headers = {
  'X-RapidAPI-Key': key,
  'X-RapidAPI-Host': foodHost,
};

// Free Meal Database API
const theMealDb = {
  categories: `https://www.themealdb.com/api/json/v1/1/categories.php`,
  random: "https://www.themealdb.com/api/json/v1/1/random.php",
  all_ingredients: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
  all_areas: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
};

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${foodHost}/recipes`,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', key)
      headers.set('X-RapidAPI-Host', foodHost)
      return headers
    },
  }),
  tagTypes: ['Food'],
  endpoints: (builder) => ({
      getFood: builder.query({
        query: (params) => `/complexSearch?query=${params.query}`,
      }),
      getRandomFood: builder.query({
        queryFn: async () => {
          const data = await Promise
            .all(new Array(10)
              .fill("")
              .map((_) => fetch(theMealDb.random)
                .then(res => res.json())
                .then(data => data.meals[0])))

          // console.log("getRandomFood: ", data)
          return { data }
        }
      }),

      getCategories: builder.query({
        queryFn: async () => {
          const data = await fetch(theMealDb.categories)
            .then(res => res.json())
            .then(data => data?.categories)

          // console.log("getCategories: ", data)
          return { data }
        }
      }),

      getIngredientsList: builder.query({
        queryFn: async () => {
          const data = await fetch(theMealDb.all_ingredients)
            .then(res => res.json())
            .then(data => data?.meals)

          // console.log("getIngredientsList: ", data)
          return { data }
        }
      }),

      getAreasList: builder.query({
        queryFn: async () => {
          const data = await fetch(theMealDb.all_areas)
            .then(res => res.json())
            .then(data => data?.meals)

          // console.log("getAreasList: ", data)
          return { data }
        }
      })
  }),
});


export const getCaloriesBurned = async ({exercise, weight, duration}) => {
  const url = `https://${calsBurnedHost}/v1/caloriesburned?` +
    `activity=${exercise}&weight=${weight}&duration=${duration}}`;
  const options = {
    method: 'GET', 
    headers: {
      ...headers, 
      'X-RapidAPI-Host': calsBurnedHost,
    }
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const calsBurnedApi = createApi({
  reducerPath: 'calsBurnedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${calsBurnedHost}/v1`,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', key)
      headers.set('X-RapidAPI-Host', calsBurnedHost)
      return headers
    },
  }),
  tagTypes: ['CaloriesBurned'],
  endpoints: (builder) => ({
    getCaloriesBurned: builder.query({
      query: ({exercise, weight, duration}) => `caloriesburned?activity=${exercise}&weight=${weight}&duration=${duration}`,
    }),
  }),
});

export const foodSearchApi = createApi({
  reducerPath: 'foodSearchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${foodHost}/recipes`,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', key)
      headers.set('X-RapidAPI-Host', foodHost)
      return headers
    },
  }),
  tagTypes: ['FoodSearch'],
  endpoints: (builder) => ({
    getFoodSearch: builder.query({
      query: ({query}) => `complexSearch?query=${query}`,
    }),
  }),
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetFoodQuery, 
  useGetRandomFoodQuery, 
  useGetCategoriesQuery,
  useGetIngredientsListQuery,
  useGetAreasListQuery
} = foodApi;
export const { useGetFoodSearchQuery } = foodSearchApi;
export const { useGetCaloriesBurnedQuery } = calsBurnedApi;
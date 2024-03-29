// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../db';
import { nutritionixApi, getNutritionixItem, useGetInstantQuery } from './nutritionix';
import { getMuscleGroupImage, exercisedbApi, useGetExercisesQuery } from './exercise';
import { 
  foodApi,
  useGetFoodQuery, 
  useGetRandomFoodQuery,
  useGetCategoriesQuery, 
  useGetIngredientsListQuery,
  useGetAreasListQuery
} from './food';

export { 
  nutritionixApi, // Specifically contains Nutritionix Endpoints
  foodApi, // Food Endpoints around Recipes
  getNutritionixItem, // to GET an item from a search
  getMuscleGroupImage, // to GET an image for a muscle group
  useGetInstantQuery, // Query handler to handle instant food search for consumption tracking
  useGetCategoriesQuery, // Query handler to get food categories available for searching
  useGetFoodQuery, // Query handler to get food recipes
  useGetRandomFoodQuery, // Query handler to get random food recipes
  useGetIngredientsListQuery, // Query handler to get list of ingredients
  useGetAreasListQuery, // Query handler to get list of food areas
  // Exercise Endpoints
  exercisedbApi,
  useGetExercisesQuery,
};

// env variables
const { 
  REACT_APP_AI_URL: uri, 
  REACT_APP_RAPID_API_KEY: key, 
  REACT_APP_RAPID_API_EXERCISE_HOST_2: host,
  REACT_APP_RAPID_API_FOOD_HOST: foodHost,
  REACT_APP_RAPID_API_CALORIES_BURNED: calsBurnedHost,
  REACT_APP_RAPID_API_MUSCLE_GROUP_IMAGE: muscleGroupImageHost,
} = process.env;

const headers = {
  'X-RapidAPI-Key': key,
  'X-RapidAPI-Host': host,
};

export const aiApi = createApi({
  reducerPath: 'aiApi',
  baseQuery: fetchBaseQuery({ baseUrl: `` }),
  tagTypes: ['AI', 'chat', 'help', 'trainer'],
  endpoints: (builder) => ({
    sendChat: builder.mutation({
      queryFn: async (payload) => {
        // const url = uri + `/api/openai/completion`;
        const url = uri + `/api/llms/chat`;
        console.log("Inside Ai API: ", payload, url)
        
        return await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ prompt: payload})
        })
        .then(res => res.json())
        .then(data => {
          console.log("sendChat: ", data)
          return { data };
        })
      }
    })
  })
})

export const { useSendChatMutation } = aiApi;

// Define a service using a base URL and expected endpoints
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${host}/v1`,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', key)
      headers.set('X-RapidAPI-Host', host)
      return headers
    },
  }),
  tagTypes: ['Exercise'],
  endpoints: (builder) => ({
    getExercise: builder.query({
      query: (name) => `exercises?name=${name}`,
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => {
        // dbApi.add('exercises_library', Array.isArray(response) ? response : [response])
        return response;
      },
    }),
  }),
});

export const muscleGroupImageApi = createApi({
  reducerPath: 'muscleGroupImageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${muscleGroupImageHost}/`,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', key)
      headers.set('X-RapidAPI-Host', `${muscleGroupImageHost}`)
      return headers
    },
  }),
  tagTypes: ['MuscleGroupImage'],
  endpoints: (builder) => ({
    getMuscleGroupImage: builder.query({
      query: () => `getImage?muscleGroups=chest`,
    }),
  }),
});

export const { useGetMuscleGroupImageQuery } = muscleGroupImageApi;


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetExerciseQuery } = exerciseApi;

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

export const { useGetCaloriesBurnedQuery } = calsBurnedApi;

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


const supabaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // Database Methods exposed to the UI
    // GET a single item by id
    get: builder.query({
      queryFn: async (params) => {
        console.log("inside queryFn(): ", params)
        const {table, id, columns, selector} = params;
        const {data, error} = await supabase
          .from(table)
          .select(columns.join(','))
          .eq(selector, id);

        return [data, error];
        // return params;
      },
      transformResponse: (response, meta, arg) => {
        console.log("inside transformResponse(): ", response)
        // dbApi.add('exercises_library', Array.isArray(response) ? response : [response])
        return response;
      },
    }),
    // GET all items/rows from a table
    getAll: builder.query({
      queryFn: async (table) => await supabase
        .from(table)
        .select(),
      transformResponse: (response, meta, arg) => {
        console.log("inside transformResponse(): ", response, meta)
        // dbApi.add('exercises_library', Array.isArray(response) ? response : [response])
        return response;
      },
    }),
    // GET the current user session
    getSession: builder.query({
      queryFn: async () => await supabase
        .auth
        .getSession()
    }),
    // CREATE a new item/row in a table
    add: builder.mutation({
      queryFn: async (table, payload) => await supabase
        .from(table)
        .insert(payload)
        .select(),
    }),
    // UPDATE an item/row in a table
    update: builder.mutation({
      queryFn: async (table, id, payload) => await supabase
        .from(table)
        .update(payload)
        .eq('id', id),
    }),
    // DELETE an item/row in a table
    delete: builder.mutation({
      queryFn: async (table, id) => await supabase
        .from(table)
        .delete()
        .eq('id', id),
    }),

    // Auth Methods exposed to the UI
    signup: builder.mutation({
      queryFn: async (payload) => await supabase
        .auth
        .signUp(payload),
    }),

    login: builder.mutation({
      queryFn: async (payload) => {
        console.log("inside login.payload: ", payload)
        const response = await supabase
          .auth
          .signInWithPassword(payload)

        console.log("inside login.response: ", response)
        return response;
      },
      
    }),

    logout: builder.mutation({
      queryFn: async () => await supabase
        .auth
        .signOut(),
    }),

    resetPassword: builder.mutation({
      queryFn: async (payload) => await supabase
        .auth
        .api
        .resetPasswordForEmail(payload),
    }),
    // Phone number login
    loginWithOtp: builder.mutation({
      queryFn: async (payload) => await supabase
        .auth
        .api
        .signInWithOtp(payload),
    }),

  }),

})

export const { 
  useGetSessionQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useLoginWithOtpMutation,
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  useGetAllQuery,
} = supabaseApi
export { supabaseApi }


export const dbApi = {
  
  add: async (table, payload) => await supabase
    .from(table)
    .insert(payload)
    .select(),

  get: async (table, id) => await supabase
    .from(table)
    .select()
    .eq('id', id),

  getAll: async (table) => await supabase
    .from(table)
    .select(),

  update: async (table, id, payload) => await supabase
    .from(table)
    .update(payload)
    .eq('id', id),

  delete: async (table, id) => await supabase
    .from(table)
    .delete()
    .eq('id', id),

}
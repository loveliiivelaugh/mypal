// Need to use the React-specific entry point to import createApi
import { useState } from 'react';
import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import { supabase } from '../db'
import { tryCatchHandler } from '../utilities/helpers';


// env variables
const { 
  REACT_APP_RAPID_API_KEY: key, 
  REACT_APP_RAPID_API_EXERCISE_HOST_2: host,
  REACT_APP_RAPID_API_FOOD_HOST: foodHost,
  REACT_APP_RAPID_API_CALORIES_BURNED: calsBurnedHost,
  REACT_APP_RAPID_API_MUSCLE_GROUP_IMAGE: muscleGroupImageHost,
} = process.env;

console.log({ muscleGroupImageHost })
const headers = {
  'X-RapidAPI-Key': key,
  'X-RapidAPI-Host': host,
};

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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetExerciseQuery } = exerciseApi;
export const { useGetFoodQuery } = foodApi;

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
      }
    }),
    // GET all items/rows from a table
    getAll: builder.query({
      queryFn: async (table) => await supabase
        .from(table)
        .select(),
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
      queryFn: async (payload) => await supabase
        .auth
        .signInWithPassword(payload),
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
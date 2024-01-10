// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import { supabase } from '../db'


// env variables
const { 
  REACT_APP_RAPID_API_KEY: key, 
  REACT_APP_RAPID_API_EXERCISE_HOST_2: host,
  REACT_APP_RAPID_API_FOOD_HOST: foodHost
} = process.env;

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
      query: ({name}) => `exercises?name=${name}`,
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => {
        // dbApi.add('exercises_library', Array.isArray(response) ? response : [response]) 
        return response;
      },
    }),
  }),
});


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

const supabaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getFromDatabase: builder.query({
      queryFn: async (table, id) => {
        const {data, error} = await supabase
          .from(table)
          .select()
          .eq('id', id)

        if (error) {
          throw { error };
        }

        return { data };
      }
    }),
    getFromDatabaseTable: builder.query({
      query: (table) => '/database/read/' + table,
      async onQueryStarted({ table }, { dispatch, queryFulfilled }) {
        try {
          const response = await dispatch(
            queryFulfilled.matchPending({ table })
          )
          console.log('response onQueryStarted: ', response)
          return response
        } catch (error) {
          return error
        }
      },
    }),

    updateDatabaseTable: builder.mutation({
      query: (payload) => {
        console.log('updateDatabaseTable payload: ', payload)
        return ({
          url: `/database/${payload.params}`,
          method: payload.method,
          body: payload.data,
        })
      },
    }),
  })
})

export const { useMutateDatabaseQuery } = supabaseApi
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
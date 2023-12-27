// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'dotenv/config'

// env variables
const { 
  REACT_APP_RAPID_API_KEY: key, 
  REACT_APP_RAPID_API_HOST: host 
} = process.env;

// Define a service using a base URL and expected endpoints
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${host}/exercise/name`,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', key)
      headers.set('X-RapidAPI-Host', host)
      return headers
    },
  }),
  tagTypes: ['Exercise'],
  endpoints: (builder) => ({
    getExercise: builder.query({
      query: (params) => `/${params.exerciseName}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetExerciseQuery } = exerciseApi
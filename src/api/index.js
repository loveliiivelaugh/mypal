// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://exerciseapi3.p.rapidapi.com/exercise/name',
    prepareHeaders(headers) {
      // ...
      return headers
    },
  }),
  tagTypes: ['Exercise'],
  endpoints: (builder) => ({

    getExercise: builder.query({
      query: (params) => `/${params.exerciseName}`,
    }),

  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetExerciseQuery } = exerciseApi
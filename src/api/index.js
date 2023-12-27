// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://exerciseapi3.p.rapidapi.com/exercise/name',
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', 'ac72153c36mshd1814c8f1af20f3p1518fbjsnabee85184908')
      headers.set('X-RapidAPI-Host', 'exerciseapi3.p.rapidapi.com')
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
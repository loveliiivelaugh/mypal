// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// env variables
const { 
  REACT_APP_RAPID_API_KEY: key, 
  REACT_APP_RAPID_API_EXERCISE_HOST_2: host,
  REACT_APP_RAPID_API_EXERCISEDB_HOST: exercisedb_host,
  REACT_APP_RAPID_API_MUSCLE_GROUP_IMAGE: muscleGroupImageHost,
} = process.env;

const headers = {
  'X-RapidAPI-Key': key,
  'X-RapidAPI-Host': host,
};

export const exercisedbApi = createApi({
  reducerPath: 'exerciseDbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${exercisedb_host}/`,
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', key)
      headers.set('X-RapidAPI-Host', exercisedb_host)
      return headers
    },
  }),
  tagTypes: ['ExerciseDB'],
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: (name) => `exercises/bodyPart/back?limit=10`,
      // // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response, meta, arg) => {
      //   console.log("inside transformResponse(): ", response)
      //   return response;
      // },
    })
  })
})

export const { useGetExercisesQuery } = exercisedbApi;

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

export const getMuscleGroupImage = async (muscleGroup) => {
  const url = `https://${muscleGroupImageHost}/getImage?muscleGroups=${muscleGroup}`;
  const headers = {
    'X-RapidAPI-Key': key,
    'X-RapidAPI-Host': muscleGroupImageHost,
  }
  const options = { headers, responseType: "arraybuffer" }
  const response = await fetch(url, options);
  const imageFile = new Blob([response.data]);
  const imageUrl = URL.createObjectURL(imageFile);
  console.log('data', imageUrl);
  return imageUrl || null;
};

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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetExerciseQuery } = exerciseApi;
export const { useGetMuscleGroupImageQuery } = muscleGroupImageApi;
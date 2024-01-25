import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

// API
import { 
  exerciseApi,
  muscleGroupImageApi,
  foodApi, 
  supabaseApi,
  nutritionixApi,
  exercisedbApi,
  aiApi,
} from '../api'

// Reducers
import { alertSlice, authSlice, exerciseSlice } from './features'


const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
    alerts: alertSlice,
    auth: authSlice,

    // Add the generated reducer as a specific top-level slice
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    [muscleGroupImageApi.reducerPath]: muscleGroupImageApi.reducer,
    [nutritionixApi.reducerPath]: nutritionixApi.reducer,
    [exercisedbApi.reducerPath]: exercisedbApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(exerciseApi.middleware)
      .concat(supabaseApi.middleware)
      .concat(foodApi.middleware)
      .concat(muscleGroupImageApi.middleware)
      .concat(nutritionixApi.middleware)
      .concat(exercisedbApi.middleware)
      .concat(aiApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export { store, exerciseApi }
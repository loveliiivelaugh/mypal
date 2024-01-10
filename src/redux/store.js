import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

// API
import { exerciseApi, foodApi } from '../api'

// Reducers
import { alertSlice, exerciseSlice } from './features'


const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
    alerts: alertSlice,
    // food: foodSlice,

    // Add the generated reducer as a specific top-level slice
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(exerciseApi.middleware)
      .concat(foodApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export { store, exerciseApi }
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

// API
import { exerciseApi } from '../api'

// Reducers
import { exerciseSlice } from './features'


const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
    // shop: shopSlice,
    // alerts: alertSlice,
    // system: systemSlice,
    // auth: authSlice,
    // pos: posSlice,

    // Add the generated reducer as a specific top-level slice
    [exerciseApi.reducerPath]: exerciseApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(exerciseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export { store, exerciseApi }
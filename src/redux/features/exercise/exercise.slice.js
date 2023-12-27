import { createSlice } from '@reduxjs/toolkit'
// import { serverQueryApi } from '../../../api/backend'


export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    user: null,
    modalOpen: false,
  },
  reducers: {
    // these methods are called actions and are used to modify the state
    setModal: (state, action) => {
      state.modalOpen = action.payload
    },

    openModal: (state, action) => {
      state.modalOpen = true
    },

    closeModal: (state, action) => {
      state.modalOpen = false
    },

  },

  extraReducers: (builder) => {
    // // Add reducers for additional action types here, and handle loading state as needed
    // builder.addMatcher(
    //   serverQueryApi.endpoints.server.matchFulfilled,
    //   (state, action) => {
    //     console.log("Extra Reducers, builder.addMatcher(): ", action, action.payload, state)
    //     if (!action.payload.data?.error) {
    //       state.user = action.payload.data.user
    //     }
    //   }
    // )
  },
})

// Action creators are generated for each case reducer function
export const {
  // ...
  setModal,
} = exercisesSlice.actions


export default exercisesSlice.reducer

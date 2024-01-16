import { createSlice } from '@reduxjs/toolkit'

export const exercisesSlice = createSlice({
  name: 'exercise',
  initialState: {
    selected: null,
  },
  reducers: {
    handleSelected: (state, action) => {
      // console.log("handle selected? ", action.payload)
      state.selected = action.payload
    },
  },

})

// Action creators are generated for each case reducer function
export const { handleSelected } = exercisesSlice.actions

export default exercisesSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const exercisesSlice = createSlice({
  name: 'app',
  initialState: {
    selected: null,
  },
  reducers: {
    handleSelected: (state, action) => {
      state.selected = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { handleSelected } = exercisesSlice.actions

export default exercisesSlice.reducer

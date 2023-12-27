import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    type: null,
    message: null,
  },
  reducers: {
    createAlert: (state, action) => {
      const { type, message } = action.payload
      state.type = type
      state.message = message
    },
    removeAlert: (state) => {
      state.type = null
      state.message = null
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  createAlert,
  removeAlert
} = alertSlice.actions


export default alertSlice.reducer

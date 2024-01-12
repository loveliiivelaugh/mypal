import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    type: null,
    message: null,
    drawers: {
      active: null,
      anchor: "bottom",
      open: false,
    }
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
    },

    updateDrawers: (state, action) => {
      console.log("inside updateDrawers: redux: ", action)
      state.drawers = action.payload;
    },

    closeDrawers: (state) => {
      state.drawers.active = null;
      state.drawers.open = false;
      state.drawers.anchor = "bottom";
    }
  },
  
})

// Action creators are generated for each case reducer function
export const {
  createAlert,
  removeAlert,
  updateDrawers,
  closeDrawers,
} = alertSlice.actions


export default alertSlice.reducer

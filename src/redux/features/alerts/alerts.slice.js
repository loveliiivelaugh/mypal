import { createSlice } from '@reduxjs/toolkit'
import { supabaseApi } from '../../../api'

export const alertSlice = createSlice({
  // TODO: Need to update this to be system
  name: 'alerts',
  initialState: {
    type: null,
    message: null,
    drawers: {
      active: null,
      anchor: "bottom",
      open: false,
    },
    alert: {
      type: null,
      message: null,
    },
    landingPage: true,
  },
  reducers: {
    createAlert: (state, action) => {
      console.log("inside createAlert: redux: ", state, action)
      const { type, message } = action.payload
      state.type = type
      state.message = message
    },
    removeAlert: (state) => {
      state.type = null
      state.message = null
    },

    updateDrawers: (state, action) => {
      state.drawers = action.payload;
    },

    closeDrawers: (state) => {
      state.drawers.active = null;
      state.drawers.open = false;
      state.drawers.anchor = "bottom";
    },

    setLandingPage: (state, action) => {
      state.landingPage = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addMatcher(supabaseApi.endpoints.signup.matchFulfilled, (state, action) => {
        console.log("inside signup.matchFulfilled: redux: Is it this one?", state, action)
      })
      .addMatcher(supabaseApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log("inside login.matchFulfilled: redux: ",alertSlice, alertSlice.getInitialState(), builder, state, action)
        createAlert(alertSlice.getInitialState(), {
          message: "Successfully logged in!",
          type: "success",
        }) 

        alertSlice.setLandingPage(true)
      })
      .addMatcher(supabaseApi.endpoints.logout.matchFulfilled, (state, action) => {
        console.log("inside logout.matchFulfilled: redux: ",alertSlice, alertSlice.getInitialState(), builder, state, action)
        createAlert(alertSlice.getInitialState(), {
          message: "Successfully logged out!",
          type: "success",
        })
      })
      .addMatcher(supabaseApi.endpoints.resetPassword.matchFulfilled, (state, action) => {
        console.log("inside resetPassword.matchFulfilled: redux: ", action)

      })
      .addMatcher(supabaseApi.endpoints.loginWithOtp.matchFulfilled, (state, action) => {
        console.log("inside updatePassword.matchFulfilled: redux: ", action)
      })
  }
})

// Action creators are generated for each case reducer function
export const {
  createAlert,
  removeAlert,
  updateDrawers,
  closeDrawers,
  setLandingPage,
} = alertSlice.actions


export default alertSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { supabaseApi } from '../../../api'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    session: null,
    user: null,
  },
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(supabaseApi.endpoints.getSession.matchFulfilled, (state, action) => {
        state.session = action.payload.session
      })
  },
})

// Action creators are generated for each case reducer function
export const {
  setSession,
} = authSlice.actions


export default authSlice.reducer

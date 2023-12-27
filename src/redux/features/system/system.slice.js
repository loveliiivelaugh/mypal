import { createSlice } from '@reduxjs/toolkit'

export const systemSlice = createSlice({
  name: 'system',
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
    },

    handleTextToSpeech: (state, action) => {
      const { text } = action.payload

      console.log("will you speak handleTextToSpeech?!?!")

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1.2

      window.speechSynthesis.speak(utterance)
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  createAlert,
  removeAlert,
  handleTextToSpeech,
} = systemSlice.actions


export default systemSlice.reducer

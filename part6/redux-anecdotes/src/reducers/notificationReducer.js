import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateMessage: (state, action) => {
      return action.payload
    }
  }
})

export default notificationSlice.reducer

export const { updateMessage } = notificationSlice.actions
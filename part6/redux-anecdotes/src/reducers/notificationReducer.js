import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    error: (state, action) => {
      return action.payload
    }
  }
})

export default notificationSlice.reducer

export const { error } = notificationSlice.actions
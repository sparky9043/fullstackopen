import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const fliterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export default fliterSlice.reducer

export const { filterChange } = fliterSlice.actions
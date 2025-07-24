import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      state.find(a => a.id === action.payload).votes++
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }
}
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      state.find(a => a.id === action.payload).votes++
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    }
  }
})

export default anecdoteSlice.reducer

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const note = await anecdoteService.create(content)
    dispatch(appendAnecdote(note))
  }
}

export const updateVote = (anecdoteObject) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.update(anecdoteObject)
    dispatch(vote(anecdote.id))
  }
}
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { updateVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteItem = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(state => {
    if (!state.filter) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const anecdotesSorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = (id) => {
    const clickedAnecdote = anecdotes.find(a => a.id === id)
    const anecdoteContent = clickedAnecdote.content
    dispatch(updateVote({
      content: anecdoteContent,
      votes: clickedAnecdote.votes + 1,
      id,
    }))
    dispatch(setNotification(`you voted '${anecdoteContent}'`, 5))
  }

  return (
    <>
      {anecdotesSorted.map(anecdote =>
        <AnecdoteItem anecdote={anecdote} key={anecdote.id} handleClick={handleVote} />
      )}
    </>
  )
}

export default AnecdoteList
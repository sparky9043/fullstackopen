/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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

  const anecdotes = useSelector(state => {
    if (!state.filter) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const anecdotesSorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = (id) => {
    dispatch(vote(id))
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
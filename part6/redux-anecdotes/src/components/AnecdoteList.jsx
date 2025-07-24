/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { updateMessage, removeMessage } from '../reducers/notificationReducer'

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
    console.log(state)
    if (!state.filter) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const anecdotesSorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = (id) => {
    const clickedAnecdote = anecdotes.find(a => a.id === id).content

    dispatch(vote(id))
    dispatch(updateMessage(`you voted '${clickedAnecdote}'`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
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
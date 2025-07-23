import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    return {
      type: 'VOTE',
      payload: { id }
    }
  }

  const create = (anecdote) => {
    return {
      type: 'CREATE',
      payload: {
        anecdote,
      }
    }
  }

  const handleVote = (id) => {
    dispatch(vote(id))
  }

  const handleCreate = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(create(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

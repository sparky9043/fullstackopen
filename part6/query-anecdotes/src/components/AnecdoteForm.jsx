import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from '../hooks/notificationHooks'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...currentAnecdotes, newAnecdote])
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    if (content.length < 5) {
      dispatch({ type: 'updateMessage', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'removeMessage' })
      }, 5000)
      return;
    }

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

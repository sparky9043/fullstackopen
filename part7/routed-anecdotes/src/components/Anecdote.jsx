import { useNavigate } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
  const navigate = useNavigate()

  if (!anecdote) {
    setTimeout(() => {
      navigate('/')
    }, 5000)
    
    return (
      <div>
        <p>Invalid id. Redirecting to home...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

export default Anecdote
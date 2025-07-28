import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew, updateNotification }) => {
  // const [content, setContent] = useState('')
  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.value || !author.value || !info.value) return;

    console.log(content.value, author.value, info.value)

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    updateNotification(
      `a new anecdote ${content.value} created!`
    )

    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew
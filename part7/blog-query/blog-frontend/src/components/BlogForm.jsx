import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '.5rem',
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>create new</h2>
      <div>
        <TextField
          type="text"
          label="title"
          id="title-input"
          data-testid="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          type="text"
          label="author"
          id="author-input"
          data-testid="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          type="text"
          label="url"
          id="url-input"
          data-testid="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button variant="contained" color="secondary" type="submit">
        create
      </Button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm

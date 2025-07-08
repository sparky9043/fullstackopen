import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (!blogs) {
    return (
      <div>Waiting to load...</div>
    )
  }

  const loginForm = () => {
    return (
      <form>
        <h2>log in to application</h2>
        <div>
          username
          <input type="text" />
        </div>
        <div>
          password
          <input type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  return (
    <div>
      {user === null && loginForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
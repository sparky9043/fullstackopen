import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userString = window.localStorage.getItem('userLoginBlogApp')
    if (userString) {
      const savedUser = JSON.parse(userString)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [])

  if (!blogs) {
    return (
      <div>Waiting to load...</div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const savedUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem('userLoginBlogApp', JSON.stringify(savedUser))
      blogService.setToken(savedUser.token)
      setUser(savedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }

  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  function handleLogout() {
    console.log('logged out successfully')
    window.localStorage.removeItem('userLoginBlogApp')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    console.log(user)
    if (!title || !author || !url) return
    try {
      const data = await blogService.create({
        title, author, url
      })
      setBlogs(currentBlogs => [...currentBlogs, data])
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <div>
        {user.name} logged in
        <span>
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>

      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
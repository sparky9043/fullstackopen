import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

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
      setNotification({ type: 'success', message:'Success! user data loaded'})
    }

    return () => setTimeout(() => {
      setNotification(null)
    }, 5000)
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
      setNotification({ type: 'success', message: `Successfully logged in as ${savedUser.name}` })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotification({ type: 'fail', message: 'invalid username or password' })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        {notification ? <p className={`message ${notification.type}`}>{notification.message}</p> : null}
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
    setNotification({ type: 'success', message: 'logged out successfully' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
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
      {notification ? <p className={`message ${notification.type}`}>{notification.message}</p> : null}
      <div>
        {user.name} logged in
        <span>
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>

      <Toggleable buttonLabel='new note'>
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
      </Toggleable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
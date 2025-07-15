import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
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

  const handleCreateBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs => [...blogs, blog])
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.deleteOne(id)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotification({ type: 'success', message: 'post successfully deleted!' })
      
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
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

  const handleLike = async (newObject) => {
    try {
      const returnedBlog = await blogService.update(newObject)
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === returnedBlog.id) {
          blog.likes++
        }
        return blog
      })
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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

      <Toggleable buttonLabel='new blog'>
        <BlogForm createBlog={handleCreateBlog} />
      </Toggleable>

      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog} 
          likePost={handleLike}
          deletePost={handleDeleteBlog}
        />
      )}
    </div>
  )
}

export default App
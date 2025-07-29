import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useContext } from 'react'
import { NotificationContext } from './contexts/NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  
  useEffect(() => {
    const userString = window.localStorage.getItem('userLoginBlogApp')
    
    if (userString) {
      const savedUser = JSON.parse(userString)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
      dispatch({ type: 'updateNotification', payload:'Success! user data loaded'})
    }

    return () => setTimeout(() => {
      dispatch({ type: 'removeNotification' })
    }, 5000)
  }, [])

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
      dispatch({ type: 'updateNotification', payload: `Successfully logged in as ${savedUser.name}` })

      setTimeout(() => {
        dispatch({ type: 'removeNotification' })
      }, 5000)
    } catch (exception) {
      console.log(exception)
      dispatch({ type: 'updateNotification', payload: 'invalid username or password' })

      setTimeout(() => {
        dispatch({ type: 'removeNotification' })
      }, 5000)
    }
  }

  const createNewBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteOne,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const handleCreateBlog = (blogObject) => {
    createNewBlogMutation.mutate(blogObject)
    blogFormRef.current.setVisibility()
  }

  const queryClient = useQueryClient()
  
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (result.isLoading) {
    return <div>Waiting to load...</div>
  }

  const blogs = result.data

  if (!blogs) {
    return (
      <div>Waiting to load...</div>
    )
  }


  const handleDeleteBlog = (id) => {
    deleteBlogMutation.mutate(id)
    dispatch({
      type: 'updateNotification',
      payload: 'post successfully deleted!',
    })
    setTimeout(() => {
      dispatch({ type: 'removeNotification' })
    }, 5000)
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        {notification ? <p className='message'>{notification}</p> : null}
        <div>
          username
          <input
            type="text"
            data-testid="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            data-testid="password"
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
    dispatch({ type: 'updateNotification', payload: 'logged out successfully' })
    setTimeout(() => {
      dispatch({ type: 'removeNotification' })
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
      {notification ? <p className='message'>{notification}</p> : null}
      <div>
        {user.name} logged in
        <span>
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>

      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Toggleable>

      {sortedBlogs.map((blog, index) =>
        <Blog
          key={blog.id}
          index={index}
          blog={blog} 
          likePost={handleLike}
          deletePost={handleDeleteBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App
import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useContext } from 'react'
import { NotificationContext } from './contexts/NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CurrentUserContext } from './contexts/CurrentUserContext'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, userDispatch] = useContext(CurrentUserContext)
  const blogFormRef = useRef()
  
  useEffect(() => {
    const userString = window.localStorage.getItem('userLoginBlogApp')
    
    if (userString) {
      const savedUser = JSON.parse(userString)
      userDispatch({ type: 'updateUser' ,payload:savedUser})
      blogService.setToken(savedUser.token)
      notificationDispatch({ type: 'updateNotification', payload:'Success! user data loaded'})
    }

    return () => setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
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
      userDispatch({ type: 'updateUser', payload:savedUser })
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'updateNotification', payload: `Successfully logged in as ${savedUser.name}` })

      setTimeout(() => {
        notificationDispatch({ type: 'removeNotification' })
      }, 5000)
    } catch (exception) {
      console.log(exception)
      notificationDispatch({ type: 'updateNotification', payload: 'invalid username or password' })

      setTimeout(() => {
        notificationDispatch({ type: 'removeNotification' })
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

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
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
    notificationDispatch({
      type: 'updateNotification',
      payload: 'post successfully deleted!',
    })
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
    }, 5000)
  }

  const loginForm = () => {
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

  if (user === null) {
    return loginForm()
  }

  const handleLike = async (newObject) => {
    try {
      likeBlogMutation.mutate(newObject)
    } catch (exception) {
      console.log(exception)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {notification ? <p className='message'>{notification}</p> : null}
      <Routes>
        <Route path='/' element={user ? <HomePage /> : loginForm() } />
      </Routes>

      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Toggleable>

      {sortedBlogs.map((blog, index) =>
        <Blog
          key={blog.id}
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
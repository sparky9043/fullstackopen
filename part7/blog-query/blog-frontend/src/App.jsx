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
import LoginForm from './components/LoginForm'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
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
        <Route path='/' element={user ? <HomePage /> : <LoginForm /> } />
      </Routes>

      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Toggleable>

      {/* {sortedBlogs.map((blog, index) =>
        <Blog
          key={blog.id}
          blog={blog} 
          likePost={handleLike}
          deletePost={handleDeleteBlog}
          user={user}
        />
      )} */}
    </div>
  )
}

export default App
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

  return (
    <div>
      <h2>blogs</h2>
      <Routes>
        <Route
          path='/'
          element={user ? <HomePage /> : <LoginForm /> }
        />
        <Route
          path='/users'
          element={<p>USERS PAGE</p>}
        />
      </Routes>
    </div>
  )
}

export default App
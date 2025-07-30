import { useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import { useContext } from 'react'
import { NotificationContext } from './contexts/NotificationContext'
import { CurrentUserContext } from './contexts/CurrentUserContext'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import { Navigate, useMatch, Link } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import UserDetail from './components/UserDetail'
import { useQuery } from '@tanstack/react-query'
import BlogDetails from './components/BlogDetails'
import { Container } from '@mui/material'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(CurrentUserContext)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  useEffect(() => {
    const userString = window.localStorage.getItem('userLoginBlogApp')

    if (userString) {
      const savedUser = JSON.parse(userString)
      userDispatch({ type: 'updateUser', payload: savedUser })
      blogService.setToken(savedUser.token)
      notificationDispatch({
        type: 'updateNotification',
        payload: 'Success! user data loaded',
      })
    }

    return () =>
      setTimeout(() => {
        notificationDispatch({ type: 'removeNotification' })
      }, 5000)
  }, [])

  if (usersResult.isLoading) {
    return <p>Waiting to load users...</p>
  }

  if (blogsResult.isLoading) {
    return <div>Waiting to load blogs...</div>
  }

  const blogs = blogsResult.data

  const users = usersResult.data

  const matchedUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchedBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <Container>
      <h2>blogs</h2>
      <Link to="/users">Click to view all users</Link>
      {user && <p>{user.name} logged in</p>}
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate replace to="/" />}
        />
        <Route
          path="/"
          element={
            user ? <HomePage blogs={blogs} /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/blogs/:id" element={<BlogDetails blog={matchedBlog} />} />
        <Route path="/users" element={<UsersPage users={users} />} />
        <Route path="/users/:id" element={<UserDetail user={matchedUser} />} />
      </Routes>
    </Container>
  )
}

export default App

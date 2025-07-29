import { useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import { useContext } from 'react'
import { NotificationContext } from './contexts/NotificationContext'
import { CurrentUserContext } from './contexts/CurrentUserContext'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import { Navigate, useMatch } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import UserDetail from './components/UserDetail'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(CurrentUserContext)
  const match = useMatch('/users/:id')
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers
  })

  useEffect(() => {
    const userString = window.localStorage.getItem('userLoginBlogApp')
    
    if (userString) {
      const savedUser = JSON.parse(userString)
      userDispatch({ type: 'updateUser', payload:savedUser})
      blogService.setToken(savedUser.token)
      notificationDispatch({ type: 'updateNotification', payload:'Success! user data loaded'})
    }

    return () => setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
    }, 5000)
  }, [])

  if ( result.isLoading ) {
    return (
      <p>Waiting to load users...</p>
    )
  }

  const users = result.data

  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <h2>blogs</h2>
      {user && <p>{user.name} logged in</p>}
      <Routes>
        <Route
          path='/login'
          element={!user ? <LoginForm /> : <Navigate replace to='/' />}
        />
        <Route
          path='/'
          element={user ? <HomePage /> : <Navigate replace to='/login' /> }
        />
        <Route
          path='/users'
          element={<UsersPage users={users} />}
        />
        <Route
          path='/users/:id'
          element={<UserDetail user={matchedUser} />}
        />
      </Routes>
    </div>
  )
}

export default App
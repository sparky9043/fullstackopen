import { useEffect } from 'react'
import blogService from './services/blogs'
import { useContext } from 'react'
import { NotificationContext } from './contexts/NotificationContext'
import { CurrentUserContext } from './contexts/CurrentUserContext'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import { Navigate } from 'react-router-dom'
import UsersPage from './components/UsersPage'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(CurrentUserContext)

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
          element={<UsersPage />}
        />
      </Routes>
    </div>
  )
}

export default App
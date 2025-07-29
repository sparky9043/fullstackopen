import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { NotificationContext } from '../contexts/NotificationContext'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const LoginForm = () => {
  const [user, userDispatch] = useContext(CurrentUserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, notificationDispatch] = useContext(NotificationContext)

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

export default LoginForm
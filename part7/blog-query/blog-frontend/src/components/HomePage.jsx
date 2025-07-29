import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const HomePage = () => {
  const [user, userDispatch] = useContext(CurrentUserContext)

  const handleLogout = () => {
    console.log('logged out successfully')
    window.localStorage.removeItem('userLoginBlogApp')
    userDispatch({ type: 'removeUser' })
    notificationDispatch({ type: 'updateNotification', payload: 'logged out successfully' })
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
    }, 5000)
  }
  return (
    <div>
      <p>This is the homepage!</p>
      <div>
        {user.name} logged in
        <span>
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>
    </div>

  )
}

export default HomePage
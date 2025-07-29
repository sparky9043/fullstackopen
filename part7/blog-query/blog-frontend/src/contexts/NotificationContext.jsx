import { useReducer } from 'react'
import { createContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'updateNotification':
      return action.payload
    case 'removeNotification':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

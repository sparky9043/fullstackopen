/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'updateMessage':
      return action.payload
    case 'removeMessage':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
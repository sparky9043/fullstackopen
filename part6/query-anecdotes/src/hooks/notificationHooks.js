import { useContext } from 'react'
import NotificationContext from '../../NotificationContext'

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext)

  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)

  return notificationAndDispatch[1]
}
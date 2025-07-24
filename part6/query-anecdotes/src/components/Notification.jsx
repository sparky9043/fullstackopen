import { useNotificationMessage } from '../hooks/notificationHooks'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationMessage = useNotificationMessage()
  
  if (!notificationMessage) return null

  return (
    <div style={style}>
      <p>Hello</p>
    </div>
  )
}

export default Notification

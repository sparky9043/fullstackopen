import { useState } from 'react'

export const useField = (type, name = null, defaultText = '') => {
  const [value, setValue] = useState(defaultText)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    name,
    value,
    onChange,
  }
}

export const useNotification = (messageDuration) => {
  // message duration in seconds

  const [notification, setNotification] = useState(null)

  const updateNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, messageDuration * 1000)
  }

  return {
    notification,
    updateNotification
  }
}
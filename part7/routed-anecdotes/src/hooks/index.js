import { useState } from 'react'

export const useField = (type, defaultText = '') => {
  const [value, setValue] = useState(defaultText)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
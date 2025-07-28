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
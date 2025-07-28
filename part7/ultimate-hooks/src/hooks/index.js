import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => setResources(res.data))
      .catch(error => console.log(error.message))
  }, [baseUrl])

  // const create = (resource) => {

  // }

  // const service = {
  //   create
  // }

  return [
    resources
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
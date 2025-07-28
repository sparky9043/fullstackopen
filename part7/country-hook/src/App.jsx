import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import { useField } from './hooks'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {})

  return country
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
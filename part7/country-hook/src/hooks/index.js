import { useEffect, useState } from 'react'
import countriesService from '../services/countries'

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return
    countriesService.getCountry(name)
      .then(data => {
        const country = {
          name: data.name.common,
          capital: data.capital.at(0),
          population: data.population,
          flag: data.flags.svg,
          found: true,
        }
        setCountry(country)
      })
      .catch(error => {
        console.log('Error: ',error.message)
        setCountry(null)
      })
  }, [name])

  return country
}
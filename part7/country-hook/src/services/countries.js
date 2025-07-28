import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getCountry = async (countryName) => {
  if (!countryName) return

  const response = await axios.get(`${baseUrl}/${countryName}`)

  return response.data
}

export default { getCountry }
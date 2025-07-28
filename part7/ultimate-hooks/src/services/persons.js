import axios from 'axios'

const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
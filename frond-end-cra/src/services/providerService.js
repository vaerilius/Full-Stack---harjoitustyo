import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_URL + '/api/users'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const getConfig = () => ({
  headers: { Authorization: token }
})

const signUpProvider = async newUser => {
  const response = await axios.post(`${baseUrl}/providers`, newUser)
  return response.data
}
const getAllProviders = async () => {
  const response = await axios.get(`${baseUrl}/providers`)

  return response.data
}
const updateProviderProfile = async data => {
  const response = await axios.put(
    `${baseUrl}/providers/${data.id}`,
    data,
    getConfig()
  )
  return response.data
}
export default {
  signUpProvider,
  getAllProviders,
  updateProviderProfile,
  setToken,
  destroyToken,
  getConfig
}

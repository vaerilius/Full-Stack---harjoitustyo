import axios from 'axios'
const baseUrl = `${ BACKEND_URL }/api/users/`

const signUpProvider = async (newUser) => {
  const response = await axios.post(`${baseUrl}/provider`, newUser)
  return response.data
}
const getAllProviders = async () => {
  const response = await axios.get(`${baseUrl}/providers`)

  return response.data
}
export default {
  signUpProvider,
  getAllProviders
}
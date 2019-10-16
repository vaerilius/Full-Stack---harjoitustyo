import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/users`

const signUpUser = async (newUser) => {
    const response = await axios.post(baseUrl, newUser) 
    return response.data
}
const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default {
  signUpUser,
  getAllUsers
}
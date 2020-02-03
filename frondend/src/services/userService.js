import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/login`

const loginUser = async loginData => {
  const response = await axios.post(baseUrl, loginData)
  return response.data
}

export default { loginUser }

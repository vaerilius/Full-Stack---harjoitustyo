import axios from 'axios'
const baseUrl = `${ BACKEND_URL }/api/users/`

const signUpCandidate = async (newUser) => {
  const response = await axios.post(`${baseUrl}/candidate`, newUser)
  return response.data
}
const getAllCandidates = async () => {
  const response = await axios.get(`${baseUrl}/candidates`)

  return response.data
}

export default {
  signUpCandidate,
  getAllCandidates
}
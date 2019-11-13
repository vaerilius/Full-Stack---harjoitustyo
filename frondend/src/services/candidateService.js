import axios from 'axios'
const baseUrl = `${ BACKEND_URL }/api/candidates`

const signUpCandidate = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}
const getAllCandidates = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default {
  signUpCandidate,
  getAllCandidates
}
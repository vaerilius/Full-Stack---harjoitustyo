import axios from 'axios'
const baseUrl = `${ BACKEND_URL }/api/users`

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


const signUpCandidate = async (newUser) => {
  const response = await axios.post(`${baseUrl}/candidates`, newUser)
  return response.data
}
const getAllCandidates = async () => {
  const response = await axios.get(`${baseUrl}/candidates`)

  return response.data
}
const updateCandidateProfile = async (data) => {
  const response = await axios.put(`${baseUrl}/candidates/${data.id}`, data, getConfig())
  return response.data
}
const uploadCV = async (formData, id) => {
  const response = await axios.post(`${baseUrl}/candidates/${id}/cv`, formData, getConfig())
  return response.data
}

export default {
  signUpCandidate,
  getAllCandidates,
  updateCandidateProfile,
  setToken,
  destroyToken,
  getConfig,
  uploadCV
}
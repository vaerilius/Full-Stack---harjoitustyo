import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/jobs`
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
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNewJob = async (newJob) => {
  const response = await axios.post(baseUrl, newJob, getConfig())
  return response.data
}
const pushCandidate = async (userId, jobID) => {
  const response = await axios.post(`${baseUrl}/${jobID}/candidates`, userId, getConfig())
  return response.data
}
const handleRemoveJobAdversement = async (jobID) => {
  const response = await axios.delete(`${baseUrl}/${jobID}`, getConfig())
  return response.data
}
const handleUpdatedJob = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.jobID}`, data, getConfig())
  return response.data
}
const addQuestion = async (data) => {
  const response = await axios.post(`${baseUrl}/${data.jobID}/questions`)

  return response.data
}
export default {
  getAll,
  createNewJob,
  setToken,
  destroyToken,
  pushCandidate,
  handleRemoveJobAdversement,
  handleUpdatedJob,
  addQuestion
}
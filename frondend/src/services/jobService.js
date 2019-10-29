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
const pushCandidate = async ( userId, blogID) => {
  const response = await axios.post(`${baseUrl}/${blogID}/candidates`, userId, getConfig())
  console.log(response);
  return response.data
}

export default {
  getAll,
  createNewJob,
  setToken,
  destroyToken,
  pushCandidate
}
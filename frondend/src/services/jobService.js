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
const addJob = async (newJob) => {
    const response = await axios.post(baseUrl, newJob, getConfig) 
    return response.data
}


export default {
  getAll,
  addJob,
  setToken,
  destroyToken
}
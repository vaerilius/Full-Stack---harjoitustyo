import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/jobs`

const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWEiLCJpZCI6IjVkYTA0NzUyZTc4NWE0MzM3Y2IzMTNjOSIsImlhdCI6MTU3MDc4NTIxN30.zXwIl6cdEod3eDk1p4tCxYKIJvZpnj0NDI47DvGzNdM'

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
  addJob
}
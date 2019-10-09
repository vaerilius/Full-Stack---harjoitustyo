import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/jobs`


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


export default {
  getAll,

}
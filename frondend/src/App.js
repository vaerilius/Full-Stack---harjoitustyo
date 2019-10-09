import React, { useState, useEffect } from 'react'
import Landing from './components/landing'
import Navbar from './components/navbar/navbar'
import Jobs from './components/jobs/jobs'

// const useUsers = (url) => {
//   const [users, setUsers] = useState([])
//   useEffect(() => {
//     axios.get(`${url}/api/users`).then(response => {
//       setUsers(response.data)
//     })
//   }, [url])
//   return users
// }

const App = () => {
  // const users = useUsers(BACKEND_URL)
  // console.log(users)

  return (
    <div>
      <Navbar />
      <div className="container mx-auto ">
        <Landing />
        <Jobs />
      </div>

    </div>

  )
}

export default App
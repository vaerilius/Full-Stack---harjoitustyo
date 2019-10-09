import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useUsers = (url) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get(`${url}/api/users`).then(response => {
      setUsers(response.data)
    })
  }, [url])
  return users
}

const App = () => {

  const users = useUsers(BACKEND_URL)

  return (
    <div>
      hello Job Book
      {users.map(p =>
        <div key={p.name}>
          <p >{ p.name }</p>
        </div>

      )}
    </div>
  )
}

export default App
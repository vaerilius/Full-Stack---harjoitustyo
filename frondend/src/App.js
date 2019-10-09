import React, { useState, useEffect } from 'react'
import axios from 'axios'

const usePersons = (url) => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setPersons(response.data)
    })
  }, [url])
  return persons
}

const App = () => {

  const persons = usePersons(BACKEND_URL)

  return (
    <div>
      hello Job Book
      {persons.map(p =>
        <div key={p.name}>
          <p >{ p.name }</p>
          <p >{ p.status }</p>
          {p.skills.map(s => 
              <p key={s}>{ s }</p>
            )}
        </div>

      )}
    </div>
  )
}

export default App
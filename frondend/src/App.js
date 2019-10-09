import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Landing from './components/landing'
import Navbar from './components/navbar/navbar'
import Jobs from './components/jobs/jobs'
import { initializeJobs } from './reducers/jobReducer'
// const useUsers = (url) => {
//   const [users, setUsers] = useState([])
//   useEffect(() => {
//     axios.get(`${url}/api/users`).then(response => {
//       setUsers(response.data)
//     })
//   }, [url])
//   return users
// }

const App = (props) => {

  useEffect(() => {
    props.initializeJobs()

  }, [])

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
const mapStateToProps = state => {
  console.log(state)
  return {
    jobs: state.jobs,

  }
}


export default connect(mapStateToProps,{
  initializeJobs
})(App)
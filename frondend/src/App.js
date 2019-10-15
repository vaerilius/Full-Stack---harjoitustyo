import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Landing from './components/landing'
import SignUp from './components/auth/signup'

import Navbar from './components/navbar/navbar'
import Jobs from './components/jobs/jobs'
import Job from './components/jobs/job/job'

import { initializeJobs } from './reducers/jobReducer'
import { initializeUsers } from './reducers/usersReducer'


import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
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
    props.initializeUsers()

  }, [])

  const jobById = (id) => props.jobs.find(job => job.id = id)

  if (!props.jobs) {
    return (
      <div>loading..</div>
    )
  }

  return (
    <div className="bg">
      <Router>
      <Navbar />
      <div className="container pt-5 mx-auto ">
        <Route exact path="/" render={() => <Landing />} />
        <Route exact path="/signup" render={() => <SignUp />} />

        <Route exact path="/jobs" render={() => <Jobs />} />
        <Route exact path="/jobs/:id" render={({ match }) =>
          <Job  job={jobById(match.params.id)} /> 
      } />

      </div>
      </Router>


    </div>

  )
}
const mapStateToProps = state => {
  console.log(state)
  return {
    jobs: state.jobs,
    users: state.users

  }
}


export default connect(mapStateToProps,{
  initializeJobs,
  initializeUsers
})(App)
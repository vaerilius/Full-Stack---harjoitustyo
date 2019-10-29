import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Landing from './components/landing'
import SignUp from './components/auth/signup'

import Navbar from './components/navbar/navbar'
import Jobs from './components/jobs/jobs'
import Job from './components/jobs/job/job'
import Login from './components/auth/login'

import { initializeJobs } from './reducers/jobReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeUser } from './reducers/userReducer'

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
    props.initializeUser()
  }, [])

  const jobById = (id) => props.jobs.find(job => job.id === id)

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
          <div className="row">
            <div className=" col-md-12">
              
            <Route exact path="/" render={() => <Landing />} />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route exact path="/login" render={() => <Login />} />
            {props.user ? <Route exact path="/jobs" render={() => <Jobs />} />
            : <Redirect to="/"/>}
            
            
            <Route exact path="/jobs/:id" render={({ match }) =>
              <Job job={jobById(match.params.id)} />
            } />
            </div>
          </div>
        </div>
      </Router>
    </div>

  )
}
const mapStateToProps = state => {
  console.log(state)
  return {
    jobs: state.jobs,
    users: state.users,
    user: state.user

  }
}


export default connect(mapStateToProps, {
  initializeJobs,
  initializeUsers,
  initializeUser,
})(App)
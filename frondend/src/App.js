import React, { useEffect, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import io from '../socket-client'
import { handleJobPolling } from './reducers/jobReducer'
import { handleUsersPolling } from './reducers/candidatesReducer'

import Landing from './components/landing'
import Job from './components/jobs/job/job'

// import Provider from './components/users/providers/provider/provider'
import Candidate from './components/users/candidates/candidate/candidate'

import { initializeUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
const Provider = React.lazy(() =>
  import('./components/users/providers/provider/provider')
)
const Notification = lazy(() => import('./components/notification'))
const Navbar = lazy(() => import('./components/navbar/navbar'))
const SignUp = lazy(() => import('./components/auth/signup'))
const Login = lazy(() => import('./components/auth/login'))

const Jobs = lazy(() => import('./components/jobs/jobs'))
import Candidates from './components/users/candidates/candidates'
// const Candidates = lazy(() =>
//   import('./components/users/candidates/candidates')
// )
const Providers = lazy(() => import('./components/users/providers/providers'))

const App = ({
  user,
  initializeUser,
  handleJobPolling,
  jobs,
  candidates,
  providers
}) => {
  const socket = io.init('http://localhost:3001')

  useEffect(() => {
    initializeUser()
    socket.on('connection', msg => {
      console.log(msg)
    })
  }, [initializeUser])

  useEffect(() => {
    socket.on('jobs', data => {
      handleJobPolling(data)
    })
  }, [handleJobPolling])
  useEffect(() => {
    socket.on('users', data => {
      if (user) {
        if (user.id !== data.updatedUser.id) {
          handleUsersPolling(data)
        }
      }
    })
  }, [handleUsersPolling, user])

  const findById = (id, array) => array.find(item => item.id === id)

  return (
    <div className='bg'>
      <Router>
        <Suspense
          fallback={
            <div className='container'>
              <div className='text-center'>
                <div
                  style={{ width: '4rem', height: '4rem' }}
                  className='spinner-grow bg-transparent'
                  role='status'
                >
                  <h2 className=' text-white'>Loading...</h2>
                </div>
              </div>
            </div>
          }
        >
          <Navbar />
          <Notification />

          <div className='container page'>
            <div className='row'>
              <div className=' col-md-12 margin'>
                {/* {notification.message ? <Notification /> : null} */}
                {!user ? (
                  <Route exact path='/' render={() => <Landing />} />
                ) : (
                  <Redirect to='/jobs' />
                )}
                {!user ? (
                  <Route exact path='/signup' render={() => <SignUp />} />
                ) : (
                  <Redirect to='/jobs' />
                )}

                {!user ? (
                  <Route exact path='/login' render={() => <Login />} />
                ) : (
                  <Redirect to='/jobs' />
                )}
                <Switch>
                  {/* jobs */}
                  {user ? (
                    <Route exact path='/jobs' render={() => <Jobs />} />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {user ? (
                    <Route
                      exact
                      path='/jobs/:id'
                      render={({ match }) => (
                        <Job job={findById(match.params.id, jobs)} />
                      )}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {/* candidates */}
                  {user ? (
                    <Route
                      exact
                      path='/candidates'
                      render={() => <Candidates />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {user ? (
                    <Route
                      exact
                      path='/candidates/:id'
                      render={({ match }) => (
                        <Candidate
                          candidate={findById(match.params.id, candidates)}
                        />
                      )}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {/* providers */}
                  {user ? (
                    <Route
                      exact
                      path='/providers'
                      render={() => <Providers />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {user ? (
                    <Route
                      exact
                      path='/providers/:id'
                      render={({ match }) => (
                        <Provider
                          provider={findById(match.params.id, providers)}
                        />
                      )}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                </Switch>
                {/* <Switch>
                  <Route path='/:id' component={WaitingComponent(Post)} />
                </Switch> */}
              </div>
            </div>
          </div>
        </Suspense>
      </Router>
    </div>
  )
}
const mapStateToProps = state => {
  console.log(state)
  return {
    jobs: state.jobs,
    candidates: state.candidates,
    providers: state.providers,
    user: state.user,
    notification: state.notification
  }
}

export default connect(mapStateToProps, {
  initializeUser,
  handleJobPolling,
  handleUsersPolling
})(App)

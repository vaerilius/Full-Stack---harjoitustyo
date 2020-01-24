import React, { useEffect, Suspense, lazy } from 'react'
import { connect } from 'react-redux'

import Landing from './components/landing'
import SignUp from './components/auth/signup'
import Navbar from './components/navbar/navbar'
import Notification from './components/notification'
// import Jobs from './components/jobs/jobs'
import Job from './components/jobs/job/job'
import Login from './components/auth/login'
// import Candidates from './components/users/candidates/candidates'
// import Providers from './components/users/providers/providers'
import Provider from './components/users/providers/provider/provider'

import Candidate from './components/users/candidates/candidate/candidate'

// import { initializeJobs } from './reducers/jobReducer'
import { initializeUser } from './reducers/userReducer'
// import { initializeCandidates } from './reducers/candidatesReducer'
// import { initializeProviders } from './reducers/providersReducer'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
// const Landing = lazy(() => import('./components/landing'))
const Jobs = lazy(() => import('./components/jobs/jobs'))
const Candidates = lazy(() =>
  import('./components/users/candidates/candidates')
)
const Providers = lazy(() => import('./components/users/providers/providers'))

const App = props => {
  useEffect(() => {
    // props.initializeJobs()
    // props.initializeCandidates()
    // props.initializeProviders()
    props.initializeUser()
  }, [])
  const jobById = id => props.jobs.find(job => job.id === id)
  const candidateById = id => props.candidates.find(c => c.id === id)
  const providerById = id => props.providers.find(p => p.id === id)

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
          <div className='container '>
            <div className='row'>
              <div className=' col-md-12 margin'>
                {props.notification.message ? <Notification /> : null}
                {/* <Route exact path='/' render={() => <Landing />} /> */}
                {!props.user ? (
                  <Route exact path='/' render={() => <Landing />} />
                ) : (
                  <Redirect to='/jobs' />
                )}
                {!props.user ? (
                  <Route exact path='/signup' render={() => <SignUp />} />
                ) : (
                  <Redirect to='/jobs' />
                )}
                {!props.user ? (
                  <Route exact path='/login' render={() => <Login />} />
                ) : (
                  <Redirect to='/jobs' />
                )}
                <Switch>
                  {/* jobs */}
                  {props.user ? (
                    <Route exact path='/jobs' render={() => <Jobs />} />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {/* candidates */}
                  {props.user ? (
                    <Route
                      exact
                      path='/candidates'
                      render={() => <Candidates />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {/* providers */}
                  {props.user ? (
                    <Route
                      exact
                      path='/providers'
                      render={() => <Providers />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                </Switch>

                {props.user ? (
                  <Route
                    exact
                    path='/jobs/:id'
                    render={({ match }) => (
                      <Job job={jobById(match.params.id)} />
                    )}
                  />
                ) : (
                  <Redirect to='/' />
                )}

                {props.user ? (
                  <Route
                    exact
                    path='/candidates/:id'
                    render={({ match }) => (
                      <Candidate candidate={candidateById(match.params.id)} />
                    )}
                  />
                ) : (
                  <Redirect to='/' />
                )}

                {props.user ? (
                  <Route
                    exact
                    path='/providers/:id'
                    render={({ match }) => (
                      <Provider provider={providerById(match.params.id)} />
                    )}
                  />
                ) : (
                  <Redirect to='/' />
                )}
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
  // initializeJobs,
  // initializeCandidates,
  initializeUser
  // initializeProviders
})(App)

import React, { useEffect, Suspense, lazy } from 'react'
import { connect } from 'react-redux'

import { initializeUser } from './reducers/userReducer'
import { initOnlineUsers } from './reducers/OnlineUserReducer'
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
const Landing = lazy(() => import('./components/landing'))

const Jobs = lazy(() => import('./components/jobs/jobs'))
const Job = lazy(() => import('./components/jobs/job/job'))
import Candidates from './components/users/candidates/candidates'
const Candidate = lazy(() =>
  import('./components/users/candidates/candidate/candidate')
)
const Providers = lazy(() => import('./components/users/providers/providers'))

const OnlineUsers = lazy(() => import('./components/users/onlineUsers'))

import io from './socket-client'
let socket = io.init(BACKEND_URL)

const App = ({ user, initializeUser, initOnlineUsers }) => {
  useEffect(() => {
    initializeUser()
  }, [])

  useEffect(() => {
    if (user && socket) {
      user.socketID = io.getIO().id
      io.getIO().emit('join', user)
      io.getIO().on('init', users => {
        initOnlineUsers(users)
      })
    }

    if (!user) {
      io.getIO().emit('leave', socket.id)
    }
  }, [user, socket])

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
            <div className='row '>
              <div className=' col-md-12 margin'>
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
                      render={({ match }) => <Job id={match.params.id} />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
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
                      render={({ match }) => <Candidate id={match.params.id} />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}

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
                      render={({ match }) => <Provider id={match.params.id} />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                  {user ? (
                    <Route
                      exact
                      path='/online-users'
                      render={() => <OnlineUsers />}
                    />
                  ) : (
                    <Redirect to='/' />
                  )}
                </Switch>
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
    notification: state.notification,
    onlineUsers: state.onlineUsers
  }
}

export default connect(mapStateToProps, {
  initializeUser,
  initOnlineUsers
})(App)

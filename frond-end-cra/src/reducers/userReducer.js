/* eslint-disable indent */
import userService from '../services/userService'
import jobService from '../services/jobService'
import providerService from '../services/providerService'
import candidateService from '../services/candidateService'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.loggedUser
    case 'LOGIN_USER':
      return action.loggedUser
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser) {
      jobService.setToken(loggedUser.token)
      providerService.setToken(loggedUser.token)
      candidateService.setToken(loggedUser.token)
      dispatch({
        type: 'INIT_USER',
        loggedUser
      })
    }
  }
}

export const login = loginData => {
  return async dispatch => {
    try {
      const loggedUser = await userService.loginUser(loginData)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      jobService.setToken(loggedUser.token)
      providerService.setToken(loggedUser.token)
      candidateService.setToken(loggedUser.token)
      console.log(loggedUser)

      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: `user ${loggedUser.username} signed in successfully`
        })
      )
      if (loggedUser) {
        dispatch({
          type: 'LOGIN_USER',
          loggedUser: loggedUser
        })
      }

    } catch (error) {
      console.log(error)
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'invalid username or password'
        })
      )
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    jobService.destroyToken()
    providerService.destroyToken()
    candidateService.destroyToken()
    dispatch({ type: 'LOGOUT_USER' })
    dispatch(
      setNotification({
        class: 'alert alert-success',
        message: 'user logged out successfully'
      })
    )
  }
}
export default reducer

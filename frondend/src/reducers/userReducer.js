import userService from '../services/userService'
import jobService from '../services/jobService'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return {...action.loggedUser}
    case 'LOGIN_USER':
      return {...action.loggedUser}
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      dispatch({
        type: 'INIT_USER',
        loggedUser
      })
  }
}

export const login = (loginData) => {
  return async dispatch => {
    try {
      const loggedUser = await userService.loginUser(loginData)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      jobService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN_USER',
        loggedUser
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const logout = () => {
  return async dispatch => {
      window.localStorage.removeItem('loggedUser')
      jobService.destroyToken()
      dispatch({ type: 'LOGOUT_USER' })
  }
}
export default reducer
import usersService from '../services/usersService'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return [...action.users]
    case 'ADD_USER':
      return [...state, action.newUser]
    default:
      return state
  }
}
export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export const signUp = (data) => {
  return async dispatch => {
    try {
      const newUser = await usersService.signUpUser(data)
      dispatch({
        type: 'ADD_USER',
        newUser
      })
      dispatch(setNotification(
        {
          class: 'alert alert-success',
          message: `user: ${newUser.username} signed Up successfully`
        }
      ))
    } catch (error) {
      dispatch(setNotification(
        {
          class: 'alert alert-danger',
          message: 'ValidationError: username to be unique'
        }
      ))
    }
  }
}
export default reducer
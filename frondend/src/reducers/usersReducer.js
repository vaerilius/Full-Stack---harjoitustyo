import usersService from '../services/usersService'

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
    } catch (error) {
      console.log(error)
    }
  }
}
export default reducer
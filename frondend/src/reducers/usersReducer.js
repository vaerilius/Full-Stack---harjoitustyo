import userService from '../services/usersService'

const reducer = (state = null, action) => {
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
      const users = await userService.getAllUsers()
      dispatch({
        type: 'INIT_USERS',
        users
      })
     
  }
}

export const signUp = (data) => {
  return async dispatch => {
    try {
      const newUser = userService.signUpUser(data)
      console.log(newUser)
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
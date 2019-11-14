import providerservice from '../services/providerService '
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PROVIDERS':
      return [...action.providers]
    case 'SIGNUP_CANDIDATE':
      return [...state, action.createdProvider]  
    default:
      return [...state]
  }
}

export const initializeProviders = () => {
  return async dispatch => {
    const providers = await providerservice.getAllProviders()
    dispatch({
      type: 'INIT_PROVIDERS',
      providers
    })
  }
}
export const onSignUpProvider = (data) => {
  return async dispatch => {
    try {
      const createdProvider = await providerservice.signUpProvider(data)
      dispatch({
        type: 'SIGNUP_CANDIDATE',
        createdProvider
      })
      dispatch(setNotification(
        {
          class: 'alert alert-success',
          message: `user: ${createdProvider.username} signed Up successfully`
        }
      ))
    } catch (error) {
      dispatch(setNotification(
        {
          class: 'alert alert-danger',
          message: 'ValidationError'
        }
      ))
    }
  }
}

export default reducer
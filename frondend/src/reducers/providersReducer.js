import providerservice from '../services/providerService'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PROVIDERS':
      return [...action.providers]
    case 'SIGNUP_PROVIDER':
      return [...state, action.createdProvider]
    case 'UPDATE_PROVIDER':
      return [...state]
      .map(p => p.id === action.updatedProvider.id ? action.updatedProvider : p)
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
        type: 'SIGNUP_PROVIDER',
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

export const updateProfile = (data) => {
  return async dispatch => {
    // console.log(data)
    try {
      const updatedProvider = await providerservice.updateProviderProfile(data)
      console.log(updatedProvider)

      dispatch({
        type: 'UPDATE_PROVIDER',
        updatedProvider
      })
    } catch (error) {
      console.log(error.message)
    }
  } 
}

export default reducer
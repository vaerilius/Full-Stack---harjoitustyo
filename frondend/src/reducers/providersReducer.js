/* eslint-disable indent */
import providerservice from '../services/providerService'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PROVIDERS':
      return [...action.providers]
    case 'GET_PROVIDER':
      if (state.find(p => p.id === action.provider.id)) {
        return [...state]
      }
      return [...state, action.provider]
    case 'SIGNUP_PROVIDER':
      return [...state, action.createdProvider]
    case 'UPDATE_PROVIDER':
      return [...state].map(p =>
        p.id === action.updatedProvider.id ? action.updatedProvider : p
      )
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
export const getProvider = id => {
  return async dispatch => {
    const provider = await providerservice.getProviderByID(id)
    dispatch({
      type: 'GET_PROVIDER',
      provider
    })
  }
}
export const onSignUpProvider = data => {
  return async dispatch => {
    try {
      const createdProvider = await providerservice.signUpProvider(data)
      dispatch({
        type: 'SIGNUP_PROVIDER',
        createdProvider
      })
      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: `user: ${createdProvider.username} signed Up successfully`
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'ValidationError'
        })
      )
    }
  }
}

export const updateProvider = data => {
  return async dispatch => {
    try {
      const updatedProvider = await providerservice.updateProviderProfile(data)

      dispatch({
        type: 'UPDATE_PROVIDER',
        updatedProvider
      })
      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: `user: ${updatedProvider.username} updated successfully`
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'ValidationError'
        })
      )
    }
  }
}
export const handleUsersPolling = data => {
  return async dispatch => {
    await dispatch({
      type: data.action,
      updatedProvider: data.payload
    })
  }
}

export default reducer

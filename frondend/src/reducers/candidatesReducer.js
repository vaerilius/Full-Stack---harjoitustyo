import candidateService from '../services/candidateService'
import { setNotification } from './notificationReducer'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CANDIDATES':
      return [...action.candidates]
    case 'SIGNUP_CANDIDATE':
      return [...state, action.createdCandidate]
    case 'UPDATE_CANDIDATE':
      return [...state]
        .map(p => p.id === action.updatedCandidate.id ? action.updatedCandidate : p)
    default:
      return [...state]
  }
}

export const initializeCandidates = () => {
  return async dispatch => {
    const candidates = await candidateService.getAllCandidates()
    dispatch({
      type: 'INIT_CANDIDATES',
      candidates
    })
  }
}
export const signUpCandidate = (data) => {
  return async dispatch => {
    try {
      const createdCandidate = await candidateService.signUpCandidate(data)
      dispatch({
        type: 'SIGNUP_CANDIDATE',
        createdCandidate
      })
      dispatch(setNotification(
        {
          class: 'alert alert-success',
          message: `user: ${createdCandidate.username} signed Up successfully`
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
export const updateCandidate = (data) => {
  return async dispatch => {
    try {
      const updatedCandidate = await candidateService.updateCandidateProfile(data)
      console.log(updatedCandidate)

      dispatch({
        type: 'UPDATE_CANDIDATE',
        updatedCandidate
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default reducer
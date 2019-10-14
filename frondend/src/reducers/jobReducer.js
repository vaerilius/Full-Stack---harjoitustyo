import jobService from '../services/jobService'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_JOBS':
      return [...action.jobs]
    default:
      return state
  }
}

export const initializeJobs = () => {
  return async dispatch => {
    try {
    const jobs = await jobService.getAll()
    dispatch({
      type: 'INIT_JOBS',
      jobs
    })
      
    } catch (error) {
      console.log(error.message)
    }

  }
}

export default reducer
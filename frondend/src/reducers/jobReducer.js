import jobService from '../services/jobService'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_JOBS':
      return [...action.jobs]
    case 'CREATE_JOB':
      return [...state, action.newJob]
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
export const addNewJob = (inputData) => {
  return async dispatch => {
    try {
      const newJob = await jobService.createNewJob(inputData)
      dispatch({
        type: 'CREATE_JOB',
        newJob
      })

    } catch (error) {
      console.log(error.message)
    }

  }
}


export default reducer
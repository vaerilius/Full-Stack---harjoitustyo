import jobService from '../services/jobService'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_JOBS':
      return [...action.jobs]
    case 'CREATE_JOB':
      return [...state, action.newJob]
    case 'ADD_CANDIDATE':
      return [...state]
        .map(job => job.id === action.updatedJob.id
          ? action.updatedJob : job)
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

export const addCandidate = (userID, jobID) => {
  return async dispatch => {
    try {

      const updatedJob = await jobService.pushCandidate({
        candidateID: userID
      }, jobID)

      dispatch({
        type: 'ADD_CANDIDATE',
        updatedJob
      })
    } catch (error) {
      console.error(error.message)
    }
  }
}


export default reducer
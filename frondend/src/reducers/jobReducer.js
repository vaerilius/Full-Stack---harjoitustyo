import jobService from '../services/jobService'
import { setNotification } from './notificationReducer'

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
    case 'REMOVE_JOB':
      return [...state].filter(job => job.id !== action.jobID)
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
      dispatch(setNotification({
        class: 'alert alert-danger',
        message: error.message
      }))
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
      dispatch(setNotification({
        class: 'alert alert-success',
        message: `Job ${newJob.title} added to job list`
      }))

    } catch (error) {
      dispatch(setNotification({
        class: 'alert alert-danger',
        message: 'Something went wrong, try again please!'
      }))
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
      dispatch(setNotification({
        class: 'alert alert-success',
        message: 'Now you are candidate of this job, good luck'
      }))
    } catch (error) {
      dispatch(setNotification({
        class: 'alert alert-danger',
        message: 'Something went wrong!'
      }))
    }
  }
}

export const removeJobAdversement = (jobID) => {
  return async dispatch => {
    try {
      await jobService.handleRemoveJobAdversement(jobID)
      dispatch({
        type: 'REMOVE_JOB',
        jobID
      })
      dispatch(setNotification({
        class: 'alert alert-success',
        message: 'Job has been removed from job list'
      }))

    } catch (error) {
      console.error(error.message)
      dispatch(setNotification({
        class: 'alert alert-danger',
        message: 'Job has been removed already'
      }))
    }
  }
}


export default reducer
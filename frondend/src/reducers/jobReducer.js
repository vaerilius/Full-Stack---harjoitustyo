import jobService from '../services/jobService'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_JOBS':
      return [...action.jobs]
    case 'CREATE_JOB':
      if (state.find(j => j.id === action.object.id)) {
        return [...state]
      }
      return [...state, action.object]
    case 'ADD_CANDIDATE':
      return [...state].map(job =>
        job.id === action.object.id ? action.object : job
      )
    case 'REMOVE_JOB':
      return [...state].filter(job => job.id !== action.object)
    case 'UPDATE_JOB':
      return [...state].map(job =>
        job.id === action.object.id ? action.object : job
      )
    // case 'ADD_QUESTION':
    //   return [...state]
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
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: error.message
        })
      )
    }
  }
}
export const addNewJob = inputData => {
  return async dispatch => {
    try {
      const newJob = await jobService.createNewJob(inputData)

      dispatch({
        type: 'CREATE_JOB',
        object: newJob
      })
      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: `Job ${newJob.title} added to job list`
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'Something went wrong, try again please!'
        })
      )
    }
  }
}

export const addCandidate = (userID, jobID) => {
  return async dispatch => {
    try {
      const updatedJob = await jobService.pushCandidate(
        {
          candidateID: userID
        },
        jobID
      )

      dispatch({
        type: 'ADD_CANDIDATE',
        object: updatedJob
      })
      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: 'Now you are candidate of this job, good luck'
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'Something went wrong!'
        })
      )
    }
  }
}

export const removeJobAdversement = jobID => {
  return async dispatch => {
    try {
      await jobService.handleRemoveJobAdversement(jobID)
      dispatch({
        type: 'REMOVE_JOB',
        object: jobID
      })
      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: 'Job has been removed from job list'
        })
      )
    } catch (error) {
      console.error(error.message)
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'Job has been removed already'
        })
      )
    }
  }
}
export const onUpdateJob = data => {
  return async dispatch => {
    try {
      const updatedJob = await jobService.handleUpdatedJob(data)

      dispatch({
        type: 'UPDATE_JOB',
        object: updatedJob
      })
      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: 'Job has been updated succefully'
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'Something went wrong'
        })
      )
    }
  }
}
export const handleSendMessage = data => {
  return async dispatch => {
    try {
      // console.log(data)
      const updatedJob = await jobService.addQuestion(data)
      // console.log(updatedJob)
      dispatch({
        type: 'UPDATE_JOB',
        object: updatedJob
      })
      dispatch(
        setNotification({
          class: 'alert alert-success',
          message: 'The question has been sended succefully'
        })
      )
    } catch (error) {
      // console.log(error)
      dispatch(
        setNotification({
          class: 'alert alert-danger',
          message: 'Something went wrong'
        })
      )
    }
  }
}
export const handleJobPolling = data => {
  return async dispatch => {
    dispatch({
      type: data.action,
      object: data.object
    })
  }
}

export default reducer

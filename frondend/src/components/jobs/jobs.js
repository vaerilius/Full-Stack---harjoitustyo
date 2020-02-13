import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import JobListItem from './jobListItem'
import AddNewJob from './addNewJob'
import Togglable from '../togglable'
import { Animation } from '../../hooks/animation'
import io from '../../../socket-client'

import { initializeJobs, handleJobPolling } from '../../reducers/jobReducer'
import { initializeProviders } from '../../reducers/providersReducer'
import { initializeCandidates } from '../../reducers/candidatesReducer'

const Jobs = ({ user, jobs, initializeJobs, handleJobPolling }) => {
  useEffect(() => {
    initializeJobs()
  }, [])

  useEffect(() => {
    io.getIO().on('jobs', data => {
      handleJobPolling(data)
    })
  }, [handleJobPolling])

  Animation()

  const newJobRef = React.createRef()
  return (
    <div className='container '>
      <div className='card shadow mb-4'>
        <div className='card-body text-center'>
          <h2 className='display-5 font-weight-bold '>Jobs</h2>
        </div>
      </div>
      {user.jobProvider ? (
        <Togglable buttonLabel='Create new job advertisement' ref={newJobRef}>
          <AddNewJob newJobRef={newJobRef} />
        </Togglable>
      ) : null}

      <div className='list-group'>
        {jobs.map(job => (
          <JobListItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs,
    user: state.user
  }
}

export default connect(mapStateToProps, {
  initializeJobs,
  initializeProviders,
  initializeCandidates,
  handleJobPolling
})(Jobs)

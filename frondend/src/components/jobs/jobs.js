import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import JobListItem from './jobListItem'
import AddNewJob from './addNewJob'
import Togglable from '../togglable'
import { Animation } from '../../hooks/animation'
import io from '../../../socket-client'
import {
  addUserToOnline,
  initOnlineUsers
} from '../../reducers/OnlineUserReducer'
import { initializeJobs, handleJobPolling } from '../../reducers/jobReducer'
import { initializeProviders } from '../../reducers/providersReducer'
import { initializeCandidates } from '../../reducers/candidatesReducer'

const Jobs = ({
  user,
  jobs,
  initializeJobs,
  handleJobPolling,
  addUserToOnline,
  initOnlineUsers
}) => {
  useEffect(() => {
    initializeJobs()
  }, [])

  useEffect(() => {
    io.getIO().on('jobs', data => {
      handleJobPolling(data)
    })
  }, [handleJobPolling])

  useEffect(() => {
    io.getIO().on('init', clients => {
      initOnlineUsers(clients)
    })
  }, [initOnlineUsers])

  // useEffect(() => {
  //   io.getIO().on('userConnected', id => {
  //     addUserToOnline(id)
  //   })

  // io.emit('connected', id)
  // io.getIO().on('userConnected', data => {
  //   console.log(data)
  // })
  // }, [addUserToOnline])

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
  handleJobPolling,
  addUserToOnline,
  initOnlineUsers
})(Jobs)

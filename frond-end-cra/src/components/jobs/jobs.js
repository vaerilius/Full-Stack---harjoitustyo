import React from 'react'
import { connect } from 'react-redux'
import JobListItem from './jobListItem'
import AddNewJob from './addNewJob'
import Togglable from '../togglable'

const Jobs = (props) => {

  if (!props.jobs) {
    return (
      <div>loading..</div>
    )
  }
  const newJobRef = React.createRef()

  return (
    <div className="container">
      <div className="card shadow mb-5">
        <div className="card-body text-center">
          <h2 className="display-5 font-weight-bold">Jobs</h2>
        </div>
      </div>
      {props.user.jobProvider
        ? <Togglable
          buttonLabel='Create new job advertisement'
          ref={newJobRef}>
          <AddNewJob newJobRef={newJobRef} />
        </Togglable>
        : null
      }

      <div className="list-group">
        {props.jobs.map(job =>
          <JobListItem key={job.id} job={job} />
        )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Jobs)
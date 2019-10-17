import React from 'react'
import { connect } from 'react-redux'
import Job from './jobListItem'
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
      <Togglable
      buttonLabel='Create new job advertisement'
      ref={newJobRef}>
      <AddNewJob newJobRef={newJobRef}/>
      </Togglable>
      <div className="list-group">
        {props.jobs.map(job =>
            <Job key={job.id} job={job} />
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs)
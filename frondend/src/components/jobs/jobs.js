import React from 'react'
import { connect } from 'react-redux'
import Job from './jobListItem'

const Jobs = (props) => {

  return (
<div className="container">
<ul className="list-group">
    {
      props.jobs.map(job =>
        <Job key={job.id} job={job} />
        )
    }
</ul>
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
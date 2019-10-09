import React from 'react'
import { connect } from 'react-redux'
import Job from './job/job'

const Jobs = (props) => {

  return (
<div className="container">
<ul className="list-group">
    <Job />

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
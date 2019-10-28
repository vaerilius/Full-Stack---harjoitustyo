import React, { useState } from 'react'
import { connect } from 'react-redux'

const Job = ({ job, user }) => {

  if (!job) {
    return (
      <div>loading..</div>
    )
  }

  const [lastchange, setlastChange] = useState(job.updatedAt)
  const [createdAt, setCreatedAt] = useState(job.createdAt)
  console.log(job)
  return (

    <div className="card">
      <div className="card-header">
        Job advertisement
      </div>

      <img className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">{job.description}</p>
      </div>
      <ul className="list-group list-group-flush">

        {job.candidates
        .map(c =>
          <li key={c} className="list-group-item">{c}</li>

        )}
      </ul>
      <div className="card-body">
      <button type="button" className="btn btn-success btn-md btn-block">Add me!</button>
      <button type="button" className="btn btn-danger btn-md btn-block">Remove Job</button>
      <button type="button" className="btn btn-primary btn-md btn-block">Add me!</button>
      </div>
      <div className="card-footer text-muted">
        Created at: {createdAt.split('T')[0]}
      </div>
      <div className="card-footer text-muted">
        last update: {lastchange.split('T')[0]}
      </div>
      <button type="button" className="btn btn-primary btn-md btn-block">Back to jobs</button>

    </div>
  )
}
const mapStateToProps = state => {
  return {
    user: state.user,
    jobs: state.jobs
  }
}



export default connect(mapStateToProps)(Job)
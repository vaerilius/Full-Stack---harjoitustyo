import React from 'react'

const Job = ({ job }) => {

  if (!job) {
    return (
      <div>loading..</div>
    )
  }
  return (

<div className="card text-center m-5">
  <div className="card-header">
    { job.title }
  </div>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  <div className="card-footer text-muted">
    2 days ago
  </div>
</div>
  )
}
export default Job
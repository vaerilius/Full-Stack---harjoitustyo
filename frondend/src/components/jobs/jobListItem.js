import React from 'react'
import { Link } from 'react-router-dom'

const JobListItem = ({ job }) => {

  return (
    <div className="list-group mb-2" >
      <div className="list-group-item list-group-item-action">
        <Link to={`/jobs/${job.id}`}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{job.title}</h5>
            <small>3 days ago</small>
          </div>
          <p className="mb-1">{job.company}</p>
          <small>{job.description}</small>
        </Link>
      </div>
    </div>
  )
}

export default JobListItem
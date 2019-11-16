import React from 'react'
import { Link } from 'react-router-dom'

const JobListItem = ({ job }) => {
  const datePalaces = job.createdAt.split('T')
  const JobCreatedAT = datePalaces[0]

  return (
    <div className="list-group mb-4 shadow" >
      <div className="list-group-item list-group-item-action">
        <Link to={`/jobs/${job.id}`}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{job.title}</h5>
            <small> Posted: { JobCreatedAT }</small>
          </div>
          <p className="mb-1">{job.company}</p>
        </Link>
      </div>
    </div>
  )
}

export default JobListItem
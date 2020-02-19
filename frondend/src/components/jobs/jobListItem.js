import React from 'react'
import { Link } from 'react-router-dom'

const JobListItem = ({ job }) => {
  const datePalaces = job.createdAt.split('T')
  const JobCreatedAT = datePalaces[0]
  return (
    <div className='list-group my-3 shadow'>
      <div className='list-group-item list-group-item-action'>
        <Link to={`/jobs/${job.id}`}>
          <div className='d-flex  justify-content-between'>
            <h5 className='mb-1'>{job.title}</h5>
            <p> published: {JobCreatedAT}</p>
          </div>
          <div className='d-flex  justify-content-between'>
            <h5 className='mb-1'>Company: {job.company}</h5>
            <p> Candidates: {job.candidates.length}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default JobListItem

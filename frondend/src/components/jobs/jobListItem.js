import React from 'react'
import { Link } from 'react-router-dom'

const JobListItem = ({ job }) => {

  return (
      <li className="list-group-item mb-3" >
        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
        <p> { job.description } </p>
      
      </li>
  )
}

export default JobListItem
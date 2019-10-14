import React from 'react'
import { Link } from 'react-router-dom'

const JobListItem = ({ job }) => {

  return (
<>
  <li className="list-group-item">
    <Link to={`/jobs/${job.id}` }>{ job.title }</Link>
  
  </li>
</>
  )
}

export default JobListItem
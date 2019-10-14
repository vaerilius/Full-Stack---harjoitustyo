import React from 'react'

const Job = ({ job }) => {

  return (
    <div>
      <h3>{ job.title }</h3>
      <p>{ job.company }</p>
    </div>
  )
}
export default Job
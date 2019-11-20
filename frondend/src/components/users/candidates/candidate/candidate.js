import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Candidate = (props) => {
  if (!props.candidate) {
    return (
      <h2>loading</h2>
    )
  }

  return (
    <div className="card my-auto mx-auto" style={{ maxWidth: '540px' }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={props.candidate.picture} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.candidate.name}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text">
              <small className="text-muted"> Joined: {props.candidate.createdAt.split('T')[0]}</small></p>
          </div>

        </div>
        <div className="col-md-12">
          <h5 className="card-title text-center">The candidate is interested in following jobs</h5>
          {props.candidate.interestingJobs.length > 0
            ?
            <ul className="list-group list-group-flush">
              {props.candidate.interestingJobs.map(jobAd =>
                <li key={jobAd.id} className="list-group-item text-center">
                  <Link to={`/jobs/${jobAd.id}`} >
                    {jobAd.title}
                  </Link>
                </li>
              )}
            </ul>
            : <p className="text-center">The candidate is not interested in any jobs</p>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const candidate = state.candidates.find(c => c.id === ownProps.candidate.id)
  console.log(candidate)

  return {
    candidate: candidate
  }
}
export default connect(mapStateToProps)(Candidate)
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Provider = (props) => {
  if (!props.provider) {
    return (
      <h2>loading</h2>
    )
  }

  return (
    <div className="card my-auto mx-auto" style={{ maxWidth: '540px' }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={props.provider.picture} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.provider.name}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text">
              <small className="text-muted"> Joined: {props.provider.createdAt.split('T')[0]}</small></p>
          </div>

        </div>
        <div className="col-md-12">
        <h5 className="card-title text-center">The candidate is interested in following jobs</h5>
          {props.provider.jobsProvided.length > 0
            ?
            <ul className="list-group list-group-flush">
            {props.provider.jobsProvided.map(jobAd =>
              <li key={jobAd.id} className="list-group-item text-center">
                <Link to={`/jobs/${jobAd.id}`} >
                  {jobAd.title}
                </Link>
              </li>
            )}
          </ul>
            : <p className="text-center">The job provider has no open jobs to available</p>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
const provider = state.providers.find(p => p.id === ownProps.provider.id)

  return {
    provider: provider
  }
}
export default connect(mapStateToProps)(Provider)
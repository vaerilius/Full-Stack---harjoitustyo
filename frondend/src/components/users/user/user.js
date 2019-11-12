import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (props) => {
  if (!props.user) {
    return (
      <h2>loading</h2>
    )
  }

  return (
    <div className="card my-auto mx-auto" style={{ maxWidth: '540px' }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={props.user.picture} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.user.name}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text">
              <small className="text-muted"> Joined: {props.user.createdAt.split('T')[0]}</small></p>
          </div>

        </div>
        <div className="col-md-6">
          {props.user.jobsProvided.length > 0
            ?
            <h5 className="card-title text-center">Jobs provided</h5>
            : null
          }
          <ul className="list-group list-group-flush">
            {props.user.jobsProvided.map(jobAd =>
              <li key={jobAd.id} className="list-group-item text-center">
                <Link to={`/jobs/${jobAd.id}`} >
                  {jobAd.title}

                </Link>
              </li>

            )}
          </ul>
        </div>
        <div className="col-md-6">
          {props.user.interestingJobs.length > 0
            ?
            <h5 className="card-title text-center">Candidate for: </h5>
            :
            <h5 className="card-title text-center">No interesting Jobs</h5>

          }
          <ul className="list-group list-group-flush">
            {props.user.interestingJobs.map(jobAd =>
              <li key={jobAd.id} className="list-group-item text-center">
                <Link to='/jobs/:id' >
                  {jobAd.title}

                </Link>
              </li>

            )}
          </ul>
        </div>


      </div>


    </div>

  )
}

const mapStateToProps = (state, ownProps) => {

  return {
    user: state.users.find(u => u.id === ownProps.user.id)
  }
}
export default connect(mapStateToProps)(User)

// http://localhost:3000/user/5dbfd25254d67745256d6d4f
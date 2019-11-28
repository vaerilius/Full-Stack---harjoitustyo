import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../../../togglable'
import ManageProfile from '../../manageProfile'

const Candidate = (props) => {
  if (!props.candidate) {
    return (
      <h2>loading</h2>
    )
  }
  const manageProfileRef = React.createRef()

  return (
    <div className="card my-auto mx-auto" style={{ maxWidth: '540px' }}>
      <div className="row no-gutters">
        <div className="col-md-12">
          <img src={props.candidate.picture} className="card-img" alt="..." />
        </div>
        <div className="col-md-12">
          <div className="card-body">
            <h5 className="card-title">{props.candidate.name}</h5>
            <p className="card-text">{props.candidate.description}</p>
            <table className="table table-responsive-md-12">
              <thead>
                <tr>
                  <th scope="col">Phone</th>
                  <th scope="col">email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.candidate.phone ? props.candidate.phone : 'Not set'}</td>
                  <td>{props.candidate.email ? props.candidate.email : 'Not set'}</td>
                </tr>
              </tbody>

            </table>
            <div className="card-footer text-muted text-center">
              Joined: {props.candidate.createdAt.split('T')[0]}
            </div>
          </div>
          {props.user.id === props.candidate.id
            ? <Togglable
              buttonLabel='Manage profile'
              ref={manageProfileRef}>
              <ManageProfile manageProfileRef={manageProfileRef} id={props.user.id} />
            </Togglable>
            : null
          }

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
  // console.log(candidate)

  return {
    candidate: candidate,
    user: state.user
  }
}
export default connect(mapStateToProps)(Candidate)
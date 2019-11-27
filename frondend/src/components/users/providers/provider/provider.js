import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../../../togglable'
import ManageProfile from './manageProfile'


const Provider = (props) => {
  if (!props.provider) {
    return (
      <h2>loading</h2>
    )
  }
  const manageProfileRef = React.createRef()


  return (
    <div className="container">
      <div className="card my-auto mx-auto" style={{ maxWidth: '420px' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={props.provider.picture} className="card-img" alt="..." />
          </div>
          <div className="col-md-12">
            <div className="card-body">
              <h5 className="card-title">{props.provider.name}</h5>
              <p className="card-text">This is a wider card with supporting
                  text below as a natural lead-in to additional content. </p>

              <table className="table table-responsive-md-12">
                <thead>
                  <tr>
                    <th scope="col">Phone</th>
                    <th scope="col">email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.provider.phone ? props.provider.phone : 'Not set'}</td>
                    <td>{props.provider.email ? props.provider.email : 'Not set'}</td>
                  </tr>
                </tbody>

              </table>
              {props.user.jobProvider
                ? <Togglable
                  buttonLabel='Manage profile'
                  ref={manageProfileRef}>
                  <ManageProfile manageProfileRef={manageProfileRef} />
                </Togglable>
                : null
              }


              <p className="card-text">
                <small className="text-muted"> Joined: {props.provider.createdAt.split('T')[0]}</small></p>
            </div>

          </div>
          <div className="col-md-12">
            <h5 className="card-title text-center">Jobs provided</h5>
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
    </div>



  )
}

const mapStateToProps = (state, ownProps) => {
  const provider = state.providers.find(p => p.id === ownProps.provider.id)

  return {
    provider: provider,
    user: state.user

  }
}
export default connect(mapStateToProps)(Provider)
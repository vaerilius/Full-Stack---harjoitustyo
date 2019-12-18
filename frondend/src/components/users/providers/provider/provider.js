import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../../../togglable'
import ManageProfile from '../../manageProfile'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { setNotification } from '../../../../reducers/notificationReducer'


const Provider = (props) => {
  if (!props.provider) {
    return (
      <h2>loading</h2>
    )
  }
  const manageProfileRef = React.createRef()

  const copy = (value) => {
    props.setNotification(
      {
        class: 'alert alert-success',
        message: `${value} copied to the clickboard.`
      }
    )
  }

  return (
    <div className="container">
      <div className="card my-auto mx-auto" style={{ maxWidth: '480px' }}>
        <div className="card-header">
         Job provider
        </div>
        <div className="row no-gutters">
          <img src={props.provider.picture} className="card-img-top" alt="..." />
          <div className="col-md-12">
            <div className="card-body">
              <h5 className="card-title">{props.provider.name}</h5>
              <p className="card-text">{props.provider.description} </p>
              <ul className="list-group shadow mb-3">
                <li className="list-group-item">
                  Phone: {props.provider.phone
                    ?
                    <CopyToClipboard text={props.provider.phone}
                      onDoubleClick={() => copy(props.provider.phone)}>
                      <summary className="text-info">{props.provider.phone}</summary>
                    </CopyToClipboard>
                    : 'Not set'}
                </li>
                <li className="list-group-item">
                  Email: {props.provider.email
                    ? <CopyToClipboard text={props.provider.email}
                      onDoubleClick={() => copy(props.provider.email)}>
                      <summary className="text-info">{props.provider.email}</summary>
                    </CopyToClipboard>
                    : 'Not set'}
                </li>
              </ul>

              {props.user.id === props.provider.id
                ? <Togglable
                  buttonLabel='Manage profile'
                  ref={manageProfileRef}>
                  <ManageProfile manageProfileRef={manageProfileRef} id={props.user.id} />
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
export default connect(mapStateToProps, { setNotification })(Provider)
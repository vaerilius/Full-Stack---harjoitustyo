import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../../../togglable'
import ManageProfile from '../../manageProfile'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { setNotification } from '../../../../reducers/notificationReducer'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

{/* <i class="fas fa-file-pdf"></i> */ }
const Candidate = (props) => {
  const [test, setTest] = useState({ value: '', copied: false })

  if (!props.candidate) {
    return (
      <h2>loading</h2>
    )
  }
  const copy = (value) => {
    props.setNotification(
      {
        class: 'alert alert-success',
        message: `${value} copied to the clickboard.`
      }
    )
  }

  const manageProfileRef = React.createRef()
  console.log(test)
  return (
    <div className="card my-auto mx-auto" style={{ maxWidth: '480px' }}>
      <div className="row no-gutters">
        <div className="col-md-12">
          <img src={props.candidate.picture} className="card-img" alt="..." />
        </div>
        <div className="col-md-12">

          <div className="card-body">
            <h5 className="card-title">{props.candidate.name}</h5>
            <p className="card-text">{props.candidate.description}</p>

            <div className="card-body ">
              <ul className="list-group shadow">
                <li className="list-group-item">
                  Phone: {props.candidate.phone
                    ?
                    <CopyToClipboard
                      onDoubleClick={() => copy(props.candidate.phone)}>
                      <summary className="text-info">{props.candidate.phone}</summary>
                    </CopyToClipboard>
                    : 'Not set'}
                </li>
                <li className="list-group-item">
                  Email: {props.candidate.email
                    ? <CopyToClipboard
                      onDoubleClick={() => copy(props.candidate.email)}>
                      <summary className="text-info">{props.candidate.email}</summary>
                    </CopyToClipboard>
                    : 'Not set'}
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <div className="my-auto">Here is my CV: </div>
                    <div className="my-auto">
                      <a href={props.candidate.cv} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          size='2x'
                        />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
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
export default connect(mapStateToProps, { setNotification })(Candidate)
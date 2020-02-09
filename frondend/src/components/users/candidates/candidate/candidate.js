import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../../../togglable'
import ManageProfile from '../../manageProfile'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { setNotification } from '../../../../reducers/notificationReducer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Animation } from '../../../../hooks/animation'
import { getCandidate } from '../../../../reducers/candidatesReducer'

const Candidate = ({ candidate, getCandidate, user, id }) => {
  useEffect(() => {
    if (!candidate) {
      getCandidate(id)
    }
  }, [candidate])
  Animation()

  if (!candidate) {
    return <h2>loading</h2>
  }

  const copy = value => {
    setNotification({
      class: 'alert alert-success',
      message: `${value} copied to the clickboard.`
    })
  }

  const manageProfileRef = React.createRef()
  return (
    <div className='container'>
      <div className='card my-auto mx-auto' style={{ maxWidth: '480px' }}>
        <div className='card-header'>Candidate</div>
        <div className='row no-gutters'>
          <div className='col-md-12'>
            <img src={candidate.picture} className='card-img' alt='...' />
          </div>
          <div className='col-md-12'>
            <div className='card-body'>
              <h5 className='card-title'>{candidate.name}</h5>
              <p className='card-text'>{candidate.description}</p>

              <div className='card-body '>
                <div className='text-nowrap bd-highlight'>
                  Double click to to copy to clickboard.
                </div>
                <ul className='list-group shadow'>
                  <li className='list-group-item'>
                    Phone:{' '}
                    {candidate.phone ? (
                      <CopyToClipboard
                        text={candidate.phone}
                        onDoubleClick={() => copy(candidate.phone)}
                      >
                        <summary className='text-info'>
                          {candidate.phone}
                        </summary>
                      </CopyToClipboard>
                    ) : (
                      'Not set'
                    )}
                  </li>
                  <li className='list-group-item'>
                    Email:{' '}
                    {candidate.email ? (
                      <CopyToClipboard
                        text={candidate.email}
                        onDoubleClick={() => copy(candidate.email)}
                      >
                        <summary className='text-info'>
                          {candidate.email}
                        </summary>
                      </CopyToClipboard>
                    ) : (
                      'Not set'
                    )}
                  </li>
                  <li className='list-group-item'>
                    <div className='d-flex w-100 justify-content-between'>
                      <div className='my-auto'>
                        {candidate.cv ? 'Here is my CV:' : 'No CV'}{' '}
                      </div>
                      <div className='my-auto'>
                        <a
                          href={candidate.cv}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FontAwesomeIcon icon={faFilePdf} size='2x' />
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='card-footer text-muted text-center'>
                Joined: {candidate.createdAt.split('T')[0]}
              </div>
            </div>
            {user.id === candidate.id ? (
              <Togglable buttonLabel='Manage profile' ref={manageProfileRef}>
                <ManageProfile
                  manageProfileRef={manageProfileRef}
                  id={user.id}
                />
              </Togglable>
            ) : null}
          </div>
          <div className='col-md-12'>
            {candidate.interestingJobs.length > 0 ? (
              <ul className='list-group list-group-flush'>
                {candidate.interestingJobs.map(jobAd => (
                  <li key={jobAd.id} className='list-group-item text-center'>
                    <Link to={`/jobs/${jobAd.id}`}>{jobAd.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-center'>
                The candidate is not interested in any jobs
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    candidate: state.candidates.find(c => c.id === ownProps.id),
    user: state.user,
    id: ownProps.id
  }
}
export default connect(mapStateToProps, { setNotification, getCandidate })(
  Candidate
)

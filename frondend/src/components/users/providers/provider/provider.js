import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../../../togglable'
import ManageProfile from '../../manageProfile'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { setNotification } from '../../../../reducers/notificationReducer'
import { Animation } from '../../../../hooks/animation'
import { getProvider } from '../../../../reducers/providersReducer'

const Provider = ({ setNotification, getProvider, id, provider, user }) => {
  useEffect(() => {
    if (!provider) {
      getProvider(id)
    }
  }, [provider])
  Animation()

  if (!provider) {
    return <h2 className='text-white'>loading</h2>
  }
  const manageProfileRef = React.createRef()

  const copy = value => {
    setNotification({
      class: 'alert alert-success',
      message: `${value} copied to the clickboard.`
    })
  }
  return (
    <div className='container'>
      <div className='card my-auto mx-auto'>
        <div className='card-header'>Job provider</div>
        <div className='row no-gutters'>
          <img src={provider.picture} className='card-img-top' alt='...' />
          <div className='col-md-12'>
            <div className='card-body'>
              <h5 className='card-title'>{provider.name}</h5>
              <p className='card-text'>{provider.description} </p>
              <ul className='list-group shadow mb-3'>
                <li className='list-group-item'>
                  Phone:{' '}
                  {provider.phone ? (
                    <CopyToClipboard
                      text={provider.phone}
                      onDoubleClick={() => copy(provider.phone)}
                    >
                      <summary className='text-info'>{provider.phone}</summary>
                    </CopyToClipboard>
                  ) : (
                    'Not set'
                  )}
                </li>
                <li className='list-group-item'>
                  Email:{' '}
                  {provider.email ? (
                    <CopyToClipboard
                      text={provider.email}
                      onDoubleClick={() => copy(provider.email)}
                    >
                      <summary className='text-info'>{provider.email}</summary>
                    </CopyToClipboard>
                  ) : (
                    'Not set'
                  )}
                </li>
              </ul>

              {user.id === provider.id ? (
                <Togglable buttonLabel='Manage profile' ref={manageProfileRef}>
                  <ManageProfile
                    manageProfileRef={manageProfileRef}
                    id={user.id}
                  />
                </Togglable>
              ) : null}

              <p className='card-text'>
                <small className='text-muted'>
                  {' '}
                  Joined: {provider.createdAt.split('T')[0]}
                </small>
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <h5 className='card-title text-center'>Jobs provided</h5>
            {provider.jobsProvided.length > 0 ? (
              <ul className='list-group list-group-flush'>
                {provider.jobsProvided.map(jobAd => (
                  <li key={jobAd.id} className='list-group-item text-center'>
                    <Link to={`/jobs/${jobAd.id}`}>{jobAd.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-center'>
                The job provider has no open jobs to available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const provider = state.providers.find(p => p.id === ownProps.id)
  return {
    provider: provider,
    user: state.user,
    id: ownProps.id
  }
}
export default connect(mapStateToProps, {
  setNotification,
  getProvider
})(Provider)

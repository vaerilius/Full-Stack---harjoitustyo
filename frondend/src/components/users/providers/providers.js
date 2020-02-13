import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Animation } from '../../../hooks/animation'
import {
  initializeProviders,
  handleUsersPolling
} from '../../../reducers/providersReducer'
import io from '../../../../socket-client'

const Providers = ({ providers, initializeProviders, handleUsersPolling }) => {
  useEffect(() => {
    initializeProviders()
  }, [])
  useEffect(() => {
    io.getIO().on('providers', data => {
      handleUsersPolling(data)
    })
  }, [handleUsersPolling])

  Animation()
  return (
    <div className='container'>
      <div className='card shadow mb-4'>
        <div className='card-body text-center'>
          <h2 className='display-5 font-weight-bold'>Providers</h2>
        </div>
      </div>
      <div className='list-group'>
        {providers.map(p => (
          <div className='list-group mb-2' key={p.id}>
            <div className='list-group-item list-group-item-action'>
              <Link to={`/providers/${p.id}`}>
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='my-auto'>{p.name}</h5>
                  <p className='my-auto'>
                    {' '}
                    Joined: {p.createdAt.split('T')[0]}{' '}
                  </p>
                  <img
                    src={p.picture}
                    className='ml-3 mb-1 rounded-circle'
                    style={{ height: '4rem' }}
                    alt={p.name}
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    providers: state.providers
  }
}

export default connect(mapStateToProps, {
  initializeProviders,
  handleUsersPolling
})(Providers)

import React from 'react'
import { connect } from 'react-redux'
import { Animation } from '../../hooks/animation'
import { Link } from 'react-router-dom'

const OnlineUsers = ({ onlineUsers }) => {
  Animation()

  return (
    <div className='container'>
      <div className='card shadow mb-4'>
        <div className='card-body text-center'>
          <h2 className='display-5 font-weight-bold'>Users Online</h2>
        </div>
      </div>
      <div className='list-group'>
        {onlineUsers.map(p => (
          <div className='list-group mb-2' key={p.id}>
            <div className='list-group-item list-group-item-action'>
              <Link
                to={`/${p.jobProvider ? 'providers' : 'candidates'}/${p.id}`}
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='my-auto'>{p.name}</h5>

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
    onlineUsers: state.onlineUsers
  }
}

export default connect(mapStateToProps, {})(OnlineUsers)

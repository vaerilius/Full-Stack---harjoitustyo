import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Animation } from '../../../hooks/animation'
import { initializeCandidates } from '../../../reducers/candidatesReducer'

const Candidates = ({ candidates, initializeCandidates }) => {
  // useEffect(() => {
  //   // if (candidates.length === 0) {
  //   initializeCandidates()
  //   // }
  // }, [initializeCandidates])

  Animation()
  return (
    <div className='container'>
      <div className='card shadow mb-4'>
        <div className='card-body text-center'>
          <h2 className='display-5 font-weight-bold'>Candidates</h2>
        </div>
      </div>
      <div className='list-group'>
        {candidates.map(c => (
          <div className='list-group mb-2' key={c.id}>
            <div className='list-group-item list-group-item-action'>
              <Link to={`/candidates/${c.id}`}>
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='my-auto'>{c.name}</h5>
                  <p className='my-auto'>
                    {' '}
                    Joined: {c.createdAt.split('T')[0]}{' '}
                  </p>
                  <img
                    src={c.picture}
                    className='my-auto'
                    style={{ height: '4rem' }}
                    alt={c.name}
                  />
                </div>
                {/* <p className="mb-1"> Joined: {user.createdAt.split('T')[0]} </p> */}
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
    candidates: state.candidates
  }
}

export default connect(mapStateToProps, { initializeCandidates })(Candidates)

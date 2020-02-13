import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Animation } from '../../hooks/animation'

const OnlineUsers = () => {
  Animation()
  return (
    <div className='container'>
      <div className='card shadow mb-4'>
        <div className='card-body text-center'>
          <h2 className='display-5 font-weight-bold'>Users Online</h2>
        </div>
      </div>
      <div className='list-group'></div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    onlineUsers: state.onlineUsers
  }
}

export default connect(mapStateToProps, {})(OnlineUsers)

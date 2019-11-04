import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if (!props.user) {
    return <h1>loadinf</h1>
  }

  return (
    <div className="card" style={{marginTop: '200px'}}>
      <div className="card-header">
        Job advertisement

        {props.user.id}
      </div>
    </div>

  )
}
export default User

// http://localhost:3000/user/5dbfd25254d67745256d6d4f
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {

  return (
    <div className="container">
      <div className="list-group">
        {props.users.map(user =>
          <div className="list-group mb-2" key={user.id}>
            <div className="list-group-item list-group-item-action">
              <Link to={`/users/${user.id}`}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="my-auto">{user.name}</h5>
                  <p className="my-auto"> Joined: {user.createdAt.split('T')[0]} </p>
                  <img src={user.picture}
                    className="ml-3 mb-1 rounded-circle" style={{ height: '4rem' }} alt={user.name} />
                </div>
                {/* <p className="mb-1"> Joined: {user.createdAt.split('T')[0]} </p> */}
              </Link>
            </div>
          </div>
        )
        }
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)
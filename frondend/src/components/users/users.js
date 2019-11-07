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
              <Link to={`/user/${user.id}`}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{user.name}</h5>
                  {/* <small> Posted: { JobCreatedAT }</small> */}
                </div>
                {/* <p className="mb-1">{us}</p> */}
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
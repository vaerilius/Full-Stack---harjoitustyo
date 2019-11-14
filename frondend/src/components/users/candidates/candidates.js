import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Candidates = (props) => {

  return (
    <div className="container">
      <div className="list-group">
        {props.candidates.map(c =>
          <div className="list-group mb-2" key={c.id}>
            <div className="list-group-item list-group-item-action">
              <Link to={`/candidates/${c.id}`}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="my-auto">{c.name}</h5>
                  <p className="my-auto"> Joined: {c.createdAt.split('T')[0]} </p>
                  <img src={c.picture}
                    className="ml-3 mb-1 rounded-circle" style={{ height: '4rem' }} alt={c.name} />
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
    candidates: state.candidates
  }
}

export default connect(mapStateToProps)(Candidates)
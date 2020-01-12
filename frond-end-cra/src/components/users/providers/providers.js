import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Animation } from '../../../hooks/animation'


const Providers = (props) => {
  Animation()
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-body text-center">
          <h2 className="display-5 font-weight-bold">Providers</h2>
        </div>
      </div>
      <div className="list-group">
        {props.providers.map(p =>
          <div className="list-group mb-2" key={p.id}>
            <div className="list-group-item list-group-item-action">
              <Link to={`/providers/${p.id}`}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="my-auto">{p.name}</h5>
                  <p className="my-auto"> Joined: {p.createdAt.split('T')[0]} </p>
                  <img src={p.picture}
                    className="ml-3 mb-1 rounded-circle" style={{ height: '4rem' }} alt={p.name} />
                </div>
                {/* <p className="mb-1"> Joined: {user.createdAt.split('T')[0]} </p> */}
              </Link>
            </div>
          </div>
        )
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    providers: state.providers
  }
}

export default connect(mapStateToProps)(Providers)
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../../reducers/userReducer'

const Navbar = (props) => {

  const [isToggled, setssToggled] = useState('collapse navbar-collapse')
  const toggle = () => {
    setssToggled(isToggled.includes('show') ? 'collapse navbar-collapse ' : 'collapse navbar-collapse show')
    setInterval(() => {
      setssToggled('collapse navbar-collapse ')
    }, 5000)
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <Link to="/"><div className="navbar-brand">Job Book</div></Link>
      <button className="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarsExample03"
        aria-controls="navbarsExample03" aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={toggle}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={isToggled} id="navbarsExample03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            {props.user
              ?
              <Link to="/jobs">
                <div className="nav-link" >Jobs</div>
              </Link>
              : null}

          </li>
          <li className="nav-item">
            {props.user
              ? <Link to='/users'>
                <div className="nav-link">
                  users
                </div>
              </Link>
              :
              <Redirect to="/" />
            }
          </li>

        </ul>
        <ul className="navbar-nav justify-content-end">
          <li className="nav-item">
            {props.user
              ? <Link to='/'>
                <div className="nav-link" onClick={() => props.logout()}>
                  logout
                </div>
              </Link>
              :
              <Link to="/login">
                <div className="nav-link">Sign in</div>
              </Link>
            }
          </li>

        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(
  mapStateToProps,
  {
    login,
    logout
  }

)(Navbar)
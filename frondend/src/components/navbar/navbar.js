import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, logout } from '../../reducers/userReducer';


const Navbar = (props) => {

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link to="/"><div className="navbar-brand">Job Book</div></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExample03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/jobs">
              <div className="nav-link" >Jobs</div>
            </Link>
          </li>
          <li className="nav-item">
            {props.user
              ? <Link to='/'>
                  <div className="nav-link" onClick={() => props.logout()}>
                    logout
                  </div>
                </Link>
              :
                <Link to="/login">
                  <div className="nav-link">login</div>
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
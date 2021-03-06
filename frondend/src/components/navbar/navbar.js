import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../../reducers/userReducer'

const Navbar = props => {
  const [isToggled, setssToggled] = useState('collapse navbar-collapse')
  const toggle = () => {
    setssToggled(
      isToggled.includes('show')
        ? 'collapse navbar-collapse '
        : 'collapse navbar-collapse show'
    )

    document.body.addEventListener('click', () => {
      setssToggled('collapse navbar-collapse')
    })
  }

  if (!props.user) {
    return <Redirect to='/' />
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-transparent'>
      <div className='navbar-brand'>Job Book</div>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarsExample03'
        aria-controls='navbarsExample03'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={toggle}
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className={isToggled} id='navbarsExample03'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/jobs'>
              <div className='nav-link' id='jobs'>
                Jobs
              </div>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/candidates'>
              <div className='nav-link' id='candidates'>
                Candidates
              </div>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/providers'>
              <div className='nav-link' id='providers'>
                Providers
              </div>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/online-users'>
              <div className='nav-link' id='users'>
                Users
              </div>
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav justify-content-end'>
          <li className='nav-item'>
            <div className='nav-link'>
              {props.user.jobProvider ? (
                <Link to={`/providers/${props.user.id}`}>
                  <img
                    src={props.user.picture}
                    className='rounded-circle'
                    style={{ height: '2rem' }}
                    alt={props.user.name}
                  />
                </Link>
              ) : (
                <Link to={`/candidates/${props.user.id}`}>
                  <img
                    src={props.user.picture}
                    className='rounded-circle'
                    style={{ height: '2rem' }}
                    alt={props.user.name}
                  />
                </Link>
              )}
            </div>
          </li>
          <li className='nav-item'>
            <Link to='/'>
              <div
                className='nav-link'
                id='logout'
                onClick={() => props.logout()}
              >
                logout
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  login,
  logout
})(Navbar)

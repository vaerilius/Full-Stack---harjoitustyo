import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Animation } from '../hooks/animation'
import bg from '../assest/bg.jpeg'
const Landing = ({ user }) => {
  if (user) {
    return <Redirect to='/jobs/' />
  }
  Animation()
  return (
    <div className='container '>
      <div className='col-md-12'>
        <div className='card shadow scale  '>
          <h1 className=' display-5 text-center text-uppercase font-weight-bold '>
            Job Book
          </h1>
          <img src={bg} className='img-fluid' alt='Responsive image' />
        </div>
      </div>
      <div className='col-md-12 '>
        <div className='card bg-white m-5 shadow scale'>
          <Link to='/signup'>
            <div className='card-body font-weight-bold text-center text-uppercase'>
              Sign Up
            </div>
          </Link>
        </div>
        <div className='card bg-white m-5 shadow scale'>
          <Link to='/login'>
            <div className='card-body font-weight-bold text-center text-uppercase '>
              Or Sign In
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
const mapStateToprops = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToprops)(Landing)

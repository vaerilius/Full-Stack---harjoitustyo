import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import bg from '../assest/bg.jpeg'
const Landing = ({ user }) => {

  if (user) {
    return (
      <Redirect to="/jobs/" />
    )
  }

  return (

    <div className='container'>
      <div className="row" style={{ marginTop: '20%' }}>
        <div className="col-md-6 ">
          <div className="card shadow">
            <h1 className="text-center">Job Book</h1>
            <img src={bg} class="img-fluid" alt="Responsive image" />
          </div>
        </div>
        <div className="col-md-6 my-auto">
          <div className="card bg-white m-5 shadow">
            <Link to="/signup">
              <div className="card-body font-weight-bold text-center text-uppercase">
                Sign Up
            </div>
            </Link>
          </div>
          <div className="card bg-white m-5 shadow">
            <Link to="/login">
              <div className="card-body font-weight-bold text-center text-uppercase">
                Or Sign In
            </div>
            </Link>
          </div>
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
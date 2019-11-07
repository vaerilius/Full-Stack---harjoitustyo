import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const Landing = ({ user }) => {

  if (user) {
    return (
      <Redirect to="/jobs/" />
    )
  }

  return (
    <div className="row " style={{ marginTop: "5%" }}>
      <div className="col-sm-12">
        <div className="card">
          <h1>Job Book</h1>
          <img src={require('../assest/hiring.png')}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="card bg-white m-5">
          <Link to="/signup">
            <div className="card-body font-weight-bold text-center text-uppercase">
              Sign Up
            </div>
          </Link>
        </div>
        <div className="card bg-white m-5">
          <Link to="/login">
            <div className="card-body font-weight-bold text-center text-uppercase">
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
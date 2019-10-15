import React from 'react'
import { Link } from 'react-router-dom';
const Landing = () => {

  return (
      <div className="row " style={{marginTop: "30%"}}>
      <div className="col-sm-12">
      <div className="card-header">
      {/* <img src={require('../assest/hiring.png')}
      className="card-img-top"
      alt="..."
      /> */}
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
          Or login
          </div>
        </Link>
        </div>
      </div>
    </div>

  )
}

export default Landing
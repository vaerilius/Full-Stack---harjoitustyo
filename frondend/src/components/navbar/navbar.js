import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
<>
<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <Link to="/"><div className="navbar-brand">Job Book</div></Link>
  {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}

  <div className="collapse navbar-collapse" id="navbarsExample03">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/jobs">
          <div className="nav-link" >Jobs</div>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/jobs">
          <div className="nav-link" >Jobs</div>
        </Link>
      </li>

    </ul>

  </div>
</nav>
</>
  )
}

export default Navbar
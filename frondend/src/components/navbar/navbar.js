import React from 'react'

const Navbar = () => {

  return (
<>
<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <div className="navbar-brand">Job Book</div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarsExample03">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" >Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" >Disabled</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle"  id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div className="dropdown-menu" aria-labelledby="dropdown03">
          <a className="dropdown-item" >Action</a>
          <a className="dropdown-item" >Another action</a>
          <a className="dropdown-item" >Something else here</a>
        </div>
      </li>
    </ul>

  </div>
</nav>
</>
  )
}

export default Navbar
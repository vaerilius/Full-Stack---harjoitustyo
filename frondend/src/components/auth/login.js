import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useField } from '../../hooks/formHook'
import { login } from '../../reducers/userReducer'


const Login = (props) => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  const handleLogin = (e) => {
    e.preventDefault()
    props.login({
      username: username.value,
      password: password.value,
    })
    resetUsername()
    resetPassword()
  }

  if (props.user) {
    return (
      <Redirect to="/jobs/" />
    )
  }

  return (

    <div className="card text-center mt-5">
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <p className="card-text">To use application please, login</p>
        <form onSubmit={handleLogin}>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
            <div className="col-sm-9">
              <input {...username} className="form-control" id="username" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input {...password} className="form-control" id="password" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => { return { user: state.user } }

export default connect(mapStateToProps,
  {
    login
  }
)(Login)
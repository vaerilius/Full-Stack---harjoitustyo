import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Validator } from '../../hooks/validator'
import { login } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/form-input'

const Login = (props) => {
  const [username, resetUsername, changeUsernameClassName, usernameFeedback, changeUsernameFeedback] = useForm('text')
  const [password, resetPassword, passValidationClass, passwordFeedback, changePasswordFeedback] = useForm('password')

  Validator(username.value, changeUsernameClassName, changeUsernameFeedback)
  Validator(password.value, passValidationClass, changePasswordFeedback)

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
              <input {...username} id="username"  />
              <div className="invalid-feedback">
                {usernameFeedback}
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input {...password} id="password"  />
              <div className="invalid-feedback">
                {passwordFeedback}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">sign in</button>
        </form>
        <Link to='/'>
          <button type="button" className="btn btn-secondary btn-block mt-3">Back</button>
        </Link>
      </div>
    </div >
  )
}

const mapStateToProps = (state) => { return { user: state.user } }

export default connect(mapStateToProps,
  {
    login
  }
)(Login)
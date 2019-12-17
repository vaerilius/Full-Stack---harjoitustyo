import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useField } from '../../hooks/formHook'
import { login } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'

import { Form } from 'react-bootstrap'


const Login = (props) => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const [usernameValidator, setUsernameValidator] = useState('form-control')
  const [passwordValidator, setPasswordValidator] = useState('form-control')

  useEffect(() => {
    if (username.value.length > 3) {
      setUsernameValidator('form-control is-valid')
    } else if (username.value.length > 0) {
      setUsernameValidator('form-control is-invalid')
    } else {
      setUsernameValidator('form-control')
    }
  }, [username.value])

  useEffect(() => {
    if (password.value.length > 3) {
      setPasswordValidator('form-control is-valid')
    } else if (password.value.length > 0) {
      setPasswordValidator('form-control is-invalid')
    } else {
      setPasswordValidator('form-control')
    }
  }, [password.value])

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
          {/* <Form.Group controlId="test" >
            <Form.Label>Username</Form.Label>
            <Form.Control {...username} placeholder="Enter username"
              className={validator}
            />
            <Form.Text className="text-muted">
              The username minium length is 4
            </Form.Text>
          </Form.Group> */}
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
            <div className="col-sm-9">
              <input {...username} id="username" className={usernameValidator} />
              <div className="invalid-feedback">
                username min length is 4.
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label" required>Password</label>
            <div className="col-sm-9">
              <input {...password}  id="password" className={passwordValidator}/>
              <div className="invalid-feedback">
                Password min length is 4.
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